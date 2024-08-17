import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { nomeInvalidoException } from '../../domain/utilities/exceptions';
import { ClienteDto } from './cliente.dto';

export class GerenteDto {
    @IsString()
    @IsNotEmpty()
    nomeCompleto: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ClienteDto)
    @IsOptional()
    clientes?: ClienteDto[];

    constructor(nomeCompleto: string, clientes?: ClienteDto[]) {
        this.nomeCompleto = nomeCompleto;
        this.clientes = clientes;
        nomeInvalidoException(nomeCompleto);
    }
}
