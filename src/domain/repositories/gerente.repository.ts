import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gerente } from '../entities/gerente.entity';

@Injectable()
export class GerenteRepository {
    constructor(
        @InjectRepository(Gerente)
        private readonly repository: Repository<Gerente>,
    ) {}

    async findById(id: string): Promise<Gerente> {
        const gerente = await this.repository.findOne({ where: { id } });
        if (!gerente) {
            throw new NotFoundException(`Gerente com id ${id} não foi encontrado.`);
        }
        return gerente;
    }

    async save(gerente: Gerente): Promise<Gerente> {
        return this.repository.save(gerente);
    }

    async findAll(): Promise<Gerente[]> {
        return this.repository.find();
    }
}
