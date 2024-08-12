import { Module } from '@nestjs/common';
import { ContaService } from '../domain/services/conta.service';
import { ContaController } from '../infrastructure/adapters/conta.controller';

@Module({
    controllers: [ContaController],
    providers: [ContaService],
})
export class ContaModule {}
