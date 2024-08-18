import { Gerente } from "../entities/gerente.entity";

export class NomeInvalidoException extends Error {
    constructor() {
        super('Digite um nome completo válido para prosseguir por favor.');
        this.name = 'NomeInvalidoException';
    }
}

export function nomeInvalidoException(nomeCompleto: string | undefined) {
    console.log("Validando nome completo:", nomeCompleto);
    if (!nomeCompleto || typeof nomeCompleto !== 'string') {
        throw new NomeInvalidoException();
    }
    const nome = nomeCompleto.trim().split(/\s+/); // verifica se existe, pelo menos, duas palavras separadas por espaço
    if (nome.length < 2) {
        throw new NomeInvalidoException();
    }
}




export class ContaBancariaInvalidaException extends Error {
    constructor(numeroConta: string) {
        super(`A conta bancária de número ${numeroConta} não foi encontrada.`);
        this.name = 'ContaBancariaInvalidaException';
    }
}

export function contaBancariaInvalidaException(numeroConta: string) {
    if (!numeroConta) {
        throw new ContaBancariaInvalidaException(numeroConta);
    }
}


export class ClienteNaoEncontradoException extends Error {
    constructor(id: string) {
        super(`Pessoa cliente de id ${id} não encontrada.`);
        this.name = 'ClienteNaoEncontradoException';
    }
}

export function clienteNaoEncontradoException(id: string) {
    throw new ClienteNaoEncontradoException(id);
}


export class GerenteInvalidoException extends Error {
    constructor() {
        super(`Pessoa gerente não encontrada. Favor verifique o id informado.`)
        this.name = 'GerenteInvalidoException';
    }
}

export function gerenteInvalidoException(gerente: Gerente | null) {
    if (!gerente) {
        throw new GerenteInvalidoException();
    }
}