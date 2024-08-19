<<<<<<< HEAD
<b>/DOCUMENTAÇÃO EM CONSTRUÇÃO/</b>


![macibank_logo](https://github.com/mscirl/macibank/assets/143663252/508e7015-958e-4b9c-afda-314c50d6dace)
Logo fictício criado em: https://looka.com/


# DOCUMENTAÇÃO - API MACIBANK

### Cliente Endpoints

* POST /cliente/criar
Cria um novo cliente com os dados fornecidos.

Parâmetros de Entrada:

nomeCompleto (string): Nome completo do cliente.

endereco (string): Endereço do cliente.

telefone (string): Número de telefone do cliente.

contas (array de ContaBancaria): Lista de contas bancárias associadas ao cliente.

gerente (Gerente): Informações do gerente associado ao cliente.


* GET /cliente/consultar

=> Retorna um array de objetos Cliente com todos os clientes.

Conta Endpoints

POST /conta/criar

Parâmetros de Entrada:

clienteId (string): ID do cliente para o qual a conta será criada.

tipo (string): Tipo da conta ("CORRENTE" ou "POUPANÇA").

saldoInicial (number): Saldo inicial da conta.

=> Retorna o objeto ContaBancaria criado.


* GET /conta/consultar/

Parâmetros de Entrada:

numeroDaConta (string): Número da conta bancária.

=> Retorna o objeto ContaBancaria encontrado ou undefined se não encontrado.


### Gerente Endpoints

* POST /gerente/criar

Parâmetros de Entrada:

nomeCompleto (string): Nome completo do gerente.

clientes (array de Cliente): Lista de clientes associados ao gerente.

=> Retorna o objeto Gerente criado.


* GET /gerente/

Parâmetros de Entrada:

id (string): ID único do gerente.

=> Retorna o objeto Gerente encontrado ou undefined se não encontrado.


Exemplos visuais de chamadas no insominia:

![api02](https://github.com/mscirl/macibank/assets/143663252/0969dbcb-bc37-4e64-8a6f-acb389d1823a)

![api01](https://github.com/mscirl/macibank/assets/143663252/f2db60d2-6597-410c-b4fa-b78e6fd42b3b)

![api03](https://github.com/mscirl/macibank/assets/143663252/d7bad23d-2a61-4b6b-8af3-8e542e1e278e)

![api04](https://github.com/mscirl/macibank/assets/143663252/b3e89678-8a03-4d85-968c-9f7ef7367a60)


### Estrutura do projeto está organizada da seguinte maneira:

src/

│

├── cliente/

│   ├── cliente.controller.ts       // Controladores para endpoints relacionados a clientes.

│   ├── cliente.service.ts          // Lógica de negócio para clientes.

│   ├── cliente.model.ts            // Modelo de dados para clientes.

│   └── cliente.module.ts           // Módulo do NestJS para clientes.

│

├── conta/

│   ├── conta.controller.ts         // Controladores para endpoints relacionados a contas bancárias.

│   ├── conta.service.ts            // Lógica de negócio para contas bancárias.

│   ├── conta.model.ts              // Modelo de dados para contas bancárias.

│   └── conta.module.ts             // Módulo do NestJS para contas bancárias.

│

├── gerente/

│   ├── gerente.controller.ts       // Controladores para endpoints relacionados a gerentes.

│   ├── gerente.service.ts          // Lógica de negócio para gerentes.

│   ├── gerente.model.ts            // Modelo de dados para gerentes.

│   └── gerente.module.ts           // Módulo do NestJS para gerentes.

│

├── app.controller.ts               // Controladores principais da aplicação.

├── app.module.ts                   // Módulo principal da aplicação.

├── app.service.ts                  // Serviços principais da aplicação.

├── helpers.ts                      // Funções auxiliares para validações e lógica de negócio.

└── main.ts                         // Arquivo de entrada principal da aplicação.


test/

└── Arquivos de teste para os diferentes módulos da aplicação.
=======
>>>>>>> 796f5ddf375211b18931be74d7568ddc9fe18ae6
