import { v4 as uuidv4 } from 'uuid';


export function validaNome(nomeCompleto: string){
    if(nomeCompleto === " "){
        return "Digite seu nome completo para prosseguir, por favor."
    } return null;
}

export function gerenteDaConta(gerente: string){
    if(gerente === " "){
        return "É obrigatória a informação de pessoa gerente da conta."
    } return null;
}

// Aqui são criadas variáveis
export function gerarIdUnico(idsExistente: string[], idAtual: string): string {
    if (idsExistente.includes(idAtual)) {
        let novoId = uuidv4();
        
        while (idsExistente.includes(novoId)) {
            novoId = uuidv4();
        }

        return novoId;
    } else {
        return idAtual;
    }
}