import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { PagamentoDto } from '../dtos/pagamento.dto';
import { TipoPagamentos } from '../enums/pagamento.enum';
import { ExtratoFactory } from '../factories/extrato.factory';
import { PagamentoBoleto, PagamentoPix, metodoDePagamento } from '../models/pagamento.model';
import { SMSObserver } from '../observers/observer.sms';
import { ContaService } from '../services/conta.service';
import { Subject } from '../subjects/subject';


@Controller('conta')
export class ContaController {
    constructor(private readonly contaService: ContaService) {}

    @Post('pagar')
    // Utilizado async pq não tem nenhuma interação com banco de dados,
    // caso tivesse, utilizaria await, isso garante que a consulta continue sem erros
    // Sincrona: acontece em tempo real; Assincrona: não acontece em tempo real (pois o pgto pode ocorrer a qualquer momento)
    async pagar(@Body() pagamentoDto: PagamentoDto): Promise<string> {
        const conta = this.contaService.encontrarContaPorNumero(pagamentoDto.numeroConta);
        if (!conta) {
            return `Conta ${pagamentoDto.numeroConta} não encontrada`;
        }

        let metodoPagamento: metodoDePagamento;
        // Criação de um objeto subject para manipulação dentro do if
        let subject = new Subject();

        if (pagamentoDto.metodo === TipoPagamentos.PIX) {
            metodoPagamento = new PagamentoPix();
            const smsObserver = new SMSObserver();
            subject.addObserver(smsObserver);
        } else if (pagamentoDto.metodo === TipoPagamentos.BOLETO) {
            metodoPagamento = new PagamentoBoleto();
        } else {
            return `Método de pagamento inválido: ${pagamentoDto.metodo}`;
        }

        try {
            conta.pagar(pagamentoDto.valor, metodoPagamento);
            return `Pagamento de R$${pagamentoDto.valor} realizado com sucesso via ${pagamentoDto.metodo}`;
        } catch (error: unknown) {
            if (error instanceof Error) {
                return error.message;
            }
            return 'Ocorreu um erro durante o pagamento. Por favor, refaça o processo.';
        }
    }

    @Get(':id/extrato')
    obterExtrato(@Param('id') id: string) {
        const conta = this.contaService.getContaById(id);
        if (!conta) {
            throw new NotFoundException('Conta não encontrada');
        }

        const extrato = ExtratoFactory.criarExtrato(conta);
        return {
            statusCode: 200,
            message: 'Extrato gerado com sucesso',
            data: extrato,
        };
    }
}