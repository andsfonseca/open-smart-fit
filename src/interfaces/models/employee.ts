/**
 * Representação do funcionário da academia
 */
export interface IEmployee {
    /**
     * Nome do funcionário
     */
    name: string
    /**
     * Cargo do Funcionário
     */
    job: string
    /**
     * CREF do funcionário, se tiver
     */
    cref: string | null
    /**
     * URI com a foto do funcionário
     */
    profilePictureUri: string | null
}