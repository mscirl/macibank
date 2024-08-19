import { Cliente } from '../../domain/entities/cliente.entity';
import { ContaBancaria } from '../../domain/entities/conta.entity';
import { Gerente } from '../../domain/entities/gerente.entity';

export class CreateClienteUseCase {
    private clientes: Cliente[] = [];

    execute(nomeCompleto: string, endereco: string, telefone: string, contas: ContaBancaria[], codigoPessoaCliente: number, gerente: Gerente): Cliente {
        const novoCliente = new Cliente(nomeCompleto, endereco, telefone, [], codigoPessoaCliente, gerente);
        this.clientes.push(novoCliente);
        return novoCliente;
    }
}
