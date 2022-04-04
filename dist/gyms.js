"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gyms = void 0;
const axios_1 = __importDefault(require("axios"));
const urls_1 = require("./common/urls");
const gym_1 = require("./models/gym");
const he_1 = __importDefault(require("he"));
/**
 * Módulo responsável pela listagem de palavras
 */
class Gyms {
    static getRawData() {
        return __awaiter(this, void 0, void 0, function* () {
            this.verbose("Retrieving general information...");
            let locations = [];
            let page = 1;
            //Recupera a primeira página
            let response = yield axios_1.default.get(`${urls_1.API_URL}/academias.json?name=&page=${page}`);
            let data = response.data;
            locations.push(...data.locations);
            //Calcula as proximas requisições
            let max_pages = Math.ceil(data.locations_count / 8);
            this.verbose(`Creating ${max_pages + 1} requests.`);
            //Cria as tasks
            let tasks = [];
            for (page = 2; page <= max_pages; page++)
                tasks.push(axios_1.default.get(`${urls_1.API_URL}/academias.json?name=&page=${page}`));
            let responses = yield Promise.all(tasks);
            //Salva as localizações
            for (let i = 0, len = responses.length; i < len; i++) {
                response = responses[i];
                data = response.data;
                locations.push(...data.locations);
            }
            this.verbose(`Found ${locations.length} gyms.`);
            return locations;
        });
    }
    static getData() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.data)
                return this.data;
            let locations = yield this.getRawData();
            let stringToDay = {
                "Dom/Feriados": 1,
                "Seg": 2,
                "Ter": 3,
                "Qua": 4,
                "Qui": 5,
                "Sex": 6,
                "Sáb": 7,
            };
            this.verbose(`Optimizing data...`);
            let gyms = locations.map(l => {
                let fullAdress = `${l.address.first_line} - ${l.address.second_line}`;
                let postalCode = fullAdress.match(/(\d+)\D*$/)[0].toString();
                let fullAdressWithoutPostalCode = fullAdress.substring(0, fullAdress.length - (postalCode.length + 3));
                return new gym_1.Gym(l.name, l.permalink, l.id, l.smart_system_id, {
                    lat: l.address.position.latitude,
                    lon: l.address.position.longitude,
                    full: fullAdressWithoutPostalCode,
                    postalCode: postalCode
                }, l.facilities.map(lf => lf.name), Object.values(l.schedules).map(s => {
                    let day = stringToDay[s[0].table.weekday];
                    let arrMatch = s[0].table.time.match(/[0-9]+/g);
                    return { dayOfTheWeek: day, opensAs: parseInt(arrMatch[0].toString()), closesAs: parseInt(arrMatch[1].toString()) };
                }), [
                    { name: "smart-original-price", price: parseFloat(l.prices.smart.original_price.replace(",", ".")) },
                    { name: "smart-promotional-price", price: l.prices.smart.value },
                    { name: "black-original-price", price: parseFloat(l.prices.black.original_price.replace(",", ".")) },
                    { name: "black-promotional-price", price: l.prices.black.value },
                ], l.plan_names);
            });
            this.data = {};
            for (let index = 0; index < gyms.length; index++) {
                this.data[gyms[index].permalink] = gyms[index];
            }
            return this.data;
        });
    }
    static getRawGymAdditionalProperties(permalink) {
        return __awaiter(this, void 0, void 0, function* () {
            this.verbose(`Retrieving general information about academy '${permalink}'...`);
            let response = yield axios_1.default.get(`${urls_1.API_URL}/academias/${permalink}`);
            let page = String(response.data);
            let lines = page.split("\n");
            for (var i = 0, len = lines.length; i < len; i++) {
                if (lines[i].includes("ShowLocations/ShowLocations")) {
                    let matches = lines[i].match(/(?<=data-react-props=\")(.*?)(?=\s*\")/gi);
                    if (!matches)
                        continue;
                    this.verbose(`Found general information.`);
                    let props = matches[0];
                    props = he_1.default.decode(props);
                    let obj = JSON.parse(props);
                    return obj;
                }
            }
            return undefined;
        });
    }
    static getGymAdditionalProperties(permalink) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.data[permalink].additionalInformation)
                return this.data[permalink].additionalInformation;
            let data = yield this.getRawGymAdditionalProperties(permalink);
            if (!data) {
                return undefined;
            }
            this.verbose(`Optimizing data...`);
            this.data[permalink].additionalInformation = {
                cnpj: data.cnpj
            };
            return this.data[permalink].additionalInformation;
        });
    }
}
exports.Gyms = Gyms;
Gyms.verbose = (_) => { };
