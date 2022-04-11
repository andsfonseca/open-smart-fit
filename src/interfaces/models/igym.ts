import { IAddress } from "./iaddress"

export interface ISchedule{
    dayOfTheWeek: number
    opensAs: number
    closesAs: number
}

export interface IPrice{
    name: string
    price: number
}

export interface IGym{
    name: string
    permalink: string
    id: number
    smartSystemId: number,
    address: IAddress,
    facilities: string[],
    schedules: ISchedule[],
    prices: IPrice[]
    plans: string[],
    additionalInformation?: IAdditionalInformation
}

export interface IAdditionalInformation{
    cnpj : string
    imagesUri: string[]
}

