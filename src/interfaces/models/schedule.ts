/**
 * Representação do horário de funcionamento
 */
export interface ISchedule{
    /**
     * Dia da demana em formato de número (Domingo e Feriados: 1; Segunda: 2; Terça:3; Quarta: 4, Quinta: 5, Sexta: 6; Sábado 7.) 
     */
    dayOfTheWeek: number
    /**
     * Hora de abertura
     */
    opensAs: number
    /**
     * Hora de encerramento
     */
    closesAs: number
}