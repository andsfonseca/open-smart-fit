import { IAddress } from "./address"
import { IFacility } from "./facility"
import { ILocationPicture } from "./location-picture"
import { IPrice } from "./price"
import { IScheduledDays } from "./scheduled-day"
import { ITrainer } from "./trainer"

/**
 * Representação de uma academia
 */
export interface ILocation {
    /**
     * Nome da Academia
     */
    name: string
    /**
     * Preços da Academia
     */
    prices: { [index: string]: IPrice }
    /**
     * Distancia em metros em relação a coordenada de Busca
     */
    distance: string,
    /**
     * Informações de feriado
     */
    upcoming_holiday: any,
    /**
     * Identificador único da acamdemia, em string
     */
    permalink: string,
    /**
     * Endereço da Academia
     */
    address: IAddress,
    /**
     * Atividades encontradas na academia
     */
    activities: [],
    /**
     * Recursos disponíveis na academia
     */
    facilities: IFacility[],
    /**
     * Promoções da academia
     */
    promotion: any,
    /**
     * Horários da academia
     */
    schedules: { [index: string]: IScheduledDays[] },
    /**
     * Identificador do Smart System
     */
    smart_system_id: number,
    /**
     * URI com imagem da academia
     */
    picture_url: string,
    /**
     * Identificador da academia
     */
    id: number,
    /**
     * Está aberto para vendas
     */
    sales_available: boolean,
    /**
     * Planos disponíveis
     */
    plan_names: any[],
    /**
     * Possui plano diginal
     */
    is_digital: boolean
}

interface IStaffData {
    title: string
    text: string
    trainers: ITrainer[]
}

interface IFrequencyData {
    titleLabel: string
    mainButtonLabel: string
    btnLabelTableClasses: string
    locationTrainingymUrlTableClasses: any
    data: { [name: string]: number }
    chartLabel: string
    updatedAt: string
    updatedAtLabel: string
}

interface INearLocations {
    items: ILocation[]
    total: number
}

export interface ILocationAddOns {
    id: number
    name: string
    officialName: string
    cnpj: string
    operationalStatus: string
    mainImageUrl: string
    locationPictures: ILocationPicture[]
    locationsPath: string
    virtualTourUrl: string
    plans: any
    address: string
    linkGoogleMaps: string
    whatsAppNumber: string
    promoLocations: any
    openingHours: any
    facilities: any[]
    staffData: IStaffData
    faqData: any
    klassesData: any
    frequencyData: IFrequencyData
    nearLocations: INearLocations
    salesBlocked: boolean
    isJustfitLocation: any
    ctaLink: string
    translation: any
    country: string
    features: any
}