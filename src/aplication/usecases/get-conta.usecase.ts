import { ContaBancaria } from '../../domain/entities/conta.entity';

export class GetContaUseCase {
    private contas: ContaBancaria[] = [];

    execute(numeroConta: string): ContaBancaria {
        const conta = this.contas.find(conta => conta.getNumeroDaConta() === numeroConta);
        if (!conta) {
            throw new Error(`Conta de número ${numeroConta} não encontrada.`);
        }
        return conta;
    }
}
