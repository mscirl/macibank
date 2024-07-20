// implementação de observer que verifica pgtos por PIX para envio de notificação

export interface Observer {
    update(data: any): void;
}
