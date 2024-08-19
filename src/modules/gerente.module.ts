import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gerente } from '../domain/entities/gerente.entity';
import { GerenteRepository } from '../domain/repositories/gerente.repository';
import { GerenteService } from '../domain/services/gerente.service';

@Module({
imports: [TypeOrmModule.forFeature([Gerente])],
providers: [GerenteService, GerenteRepository],
exports: [GerenteService, GerenteRepository],
})
export class GerenteModule {}
