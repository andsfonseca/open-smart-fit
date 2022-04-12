import axios, { AxiosResponse } from "axios";
import { API_URL } from "./common/urls";
import { ILocation, IPagination } from "./interfaces/smart-fit-representations";
import { ILocationAddOns } from "./interfaces/smart-fit-representations/location";
import { Gym } from "./models/gym";
import { IAdditionalInformation } from "./interfaces/models";
import he from "he"

/**
 * Módulo responsável pela listagem de Ginásios
 */
export abstract class Gyms {

    /**
     * Método usado para envio de Logs
     * @param _ Texto do Log
     */
    public static verbose: (s: string) => void = (_: string) => { }

    /**
     * Dicionário com os dados extraídos da Smartfit.com.br, o permalink é a chave e seu valor é uma entidade 'Gym'
     */
    private static data: { [index: string]: Gym };

    /**
     * Recupera o JSON da Smartfit com uma lista de localizações da Academias, incluindo suas informações gerais
     * @returns Retorna uma lista de academias no formato padrão da Smartfit.com.br
     */
    static async getRawData(): Promise<ILocation[]> {

        this.verbose("Retrieving general information...")

        let locations: ILocation[] = []
        let page = 1

        //Recupera a primeira página
        let response = await axios.get<IPagination>(`${API_URL}/academias.json?name=&page=${page}`)

        let data = response.data
        locations.push(...data.locations)

        //Calcula as proximas requisições
        let max_pages = Math.ceil(data.locations_count / 8)
        this.verbose(`Creating ${max_pages + 1} requests.`)

        //Cria as tasks
        let tasks: Promise<AxiosResponse<IPagination, any>>[] = []
        for (page = 2; page <= max_pages; page++)
            tasks.push(axios.get<IPagination>(`${API_URL}/academias.json?name=&page=${page}`))

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

    /**
     * Recupera um conjunto de academias da Smartfit
     * @returns Retorna um dicionário de academias identificadas por seu `permalink`
     */
    static async getData(): Promise<{ [index: string]: Gym }> {

        //Verifica se os dados já foram salvos algumas vez
        if (this.data)
            return this.data;

        //Requisita as localizações
        let locations = await this.getRawData()

        //Auxilar de Dias da Semana para Index
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

        //Para cada localização
        let gyms = locations.map(l => {

            //Extrai o endereço
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
                //Mapeia as facilidades
                l.facilities.map(lf => lf.name),
                //Mapeias os horários
                Object.values(l.schedules).map(s => {
                    let day = stringToDay[s[0].table.weekday]
                    let arrMatch = s[0].table.time.match(/[0-9]+/g);
                    return { dayOfTheWeek: day, opensAs: parseInt(arrMatch![0].toString()), closesAs: parseInt(arrMatch![1].toString()) }
                }),
                // Mapeia os preços
                [{ name: "smart-original-price", price: parseFloat(l.prices.smart.original_price.replace(",", ".")) },
                { name: "smart-promotional-price", price: l.prices.smart.value },
                { name: "black-original-price", price: parseFloat(l.prices.black.original_price.replace(",", ".")) },
                { name: "black-promotional-price", price: l.prices.black.value },
                ],
                l.plan_names)

        })

        this.data = {}

        //Para cada localização, escreve no dicionário
        for (let index = 0; index < gyms.length; index++) {
            this.data[gyms[index].permalink] = gyms[index]
        }

        //Retorna as academias
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
            cnpj: data.cnpj,
            imagesUri: data.locationPictures.map(lp => lp.image_url)
        }

        return this.data[permalink].additionalInformation;
    }

}

