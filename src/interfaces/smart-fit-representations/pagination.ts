import { ILocation } from "./location"

/**
 * Informações de paginação da busca por academia
 */
export interface IPagination {
    /**
     * Array com os informações sobre as academias. (Normalmente, 8 por página)
     */
    locations: ILocation[]
    /**
     * Quantidade de academias
     */
    locations_count: number
    /**
     * Numéro da próxima página
     */
    next_page?: number
    /**
     * Tipo de visualização usada no front-end do website
     */
    view_type: string
}