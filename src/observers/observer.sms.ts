import { TipoPagamentos } from "../enums/pagamento.enum";
import { Observer } from "./observer.sms.interface";

export class SMSObserver implements Observer {
    update(data: any): void {
    console.log(`Enviado SMS sinalizando o sucesso de pagamento via ${TipoPagamentos.PIX}.`);
    }
}