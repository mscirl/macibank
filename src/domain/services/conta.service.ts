import { Injectable } from '@nestjs/common';
import { Cliente } from '../entities/cliente.entity';
import { ContaBancaria } from '../entities/conta.entity';
import { TipoConta } from '../enums/conta.enum';
import { clienteNaoEncontradoException, contaBancariaInvalidaException } from '../utilities/exceptions';
import { gerarNumeroConta } from '../utilities/utility';

@Injectable()
export class ContaService {
    private contas: ContaBancaria[] = [];

    criarConta(cliente: Cliente, saldoInicial: number): ContaBancaria {
        const numeroConta = gerarNumeroConta();
        if (!cliente || !cliente.id) {
            clienteNaoEncontradoException(cliente ? cliente.id : `Pessoa cliente não encontrada. Favor verifique as informações passadas.`);
        }

        if (saldoInicial < 0) {
            throw new Error('O saldo inicial da conta bancária não pode ser negativo.');
        }

        const novaConta = new ContaBancaria(cliente, gerarNumeroConta(), saldoInicial, TipoConta.CORRENTE);
        this.contas.push(novaConta);
        return novaConta;
    }

    getContaById(id: string): ContaBancaria | undefined {
        const conta = this.contas.find(conta => conta.id === id);
        if (!conta) {
            contaBancariaInvalidaException(id);
        }
        return conta;
    }

    encontrarContaPorNumero(numeroConta: string): ContaBancaria | undefined {
        const conta = this.contas.find(conta => conta.getNumeroDaConta() === numeroConta);
        if (!conta) {
            contaBancariaInvalidaException(numeroConta);
        }
        return conta;
    }
}
