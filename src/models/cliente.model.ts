import { v4 as uuidv4 } from 'uuid';
import { gerenteDaConta, validaNome } from '../helpers/helpers';
import { ContaBancaria } from '../models/conta.model';
import { Gerente } from './gerente.model';

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
