import { Cliente } from '../../domain/entities/cliente.entity';

export class GetClienteUseCase {
    private clientes: Cliente[] = [];

    execute(id: string): Cliente {
        const cliente = this.clientes.find(cliente => cliente.id === id);
        if (!cliente) {
            throw new Error(`Pessoa cliente com id ${id} não encontrada.`);
        }
        return cliente;
    }
}
