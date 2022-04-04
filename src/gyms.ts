import axios, { AxiosResponse } from "axios";
import { API_URL } from "./common/urls";
import { ILocation, ILocationAddOns, IPage } from "./interfaces/smart-fit-json";
import { Gym } from "./models/gym";
import { IAdditionalInformation } from "./interfaces/igym";
import he from "he"

/**
 * Módulo responsável pela listagem de Ginásios
 */
export abstract class Gyms {

    public static verbose: (s: string) => void = (_: string) => { }

    private static data: { [index: string]: Gym };

    static async getRawData(): Promise<ILocation[]> {

        this.verbose("Retrieving general information...")

        let locations: ILocation[] = []
        let page = 1

        //Recupera a primeira página
        let response = await axios.get<IPage>(`${API_URL}/academias.json?name=&page=${page}`)

        let data = response.data
        locations.push(...data.locations)

        //Calcula as proximas requisições
        let max_pages = Math.ceil(data.locations_count / 8)
        this.verbose(`Creating ${max_pages + 1} requests.`)

        //Cria as tasks
        let tasks: Promise<AxiosResponse<IPage, any>>[] = []
        for (page = 2; page <= max_pages; page++)
            tasks.push(axios.get<IPage>(`${API_URL}/academias.json?name=&page=${page}`))

        let responses = await Promise.all(tasks);

        //Salva as localizações
        for (let i = 0, len = responses.length; i < len; i++) {
            response = responses[i]
            data = response.data
            locations.push(...data.locations)
        }

        this.verbose(`Found ${locations.length} gyms.`)

        return locations
    }

    static async getData(): Promise<{ [index: string]: Gym }> {

        if (this.data)
            return this.data;

        let locations = await this.getRawData()

        let stringToDay: { [name: string]: number } = {
            "Dom/Feriados": 1,
            "Seg": 2,
            "Ter": 3,
            "Qua": 4,
            "Qui": 5,
            "Sex": 6,
            "Sáb": 7,
        }

        this.verbose(`Optimizing data...`)

        let gyms = locations.map(l => {

            let fullAdress = `${l.address.first_line} - ${l.address.second_line}`
            let postalCode = fullAdress.match(/(\d+)\D*$/)![0].toString();
            let fullAdressWithoutPostalCode = fullAdress.substring(0, fullAdress.length - (postalCode.length + 3));

            return new Gym(l.name,
                l.permalink,
                l.id,
                l.smart_system_id,
                {
                    lat: l.address.position.latitude,
                    lon: l.address.position.longitude,
                    full: fullAdressWithoutPostalCode,
                    postalCode: postalCode
                },
                l.facilities.map(lf => lf.name),
                Object.values(l.schedules).map(s => {
                    let day = stringToDay[s[0].table.weekday]
                    let arrMatch = s[0].table.time.match(/[0-9]+/g);
                    return { dayOfTheWeek: day, opensAs: parseInt(arrMatch![0].toString()), closesAs: parseInt(arrMatch![1].toString()) }
                }), [
                { name: "smart-original-price", price: parseFloat(l.prices.smart.original_price.replace(",", ".")) },
                { name: "smart-promotional-price", price: l.prices.smart.value },
                { name: "black-original-price", price: parseFloat(l.prices.black.original_price.replace(",", ".")) },
                { name: "black-promotional-price", price: l.prices.black.value },
            ], l.plan_names)

        })

        this.data = {}

        for (let index = 0; index < gyms.length; index++) {
            this.data[gyms[index].permalink] = gyms[index]
        }

        return this.data

    }

    static async getRawGymAdditionalProperties(permalink: string): Promise<ILocationAddOns | undefined> {

        this.verbose(`Retrieving general information about academy '${permalink}'...`)

        let response = await axios.get(`${API_URL}/academias/${permalink}`)
        let page = String(response.data)

        let lines = page.split("\n")
        for (var i = 0, len = lines.length; i < len; i++) {
            if (lines[i].includes("ShowLocations/ShowLocations")) {
                let matches = lines[i].match(/(?<=data-react-props=\")(.*?)(?=\s*\")/gi)
                if (!matches)
                    continue;

                this.verbose(`Found general information.`)
                let props = matches[0]
                props = he.decode(props)
                let obj = JSON.parse(props) as ILocationAddOns;

                return obj
            }
        }
        return undefined
    }

    static async getGymAdditionalProperties(permalink: string): Promise<IAdditionalInformation | undefined> {

        if (this.data[permalink].additionalInformation)
            return this.data[permalink].additionalInformation

        let data = await this.getRawGymAdditionalProperties(permalink)

        if (!data) {
            return undefined
        }

        this.verbose(`Optimizing data...`)

        this.data[permalink].additionalInformation = {
            cnpj: data.cnpj
        }

        return this.data[permalink].additionalInformation;
    }

}

