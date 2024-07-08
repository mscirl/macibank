import { Observer } from "./observer.sms.interface";
import { TipoPagamentos } from "../enums/enum.conta/pagamento.enum";

export class SMSObserver implements Observer {
    update(data: any): void {
    console.log(`Enviado SMS sinalizando o sucesso de pagamento via ${TipoPagamentos.PIX}.`);
    }
}