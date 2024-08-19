import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, ValidateNested } from 'class-validator';
import { ContaBancariaDto } from './conta.dto';
import { GerenteDto } from './gerente.dto';

export class ClienteDto {
    @IsString()
    @IsNotEmpty({ message: 'Por favor, informe o nome completo da pessoa cliente.' })
    nomeCompleto: string;

    @IsString()
    @IsNotEmpty({ message: 'Por favor, digite um endereço válido.' })
    endereco: string;

    @IsString()
    @IsPhoneNumber('BR', { message: 'Número de telefone inválido' })
    @IsNotEmpty({ message: 'Informe um número de telefone para continuar.' })
    telefone: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ContaBancariaDto)
    contas: ContaBancariaDto[];

    @IsOptional()
    gerente: GerenteDto;

    constructor(nomeCompleto: string, endereco: string, telefone: string, contas: ContaBancariaDto[], gerente: GerenteDto) {
        this.nomeCompleto = nomeCompleto;
        this.endereco = endereco;
        this.telefone = telefone;
        this.contas = contas;
        this.gerente = gerente;
    }
}