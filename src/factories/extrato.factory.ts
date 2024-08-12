import { ContaBancaria } from "../domain/entities/conta.entity";
import { TipoTransacao } from "../domain/enums/tipo-de-transacao.enum";
import { Transacao } from "./transacao.factory";

export class ExtratoFactory {
    static criarExtrato(conta: ContaBancaria): Transacao[] {
        const extrato: Transacao[] = [];


        //simulação de algumas transações
        extrato.push(new Transacao(TipoTransacao.DEPOSITO, new Date(), 100));
        extrato.push(new Transacao(TipoTransacao.SAQUE, new Date(), -50.0));
        extrato.push(new Transacao(TipoTransacao.TRANSFERENCIA, new Date(), 150.0));

        return extrato;
    }
}

