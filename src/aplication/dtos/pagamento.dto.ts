import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class PagamentoDto {
@IsString()
@IsNotEmpty()
@Length(8)
numeroConta: string;

@IsNumber()
@IsNotEmpty()
valor: number;

@IsNotEmpty()
metodo: string;

constructor(numeroConta: string, valor: number, metodo: string){
    this.numeroConta = numeroConta;
    this.valor = valor;
    this.metodo = metodo;
    }

}