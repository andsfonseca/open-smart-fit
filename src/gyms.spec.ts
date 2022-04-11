import { Gyms } from "./gyms";
import { ILocation } from "./interfaces/smart-fit-representations";

describe("Working with Smart Fit Raw JSON", () => {

    let locations: ILocation[] = []

    test("Fetching Data", async () => {
        try {
            locations = await Gyms.getRawData()
            expect(locations).not.toBeUndefined()
        } catch (e) {
            console.log(e)
        }

    }, 100000)

    test("Contains Gyms", () => {
        expect(locations.length).toBeGreaterThan(0)
    })

    test("Get Address Property", () => {
        expect(locations[0].address.first_line).not.toBeUndefined()
        expect(locations[0].address.second_line).not.toBeUndefined()
        expect(locations[0].address.position.latitude).not.toBeUndefined()
        expect(locations[0].address.position.longitude).not.toBeUndefined()
    })

    test("Get Facilities Property", () => {
        expect(locations[0].facilities.length).not.toBeUndefined()
    })

    test("Get Scheduled Days Property", () => {
        expect(Object.keys(locations[0].schedules).sort()).toEqual(['Dom/Feriados', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].sort())
        expect(locations[0].schedules["Dom/Feriados"][0].table.time).not.toBeUndefined()
        expect(locations[0].schedules["Dom/Feriados"][0].table.weekday).not.toBeUndefined()
    })

    test("Get Price Property", () => {
        expect(Object.keys(locations[0].prices).sort()).toEqual(['Black', 'Smart'].sort())
        expect(locations[0].prices['Black'].decimal).not.toBeUndefined()
        expect(locations[0].prices['Black'].integer).toBeGreaterThanOrEqual(0)
        expect(locations[0].prices['Black'].original_price).not.toBeUndefined()
        expect(locations[0].prices['Black'].value).toBeGreaterThanOrEqual(0)
    })
})