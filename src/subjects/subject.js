"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subject = void 0;
class Subject {
    constructor() {
        this.observers = [];
    }
    //adiciona observer
    addObserver(observer) {
        this.observers.push(observer);
    }
    //remove observer
    removeObserver(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }
    //notifica observer
    notify(data) {
        this.observers.forEach(observer => observer.update(data));
    }
}
exports.Subject = Subject;
//essa estrutura garante a não sobrecarga do sistema e notifica somente partes envolvidas, quando houver necessidade
// o subject controla a lista dos observadores, bem como, remove, adiciona, ou notifica o que for necessário
