export interface IPage {
    locations: any[];
    locations_count: number;
    next_page?: number;
    view_type: string;
}
export interface ILocation {
    name: string;
    prices: any;
    distance: string;
    upcoming_holiday: any;
    permalink: string;
    address: any;
    activities: [];
    facilities: any[];
    promotion: any;
    schedules: {};
    smart_system_id: number;
    picture_url: string;
    id: number;
    sales_available: boolean;
    plan_names: any[];
    is_digital: boolean;
}
