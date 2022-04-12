import { IAdditionalInformation } from "./additional-information"
import { IAddress } from "./address"
import { IPrice } from "./price"
import { ISchedule } from "./schedule"

/**
 * Representação de uma academia
 */
export interface IGym{
    /**
     * Nome da Academia
     */
    name: string
    /**
     * Identificador único da acamdemia, em string
     */
    permalink: string
    /**
     * Identificador da academia
     */
    id: number
    /**
     * Identificador do Smart System
     */
    smartSystemId: number,
    /**
     * Endereço da Academia
     */
    address: IAddress,
    /**
     * Recursos disponíveis na academia
     */
    facilities: string[],
    /**
     * Horários da academia
     */
    schedules: ISchedule[],
    /**
     * Preços da Academia
     */
    prices: IPrice[]
    /**
     * Planos disponíveis
     */
    plans: string[],
    /**
     * Informações adicionais da academia
     */
    additionalInformation?: IAdditionalInformation
}



