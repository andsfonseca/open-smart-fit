import { Gyms } from "./gyms";
import { ILocation } from "./interfaces/smart-fit-representations";
import { ILocationAddOns } from "./interfaces/smart-fit-representations/location";

describe("Parsing Smart Fit Raw JSON", () => {
    let locations: ILocation[] = []
    
    test("Fetching data", async () => {
        try {
            locations = await Gyms.getRawData()
            expect(locations).not.toBeUndefined()
        } catch (e) {
            console.log(e)
        }

    }, 100000)

    test("Contains gyms", () => {
        expect(locations.length).toBeGreaterThan(0)
    })

    test("Get name property", () => {
        expect(locations[0].name).not.toBeUndefined()
    })

    test("Get price property", () => {
        expect(Object.keys(locations[0].prices).sort()).toEqual(['black', 'smart'].sort())
        expect(locations[0].prices['black'].decimal).not.toBeUndefined()
        expect(locations[0].prices['black'].integer).toBeGreaterThanOrEqual(0)
        expect(locations[0].prices['black'].original_price).not.toBeUndefined()
        expect(locations[0].prices['black'].value).toBeGreaterThanOrEqual(0)
    })

    test("Get distance property", () => {
        expect(locations[0].distance).not.toBeUndefined()
    })

    test("Get upcoming holiday Property", () => {
        expect(locations[0].upcoming_holiday).not.toBeUndefined()
    })

    test("Get permalink property", () => {
        expect(locations[0].permalink).not.toBeUndefined()
    })

    test("Get address property", () => {
        expect(locations[0].address.first_line).not.toBeUndefined()
        expect(locations[0].address.second_line).not.toBeUndefined()
        expect(locations[0].address.position.latitude).not.toBeUndefined()
        expect(locations[0].address.position.longitude).not.toBeUndefined()
    })

    test("Get facilities property", () => {
        expect(locations[0].facilities).not.toBeUndefined()
    })

    test("Get promotions property", () => {
        expect(locations[0].promotion).not.toBeUndefined()
    })

    test("Get scheduled days property", () => {
        expect(Object.keys(locations[0].schedules).sort()).toEqual(['Dom/Feriados', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].sort())
        expect(locations[0].schedules["Dom/Feriados"][0].table.time).not.toBeUndefined()
        expect(locations[0].schedules["Dom/Feriados"][0].table.weekday).not.toBeUndefined()
    })

    test("Get Smart System id property", () => {
        expect(locations[0].smart_system_id).not.toBeUndefined()
    })

    test("Get Smart System id property", () => {
        expect(locations[0].picture_url).not.toBeUndefined()
    })

    test("Get id property", () => {
        expect(locations[0].id).not.toBeUndefined()
    })

    test("Get sales available property", () => {
        expect(locations[0].sales_available).not.toBeUndefined()
    })

    test("Get plans property", () => {
        expect(locations[0].plan_names).not.toBeUndefined()
    })

    test("Get contais digital plan property", () => {
        expect(locations[0].is_digital).not.toBeUndefined()
    })

})

describe("Gym Indexation", () => {
    test("Fetching data", async () => {
        try {
            expect(await Gyms.getData()).not.toBeUndefined()
        } catch (e) {
            console.log(e)
        }
    }, 100000)

    test("Get name property", async () => {
        let gym = Object.values(await Gyms.getData())[0]
        expect(gym.name).not.toBeUndefined()
    })

    test("Get permalink property", async () => {
        let gym = Object.values(await Gyms.getData())[0]
        expect(gym.permalink).not.toBeUndefined()
    })

    test("Get id property", async () => {
        let gym = Object.values(await Gyms.getData())[0]
        expect(gym.id).not.toBeUndefined()
    })

    test("Get Smart System id property", async () => {
        let gym = Object.values(await Gyms.getData())[0]
        expect(gym.smartSystemId).not.toBeUndefined()
    })

    test("Get address property", async () => {
        let gym = Object.values(await Gyms.getData())[0]
        expect(gym.address).not.toBeUndefined()
        expect(gym.address.lat).not.toBeUndefined()
        expect(gym.address.lon).not.toBeUndefined()
        expect(gym.address.full).not.toBeUndefined()
        expect(gym.address.postalCode).not.toBeUndefined()
    })

    test("Get facilities property", async () => {
        let gym = Object.values(await Gyms.getData())[0]
        expect(gym.facilities).not.toBeUndefined()
    })

    test("Get schedules property", async () => {
        let gym = Object.values(await Gyms.getData())[0]
        expect(gym.schedules.length).toBe(7)
        expect(gym.schedules[0].dayOfTheWeek).not.toBeUndefined()
        expect(gym.schedules[0].opensAs).not.toBeUndefined()
        expect(gym.schedules[0].closesAs).not.toBeUndefined()
    })

    test("Get price property", async () => {
        let gym = Object.values(await Gyms.getData())[0]
        expect(gym.prices).not.toBeUndefined()
        expect(gym.prices.length).toBeGreaterThanOrEqual(0)
    })

    test("Get plans property", async () => {
        let gym = Object.values(await Gyms.getData())[0]
        expect(gym.plans).not.toBeUndefined()
    })

})

describe("Additional Gym Information", () => {

    let additional: ILocationAddOns

    test("Get additional information about the gym", async () => {
        let gym = Object.values(await Gyms.getData())[0]
        additional = (await Gyms.getRawGymAdditionalProperties(gym.permalink)) as ILocationAddOns
        expect(additional).not.toBeUndefined()
    }, 100000)

    test("Get cnpj property", async () => {
        expect(additional.cnpj).not.toBeUndefined()
    })

    test("Get images uri property", async () => {
        expect(additional.locationPictures).not.toBeUndefined()
        expect(additional.locationPictures.length).toBeGreaterThanOrEqual(0)
    })

    test("Get trainer property", async () => {
        expect(additional.staffData).not.toBeUndefined()
        expect(additional.staffData.trainers).not.toBeUndefined()
        expect(additional.staffData.trainers.length).toBeGreaterThanOrEqual(0)
    })
    
})

describe("Parsing Additional Gym Information", () => {
    test("Get additional information about the gym", async () => {
        let gym = Object.values(await Gyms.getData())[0]
        expect(await Gyms.getGymAdditionalProperties(gym.permalink)).not.toBeUndefined()
    }, 100000)

    test("Get cnpj property", async () => {
        let gym = Object.values(await Gyms.getData())[0]
        expect(await gym.cnpj).not.toBeUndefined()
    })

    test("Get images uri property", async () => {
        let gym = Object.values(await Gyms.getData())[0]
        expect(await gym.imagesUri).not.toBeUndefined()
        expect((await gym.imagesUri).length).toBeGreaterThan(0)
    })

    test("Get employees property", async () => {
        let gym = Object.values(await Gyms.getData())[0]
        expect(await gym.employees).not.toBeUndefined()
        expect((await gym.employees).length).toBeGreaterThan(0)
    })
})