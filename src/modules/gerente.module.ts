import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gerente } from '../domain/entities/gerente.entity';
import { GerenteService } from '../domain/services/gerente.service';

@Module({
imports: [TypeOrmModule.forFeature([Gerente])],
providers: [GerenteService],
exports: [GerenteService],
})
export class GerenteModule {}
