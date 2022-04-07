/**
 * Recursos disponíveis na academia
 */
export interface IFacility {
    /**
     * Identificador do recurso
     */
    id: number,
    /**
     * Nome do recurso
     */
    name: string,
    /**
     * Descrição do recurso
     */
    description: string,
    /**
     * Identificador do ícone do recurso
     */
    icon_svg_slug: string
}