
export interface IPage {
    locations: any[]
    locations_count: number
    next_page?: number
    view_type: string
}

interface ICoordinates {
    latitude: string,
    longitude: string
}

interface IAddress {
    first_line: string,
    second_line: string,
    position: ICoordinates
}

interface IFacility {
    id: number,
    name: string,
    description: string,
    icon_svg_slug: string
}

interface ITableDay {
    table: ITableDayItem
}

interface ITableDayItem {
    weekday: string,
    time: string
}

interface IPrice {
    integer: number,
    decimal: string,
    value: number,
    original_price: string
}

interface SmartAndBlackPrice {
    smart: IPrice
    black: IPrice
}

export interface ILocation {
    name: string
    prices: SmartAndBlackPrice
    distance: string,
    upcoming_holiday: any,
    permalink: string,
    address: IAddress,
    activities: [],
    facilities: IFacility[],
    promotion: any,
    schedules: { [name: string]: ITableDay[] },
    smart_system_id: number,
    picture_url: string,
    id: number,
    sales_available: boolean,
    plan_names: any[],
    is_digital: boolean
}

interface ILocationPicture {
    id: number
    location_id: number
    caption: string
    image_url: string
    smart_system_id: number
    created_at: string
    updated_at: string
    current_shard: string
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