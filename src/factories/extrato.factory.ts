import { TipoTransacao } from "../enums/tipotransacao";
import { ContaBancaria } from "../models/conta.model";
import { Transacao } from "./transacao.factory";

export class ExtratoFactory {
    static criarExtrato(conta: ContaBancaria): Transacao[] {
        const extrato: Transacao[] = [];

        extrato.push(new Transacao(TipoTransacao.DEPOSITO, new Date(), 100));
        extrato.push(new Transacao(TipoTransacao.SAQUE, new Date(), -50.0));
        extrato.push(new Transacao(TipoTransacao.TRANSFERENCIA, new Date(), 150.0));

        return extrato;
    }
}

