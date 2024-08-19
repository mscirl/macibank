import { ContaBancariaDto } from './conta.dto';
import { GerenteDto } from './gerente.dto';

export class RespostaClienteDto {
    id: string;
    nomeCompleto: string;
    endereco: string;
    telefone: string;
    codigoPessoa: number;
    contas: ContaBancariaDto[];
    gerente?: GerenteDto | null;

    constructor(id: string, nomeCompleto: string, endereco: string, telefone: string, codigoPessoa: number, contas: ContaBancariaDto[], gerente?: GerenteDto | null) {
        this.id = id;
        this.nomeCompleto = nomeCompleto;
        this.endereco = endereco;
        this.telefone = telefone;
        this.codigoPessoa = codigoPessoa;
        this.contas = contas;
        this.gerente = gerente;
    }
}