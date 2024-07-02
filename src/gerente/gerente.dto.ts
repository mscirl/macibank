import { Cliente } from '../cliente/cliente.model';

export class CreateGerenteDto {
    nomeCompleto!: string;
    clientes!: Cliente[];
}
