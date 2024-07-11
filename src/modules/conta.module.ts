import { Module } from '@nestjs/common';
import { ContaController } from '../controllers/conta.controller';
import { ContaService } from '../services/conta.service';

@Module({
    controllers: [ContaController],
    providers: [ContaService],
})
export class ContaModule {}
