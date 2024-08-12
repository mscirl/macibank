import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteModule } from '../modules/cliente.module';
import { GerenteModule } from '../modules/gerente.module';

@Module({
imports: [
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
    }),
    ClienteModule,
    GerenteModule,
],
})
export class AppModule {}
