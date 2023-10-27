# Atlas

## O que é o Atlas?

Trata-se de uma aplicação multiplataforma desenvolvida para ajudar pessoas a administrar suas finanças pessoais de forma prática.


## Instalação e uso

Basta fazer download de **Atlas.exe** (ver Releases) e executá-lo. A aplicação é portátil e pode ser utilizada em qualquer sistema operacional.


## Do que o Atlas é feito?

O projeto está sendo desenvolvido utilizando React e Tauri. A armazenagem de dados é feita via 'localStorage' e há 2 dependências fundamentais adicionadas à parte (React Router e 'uuid').


## Como o Atlas funciona?

### 1 - CONCEITOS E FUNCIONALIDADES

Dentro da aplicação, o usuário pode adicionar, editar e remover uma série de informações sobre seus recursos financeiros disponíveis, poupanças abertas, contas, despesas, parcelamentos e opções de crédito.

Ao longo de cada mês, o usuário deve alimentar a aplicação com os dados necessários. Quando todas as atividades referentes ao mês forem concluídas, o usuário deve "finalizar o mês", fazendo com que a plataforma avance para o mês seguinte. As dados fornecidos pelo usuário muitas vezes se relacionam entre si e com o tempo. Confira a seguir os detalhes:

#### 1.1 - Recursos
Recursos são todos os valores financeiros disponíveis no momento e que podem ser direcionados para qualquer fim.

Ao adicionar um recurso, o usuário deve informar: um nome para o recurso e seu valor correspondente.

**Exemplos**: salário, saldos em contas bancárias, rendimentos financeiros, etc.

#### 1.2 - Poupanças

Poupanças são recursos preservados para alguma finalidade.
 
Ao adicionar uma poupança, o usuário deve informar: um nome para a poupança, o valor correspondente e o recurso financiador.

**Recurso Financiador**: os valores poupados registrados na aba "Poupanças" precisam vir de algum lugar, da mesma forma que você só pode poupar um recurso que possui. Por isso, só é possível cadastrar uma poupança havendo um recurso disponível cujo valor seja ao menos igual ao da poupança pretendida. Quando uma poupança é adicionada, o valor poupado é deduzido do recurso indicado pelo usuário - o "recurso financiador".

Exemplo: guardar dinheiro para uma viagem, para uma compra à vista, etc.

#### 1.3 - Contas

Contas são gastos mensais recorrentes e diretamente relacionados ao seu custo de vida. Seus valores tendem a seguir uma certa média.

Ao adicionar uma conta, o usuário deve informar: um nome para a conta, o valor correspondente e data de vencimento.

Quando uma conta é adicionada, a mesma aparece na página inicial como um cartão contendo todas as informações indicadas pelo usuário (nome da conta, valor e data de vencimento). O usuário deve indicar o pagamento das contas cadastradas através desses cartões.

Contudo, só é possível indicar o pagamento de uma conta hanvendo um recurso disponível cujo valor seja ao menos igual ao da conta em questão. Afinal de contas, precisamos utilizar algum recurso existente para pagar contas, não é mesmo?

Ao indicar o pagamento de uma conta, o valor da mesma é deduzido do recurso pagante indicado pelo usuário.

Exemplos: faturas de água, energia elétrica, internet, etc.

#### 1.4 - Despesas

Despesas são gastos à parte das contas a serem pagas todos os meses. Podem ser recorrentes ou não e, quando recorrentes, seus valores podem variar.

Despesas normalmente são pagas no ato, sendo esses pagamentos vinculados à recursos ou créditos disponíveis.

Ao adicionar uma despesa, o usuário deve informar: um nome para a despesa, o valor correspondente, a data do pagamento (data de ocorrência da despesa), e o recurso ou opção de crédito utilizado para efetuar o pagamento.

Além disso, você também deve informar a categoria da despesa adicionada. Despesas podem ter as seguintes categorias: "Casa", "Transporte", "Alimentação", "Saúde", "Lazer", "Taxas/Impostos" e "Outro".

Exemplos: jantar fora, comprar um presente, ir ao cinema, compras no supermercado, etc.

#### 1.5 - Parcelas

Parcelas são as partes de uma compra à prazo, utilizando créditos disponíveis ao invés de recursos.

Ao adicionar um parcelamento, o usuário deve informar: um nome para o parcelamento, o valor correspondente a cada parcela, o número total de parcelas e a opção de crédito relacionada.

#### 1.6 - Créditos

Os créditos disponíveis podem ser utilizados no pagamento de despesas e em parcelamentos. Entretanto, sua utilização possui algumas particularidades:

**Despesas, Recursos e Créditos**: o pagamento de despesas normalmente é feito no ato. Por isso, ao adicionar uma nova despesa, você deve indicar um recurso (caso o pagamento seja à vista ou no débito) ou uma opção de crédito (caso o pagamento seja no crédito) pagante. Recursos e opções de crédito só podem ser indicados como pagantes caso tenham um valor, ao menos, igual ao valor da despesa em questão. Quando um recurso é indicado como o pagador de uma despesa, o valor da despesa é deduzido do recurso indicado. O mesmo vale para opções de crédito, havendo um adendo importante: despesas relacionadas à uma opção de crédito geram uma fatura para aquela opção de crédito. Falaremos mais sobre faturas em breve.

**Parcelamentos e Crédito**: só é possível adicionar um novo parcelamento tendo uma opção de crédito previamente cadastrada cujo o valor do crédito disponível seja, ao menos, igual ao valor do parcelamento total (dado pelo valor da parcela multiplicado pelo número de parcelas), assim como você precisa de um cartão de crédito para comprar no crédito. Além disso, assim como nas despesas pagas com opções de crédito, os parcelamentos relacionados à uma opção de crédito são adicionados à fatura da opção de credito em questão. Importante: O Atlas atualiza automaticamente o progresso dos seus parcelamentos no tempo e os remove automaticamente quando o parcelamento chega ao fim.

Ao adicionar uma opção de crédito, o usuário deve informar: um nome para a opção de crédito, o limite total correspondente e a data de vencimento.



#### 1.7 - Relatórios

Após concluir todas as operações do mês (inclusão de recursos, de despesas, de eventuais parcelas, inclusão e pagamento de contas, etc), você deve clicar em 'Finalizar mês', opção disponível na página inicial da plataforma. Ao finalizar o mês atual, um novo relatório é gerado na aba "Relatórios", contendo uma apresentação simplificada do desempenho financeiro do mês a que ele se refere.

O relatório contém as seguintes informações: "Recursos restantes", "Poupança no período", "Contas pagas", "Contas atrasadas" (contas que não foram pagas no mês), "Despesas do período", "Parcelas do período" e "Créditos restantes".

**Importante**: Apenas finalize o mês quando tiver concluído todas as atividades do mês atual, pois não é possivel voltar atrás mais tarde!
