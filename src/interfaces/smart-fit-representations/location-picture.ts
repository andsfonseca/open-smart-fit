/**
 * Informações das imagens de uma determinada academia
 */
export interface ILocationPicture {
    /**
     * Identificador da imagem
     */
    id: number
    /**
     * Identificador da academia
     */
    location_id: number
    /**
     * Legenda da imagem
     */
    caption: string
    /**
     * URL da imagem
     */
    image_url: string
    /**
     * Identificador do Smart System
     */
    smart_system_id: number
    /**
     * Data de criação
     */
    created_at: string
    /**
     * Data de atualização
     */
    updated_at: string
    /**
     * Informação de fragmento
     */
    current_shard: string
}