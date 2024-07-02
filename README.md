![macibank_logo](https://github.com/mscirl/macibank/assets/143663252/508e7015-958e-4b9c-afda-314c50d6dace)

# Documentação da API - Macibank

## Endpoints Disponíveis

###Cliente Endpoints
POST /cliente/criar

Cria um novo cliente com os dados fornecidos.

**Parâmetros de Entrada:**
nomeCompleto (string): Nome completo do cliente.
endereco (string): Endereço do cliente.
telefone (string): Número de telefone do cliente.
contas (array de ContaBancaria): Lista de contas bancárias associadas ao cliente.
gerente (Gerente): Informações do gerente associado ao cliente.
Retorno: Retorna o objeto Cliente criado.
GET /cliente/consultar

Retorna todos os clientes cadastrados na API.
Retorno: Retorna um array de objetos Cliente.

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

Retorna as informações de um gerente específico com base no ID fornecido.
Parâmetros de Entrada:
id (string): ID único do gerente.
Retorno: Retorna o objeto Gerente encontrado ou undefined se não encontrado.
Estrutura do Projeto


Exemplos visuais de chamadas no insominia:

![api02](https://github.com/mscirl/macibank/assets/143663252/0969dbcb-bc37-4e64-8a6f-acb389d1823a)

![api01](https://github.com/mscirl/macibank/assets/143663252/f2db60d2-6597-410c-b4fa-b78e6fd42b3b)



##Estrutura do projeto está organizada da seguinte maneira:

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
