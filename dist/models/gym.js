"use strict";
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
            get: async function () {
                if (this.additionalInformation) {
                    return this.additionalInformation.cnpj;
                }
                await gyms_1.Gyms.getGymAdditionalProperties(this.permalink);
                return this.additionalInformation.cnpj;
            }
        });
        Object.defineProperty(this, "imagesUri", {
            get: async function () {
                if (this.additionalInformation) {
                    return this.additionalInformation.imagesUri;
                }
                await gyms_1.Gyms.getGymAdditionalProperties(this.permalink);
                return this.additionalInformation.imagesUri;
            }
        });
    }
}
exports.Gym = Gym;
