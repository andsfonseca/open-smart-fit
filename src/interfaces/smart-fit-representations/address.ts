
/**
 * Informações de Coordernadas 
 */
export interface ICoordinates {
    /**
     * Latitudade
     */
    latitude: string,
    /**
     * Longitude
     */
    longitude: string
}

/**
 * Informações de endereço
 */
export interface IAddress {
    /**
     * Primeira linha do endereço (Rua, número e bairro)
     */
    first_line: string,
    /**
     * Segunda linha do endereço (Cidade, estado, código postal)
     */
    second_line: string,
    /**
     * Coordenadas geográficas
     */
    position: ICoordinates
}