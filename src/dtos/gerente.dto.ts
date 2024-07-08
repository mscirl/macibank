import { Cliente } from '../models/cliente.model';

export class CreateGerenteDto {
    nomeCompleto!: string;
    clientes!: Cliente[];
}
