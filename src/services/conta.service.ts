import { Injectable } from '@nestjs/common';
import { ContaBancaria, TipoConta } from '../models/conta.model';
import { Cliente } from '../models/cliente.model';

@Injectable()
export class ContaService {
    private contas: ContaBancaria[] = [];

    criarConta(cliente: Cliente, saldoInicial: number): ContaBancaria {
        const novaConta = new ContaBancaria(cliente, TipoConta.CORRENTE, saldoInicial);
        this.contas.push(novaConta);
        return novaConta;
    }

    encontrarContaPorNumero(numeroConta: string): ContaBancaria | undefined {
        return this.contas.find(conta => conta.getNumeroDaConta() === numeroConta);
    }
}