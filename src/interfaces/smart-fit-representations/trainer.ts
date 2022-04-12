/**
 * Representação de um funcionário da academia
 */
export interface ITrainer {
    /**
     * Nome do Funcionário
     */
    name: string
    /**
     * URI com imagem do funcionário
     */
    picture: any
    /**
     * Trabalho do funcionário
     */
    role: string
    /**
     * Registro no CREF
     */
    cref: string
}