import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ContaBancariaDto } from './conta.dto';

export class ClienteDto {
    @IsString()
    @IsNotEmpty({ message: 'Por favor, informe o nome completo da pessoa cliente.' })
    nomeCompleto: string;

    @IsString()
    @IsNotEmpty({ message: 'Por favor, digite um endereço válido.' })
    endereco: string;

    @IsString()
    @IsNotEmpty({ message: 'Informe um número de telefone para continuar.' })
    telefone: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ContaBancariaDto)
    contas: ContaBancariaDto[];

    @IsString()
    @IsOptional()
    gerenteId: string;

    constructor(
        nomeCompleto: string,
        endereco: string,
        telefone: string,
        contas: ContaBancariaDto[],
        gerenteId: string,
    ) {
        this.nomeCompleto = nomeCompleto;
        this.endereco = endereco;
        this.telefone = telefone;
        this.contas = contas;
        this.gerenteId = gerenteId;
    }
}