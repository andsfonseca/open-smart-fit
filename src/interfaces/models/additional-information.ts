import { IEmployee } from "./employee"

/**
 * Informações adicionais da academia
 */
export interface IAdditionalInformation{
    /**
     * CNPJ da academia
     */
    cnpj : string
    /**
     * URI com fotos da academia
     */
    imagesUri: string[]
    /**
     * Funcionários da academia
     */
    employees: IEmployee[]
}