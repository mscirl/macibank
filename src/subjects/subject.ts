import { Observer } from "../ports/repositories/cliente.repository";

export class Subject {
    private observers: Observer [] = [];

    //adiciona observer
    addObserver(observer: Observer) {
        this.observers.push(observer);
    }

    //remove observer
    removeObserver(observer: Observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    //notifica observer
    notify(data: any) {
        this.observers.forEach(observer => observer.update(data));
    }
}

//essa estrutura garante a não sobrecarga do sistema e notifica somente partes envolvidas, quando houver necessidade
// o subject controla a lista dos observadores, bem como, remove, adiciona, ou notifica o que for necessário