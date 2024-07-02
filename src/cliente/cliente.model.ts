import { v4 as uuidv4 } from 'uuid';
import { Gerente } from '../gerente/gerente.model';
import { validaNome, gerenteDaConta } from '../helpers';
import { ContaBancaria } from '../conta/conta.model';

let listaIds: string[] = [];
let listaNomes: string[] = [];


export class Cliente {
    nomeCompleto: string;
    id: string = ''; 
    endereco: string;
    telefone: string;
    contas: ContaBancaria[];
    gerente: Gerente;

    constructor(nomeCompleto: string, endereco: string, telefone: string, contas: ContaBancaria[], gerente: Gerente) {
            const index = listaNomes.indexOf(nomeCompleto);
            if (index !== -1) {
                this.id = listaIds[index];
            } else {
                this.id = uuidv4();
                listaIds.push(this.id);
                listaNomes.push(nomeCompleto);
            }
        
        this.id = uuidv4();
        this.nomeCompleto = nomeCompleto;
        this.endereco = endereco;
        this.telefone = telefone;
        this.contas = contas;
        this.gerente = gerente;

        const mensagemErroNome = validaNome(nomeCompleto);
        if (mensagemErroNome) {
            throw new Error(mensagemErroNome);
        }

        const mensagemErroGerente = gerenteDaConta(gerente.nomeCompleto);
        if (mensagemErroGerente) {
            throw new Error(mensagemErroGerente);
        }
    }
}
