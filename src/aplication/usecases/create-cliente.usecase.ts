import { Cliente } from '../../domain/entities/cliente.entity';
import { ContaBancaria } from '../../domain/entities/conta.entity';

export class CreateClienteUseCase {
    private clientes: Cliente[] = [];

    execute(nomeCompleto: string, endereco: string, telefone: string, contas: ContaBancaria[] = [], codigoPessoaCliente: number, codigoPessoaGerente: number): Cliente {
        const novoCliente = new Cliente(nomeCompleto, endereco, telefone, contas, codigoPessoaCliente, codigoPessoaGerente);
        this.clientes.push(novoCliente);
        return novoCliente;
    }
}
