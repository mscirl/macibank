import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteModule } from '../modules/cliente.module';
import { GerenteModule } from '../modules/gerente.module';
import { typeOrmConfig } from './database/typeorm.config';


@Module({
imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ClienteModule,
    GerenteModule,
],
})
export class AppModule {}
