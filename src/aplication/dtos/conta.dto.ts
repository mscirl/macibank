import { IsEnum, IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';
import { TipoConta } from '../../domain/enums/conta.enum';

export class ContaBancariaDto {
    @IsString()
    @IsNotEmpty({ message: 'Por favor, digite o número da conta para prosseguir.' })
    @Length(8, 8, { message: 'O número da conta deve ser composto por 8 dígitos.' })
    numeroConta: string;

    @IsNotEmpty({ message: 'Por favor, informe o saldo da conta.' })
    @IsNumber({}, { message: 'O saldo deve ser composto por números.' })
    saldo: number;

    @IsString()
    @IsNotEmpty({ message: 'Por gentileza, informe o tipo de sua conta bancária.' })
    @IsEnum(TipoConta, { message: 'Tipo de conta inválido. Por gentileza, informe um dos tipos aceitos: "CONTA CORRENTE" ou "CONTA POUPANÇA".' })
    tipo: TipoConta;

    constructor(numeroConta: string, saldo: number, tipo: TipoConta) {
        this.numeroConta = numeroConta;
        this.saldo = saldo;
        this.tipo = TipoConta.CORRENTE || TipoConta.POUPANCA;
    }
}