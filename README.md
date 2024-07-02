![macibank_logo](https://github.com/mscirl/macibank/assets/143663252/e7856599-660a-4db9-90e0-3f28779590ae)

_Logo fictício criado em: https://looka.com/_

# Documentação da API - Macibank

## Endpoints Disponíveis a seguir:

**Cliente Endpoints**
POST /cliente/criar
_Cria um novo cliente com os dados fornecidos._
Retorna o objeto Cliente criado.

**Parâmetros de Entrada:**
* nomeCompleto (string): Nome completo do cliente.
* endereco (string): Endereço do cliente.
* telefone (string): Número de telefone do cliente.
* contas (array de ContaBancaria): Lista de contas bancárias associadas ao cliente.
* gerente (Gerente): Informações do gerente associado ao cliente.


GET /cliente/consultar
_Retorna todos os clientes cadastrados na API._

**Conta Endpoints**
Os endpoints relacionados a contas bancárias estão em desenvolvimento.

**Gerente Endpoints**
POST /gerente

Cria um novo gerente com os dados fornecidos.
Parâmetros de Entrada:
nomeCompleto (string): Nome completo do gerente.
clientes (array de Cliente): Lista de clientes associados ao gerente.
Retorno: Retorna o objeto Gerente criado.

GET /gerente/
_Retorna as informações de um gerente específico com base no ID fornecido._

Parâmetros de Entrada:
id (string): ID único do gerente.
_Retorna o objeto Gerente encontrado ou undefined se não encontrado._


## Exemplos de chamadas no insomnia:

![api01](https://github.com/mscirl/macibank/assets/143663252/80094ff2-6548-4a17-aa21-b230585bc90f)

![api02](https://github.com/mscirl/macibank/assets/143663252/3c1a9950-6df3-4015-a28c-0252291b5432)


## Estrutura do Projeto:

src/

cliente/

cliente.controller.ts: Controladores para endpoints relacionados a clientes.


cliente.service.ts: Lógica de negócio para clientes.

cliente.model.ts: Modelo de dados para clientes.

cliente.module.ts: Módulo do NestJS para clientes.

conta/

conta.controller.ts: Controladores para endpoints relacionados a contas bancárias.

conta.service.ts: Lógica de negócio para contas bancárias.

conta.model.ts: Modelo de dados para contas bancárias.

conta.module.ts: Módulo do NestJS para contas bancárias.

gerente/

gerente.controller.ts: Controladores para endpoints relacionados a gerentes.

gerente.service.ts: Lógica de negócio para gerentes.

gerente.model.ts: Modelo de dados para gerentes.

gerente.module.ts: Módulo do NestJS para gerentes.

app.controller.ts: Controladores principais da aplicação.

app.module.ts: Módulo principal da aplicação.

app.service.ts: Serviços principais da aplicação.

helpers.ts: Funções auxiliares para validações e lógica de negócio.

main.ts: Arquivo de entrada principal da aplicação.

test/

Arquivos de teste para os diferentes módulos da aplicação.
