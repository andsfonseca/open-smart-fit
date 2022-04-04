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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gym = void 0;
const gyms_1 = require("../gyms");
class Gym {
    constructor(name, permalink, id, smartSystemId, address, facilities, schedules, prices, plans) {
        this.name = name;
        this.permalink = permalink;
        this.id = id;
        this.smartSystemId = smartSystemId;
        this.address = address;
        this.facilities = facilities;
        this.schedules = schedules;
        this.prices = prices;
        this.plans = plans;
        Object.defineProperty(this, "cnpj", {
            get: function () {
                return __awaiter(this, void 0, void 0, function* () {
                    if (this.additionalInformation) {
                        return this.additionalInformation.cnpj;
                    }
                    yield gyms_1.Gyms.getGymAdditionalProperties(this.permalink);
                    return this.additionalInformation.cnpj;
                });
            }
        });
    }
}
exports.Gym = Gym;
