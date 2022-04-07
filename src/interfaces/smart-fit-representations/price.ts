/**
 * Informações sobre preços dos planos da academia
 */
export interface IPrice {
    /**
     * Preço da mensalidade em inteiro
     */
    integer: number,
    /**
     * Preço da mensalidade em decimal
     */
    decimal: string,
    /**
     * Preço da mensalidade
     */
    value: number,
    /**
     * Preço original da mensalidade em reais
     */
    original_price: string
}