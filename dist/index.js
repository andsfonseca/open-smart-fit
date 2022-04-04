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
const gyms_1 = require("./gyms");
gyms_1.Gyms.verbose = console.log;
// Gyms.getRawData().then(_ => {console.log("nice")})
// Gyms.getData().then(_ => {console.log(_[0].cnpj)})
gyms_1.Gyms.getData().then(_ => {
    gyms_1.Gyms.getData().then((_) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(yield _["augusta"].cnpj);
        gyms_1.Gyms.getData().then(_ => { gyms_1.Gyms.getData().then((_) => __awaiter(void 0, void 0, void 0, function* () { console.log(yield _["augusta"].cnpj); })); });
    }));
});
// Gyms.getGymAdditionalProperties("augusta").then(_ => {console.log("Finished")})
