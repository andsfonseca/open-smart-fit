import { IAdditionalInformation } from "./additional-information"
import { IAddress } from "./address"
import { IPrice } from "./price"
import { ISchedule } from "./schedule"

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



