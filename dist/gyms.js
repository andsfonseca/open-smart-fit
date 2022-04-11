"use strict";
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
 * Módulo responsável pela listagem de Ginásios
 */
class Gyms {
    /**
     * Recupera o JSON da Smartfit com uma lista de localizações da Academias, incluindo suas informações gerais
     * @returns Retorna uma lista de academias no formato padrão da Smartfit.com.br
     */
    static async getRawData() {
        this.verbose("Retrieving general information...");
        let locations = [];
        let page = 1;
        //Recupera a primeira página
        let response = await axios_1.default.get(`${urls_1.API_URL}/academias.json?name=&page=${page}`);
        let data = response.data;
        locations.push(...data.locations);
        //Calcula as proximas requisições
        let max_pages = Math.ceil(data.locations_count / 8);
        this.verbose(`Creating ${max_pages + 1} requests.`);
        //Cria as tasks
        let tasks = [];
        for (page = 2; page <= max_pages; page++)
            tasks.push(axios_1.default.get(`${urls_1.API_URL}/academias.json?name=&page=${page}`));
        let responses = await Promise.all(tasks);
        //Salva as localizações
        for (let i = 0, len = responses.length; i < len; i++) {
            response = responses[i];
            data = response.data;
            locations.push(...data.locations);
        }
        this.verbose(`Found ${locations.length} gyms.`);
        return locations;
    }
    static async getData() {
        if (this.data)
            return this.data;
        let locations = await this.getRawData();
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
    }
    static async getRawGymAdditionalProperties(permalink) {
        this.verbose(`Retrieving general information about academy '${permalink}'...`);
        let response = await axios_1.default.get(`${urls_1.API_URL}/academias/${permalink}`);
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
    }
    static async getGymAdditionalProperties(permalink) {
        if (this.data[permalink].additionalInformation)
            return this.data[permalink].additionalInformation;
        let data = await this.getRawGymAdditionalProperties(permalink);
        if (!data) {
            return undefined;
        }
        this.verbose(`Optimizing data...`);
        this.data[permalink].additionalInformation = {
            cnpj: data.cnpj,
            imagesUri: data.locationPictures.map(lp => lp.image_url)
        };
        return this.data[permalink].additionalInformation;
    }
}
exports.Gyms = Gyms;
/**
 * Método usado para envio de Logs
 * @param _ Texto do Log
 */
Gyms.verbose = (_) => { };
