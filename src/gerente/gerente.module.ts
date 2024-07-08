import { Module } from '@nestjs/common';
import { GerenteController } from '../controllers/gerente.controller';
import { GerenteService } from '../services/gerente.service';

@Module({
    controllers: [GerenteController],
    providers: [GerenteService],
})
export class GerenteModule {}
