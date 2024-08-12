import { Cliente } from '../../domain/entities/cliente.entity';

export class UpdateClienteUseCase {
    private clientes: Cliente[] = [];

    execute(id: string, nomeCompleto?: string, endereco?: string, telefone?: string): Cliente {
        const cliente = this.clientes.find(cliente => cliente.id === id);
        if (!cliente) {
            throw new Error(`Pessoa cliente com id ${id} não encontrada para atualização.`);
        }

        if (nomeCompleto) {
            cliente.nomeCompleto = nomeCompleto;
        }

        if (endereco) {
            cliente.endereco = endereco;
        }

        if (telefone) {
            cliente.telefone = telefone;
        }

        return cliente;
    }
}
