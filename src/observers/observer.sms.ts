import { TipoPagamentos } from "../domain/enums/pagamento.enum";
import { Observer } from "../ports/repositories/cliente.repository";

export class SMSObserver implements Observer {
    update(data: any): void {
    console.log(`Enviado SMS sinalizando o sucesso de pagamento via ${TipoPagamentos.PIX}.`);
    }
}