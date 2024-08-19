import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { nomeInvalidoException } from '../../domain/utilities/exceptions';
import { ClienteDto } from './cliente.dto';

export class GerenteDto {
    @IsString()
    @IsNotEmpty()
    nomeCompleto: string;

    @IsOptional()
    codigoPessoa: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ClienteDto)
    @IsOptional()
    clientes?: ClienteDto[];


    constructor(nomeCompleto: string, codigoPessoa: number, clientes?: ClienteDto[]) {
        this.nomeCompleto = nomeCompleto;
        this.clientes = clientes;
        this.codigoPessoa = codigoPessoa;
        nomeInvalidoException(nomeCompleto);
    }
}
