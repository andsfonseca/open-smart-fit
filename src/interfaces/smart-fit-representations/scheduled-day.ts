/**
 * Horários de funcionamento da academia para cada dia da semana
 */
export interface IScheduledDays {
    /**
     * Horário de funcionamento
     */
    table: IScheduledDayItem
}

/**
 * Representação do horário de funcionamento
 */
export interface IScheduledDayItem {
    /**
     * Dia da semana
     */
    weekday: string,
    /**
     * Horário de abertura e fechamento separdos por hífen
     */
    time: string
}