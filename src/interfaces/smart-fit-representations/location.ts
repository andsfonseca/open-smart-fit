import { IAddress } from "./address"
import { IFacility } from "./facility"
import { ILocationPicture } from "./location-picture"
import { IPrice } from "./price"

interface ITableDay {
    table: ITableDayItem
}

interface ITableDayItem {
    weekday: string,
    time: string
}

export interface ILocation {
    name: string
    prices: { [index: string]: IPrice }
    distance: string,
    upcoming_holiday: any,
    permalink: string,
    address: IAddress,
    activities: [],
    facilities: IFacility[],
    promotion: any,
    schedules: { [index: string]: ITableDay[] },
    smart_system_id: number,
    picture_url: string,
    id: number,
    sales_available: boolean,
    plan_names: any[],
    is_digital: boolean
}

export interface ITrainer {
    name: string
    picture: any
    role: string
    cref: string
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