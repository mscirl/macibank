import { Injectable } from '@nestjs/common';
import { Gerente } from './gerente.model'; 

@Injectable()
export class GerenteService {
    private readonly gerentes: Gerente[] = []; 

    findAll(): Gerente[] {
        return this.gerentes;
    }

    findOne(id: string): Gerente | undefined {
        return this.gerentes.find(gerente => gerente.id === id);
    }

    create(gerente: Gerente): Gerente {
        this.gerentes.push(gerente);
        return gerente;
    }

    update(id: string, gerente: Gerente): Gerente | undefined {
        const index = this.gerentes.findIndex(g => g.id === id);
        if (index !== -1) {
            this.gerentes[index] = gerente;
            return gerente;
        }
        return undefined; 
    }

    remove(id: string): void {
        const index = this.gerentes.findIndex(g => g.id === id);
        if (index !== -1) {
            this.gerentes.splice(index, 1);
        }
    }
}
