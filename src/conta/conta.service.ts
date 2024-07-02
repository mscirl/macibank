import { Injectable } from '@nestjs/common';
import { ContaBancaria } from './conta.model';
import { Cliente } from '../cliente/cliente.model'; // Verifique o caminho correto

@Injectable()
export class ContaService {
    private contas: ContaBancaria[] = [];

    criarConta(cliente: Cliente, saldoInicial: number): ContaBancaria {
        const novaConta = new ContaBancaria(cliente, saldoInicial);
        this.contas.push(novaConta);
        return novaConta;
    }

    encontrarContaPorNumero(numeroConta: string): ContaBancaria | undefined {
        return this.contas.find(conta => conta.getNumeroDaConta() === numeroConta);
    }

}
