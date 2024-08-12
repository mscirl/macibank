import { Injectable } from '@nestjs/common';
import { Cliente } from '../entities/cliente.entity'; // Corrigido import
import { ContaBancaria } from '../entities/conta.entity';
import { TipoConta } from '../enums/conta.enum';

@Injectable()
export class ContaService {
    private contas: ContaBancaria[] = [];

    criarConta(cliente: Cliente, saldoInicial: number): ContaBancaria {
        const novaConta = new ContaBancaria(cliente, '12345678', saldoInicial, TipoConta.CORRENTE); // Adicionado número da conta fictício
        this.contas.push(novaConta);
        return novaConta;
    }

    getContaById(id: string): ContaBancaria | undefined {
        return this.contas.find(conta => conta.id === id);
    }

    encontrarContaPorNumero(numeroConta: string): ContaBancaria | undefined {
        return this.contas.find(conta => conta.getNumeroDaConta() === numeroConta);
    }
}
