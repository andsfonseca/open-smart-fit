import { Gyms } from "../gyms";
import { IGym, IAddress, ISchedule, IPrice, IAdditionalInformation, IEmployee } from "../interfaces/models";

export class Gym implements IGym {

    name: string;
    permalink: string;
    id: number;
    smartSystemId: number;
    address: IAddress;
    facilities: string[];
    schedules: ISchedule[];
    prices: IPrice[];
    plans: string[];
    additionalInformation?: IAdditionalInformation
    
    cnpj!: Promise<string>;
    imagesUri!: Promise<string[]>;
    employees!: Promise<IEmployee[]>;
    
    constructor(name: string, permalink: string, id: number, smartSystemId: number, address: IAddress, facilities: string[], schedules: ISchedule[], prices: IPrice[], plans: string[]) {
        
        this.name = name
        this.permalink = permalink
        this.id = id
        this.smartSystemId = smartSystemId
        this.address = address
        this.facilities = facilities
        this.schedules = schedules
        this.prices = prices
        this.plans = plans

        Object.defineProperty(this, "cnpj",{
            get: async function (){
                if(this.additionalInformation){
                    return this.additionalInformation.cnpj
                }
                await Gyms.getGymAdditionalProperties(this.permalink)

                return this.additionalInformation.cnpj

            }
         });

         Object.defineProperty(this, "imagesUri",{
            get: async function (){
                if(this.additionalInformation){
                    return this.additionalInformation.imagesUri
                }
                await Gyms.getGymAdditionalProperties(this.permalink)

                return this.additionalInformation.imagesUri
            }
         });

         Object.defineProperty(this, "employees",{
            get: async function (){
                if(this.additionalInformation){
                    return this.additionalInformation.employees
                }
                await Gyms.getGymAdditionalProperties(this.permalink)

                return this.additionalInformation.employees
            }
         });
    }

}