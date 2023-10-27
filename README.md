# Atlas

## O que é o Atlas?

Trata-se de uma aplicação multiplataforma desenvolvida para ajudar pessoas a administrar suas finanças pessoais de forma prática.


## Instalação e uso

Basta fazer download de **Atlas.exe** (ver Releases) e executá-lo. A aplicação é portátil e pode ser utilizada em qualquer sistema operacional.


## Do que o Atlas é feito?

O projeto está sendo desenvolvido utilizando React e Tauri. A armazenagem de dados é feita via 'localStorage' e há 2 dependências fundamentais adicionadas à parte (React Router e 'uuid').


## Como o Atlas funciona?

### 1 - ABAS E FUNCIONALIDADES


A aplicação contém 7 abas que juntas representam toda as funcionalidades atualmente implementadas. Dentro de cada aba, e possível adicionar, editar e remover uma série de informações. Mais sobre as abas:

#### 1.1 - Recursos
Recursos são todos os valores financeiros disponíveis no momento e que podem ser direcionados para qualquer fim.

Ao adicionar um recurso, você deve informar: um nome para o recurso e seu valor correspondente.

Exemplos: salário, saldos em contas bancárias, rendimentos financeiros, etc.

#### 1.2 - Poupanças

Poupanças são recursos preservados para alguma finalidade.
 
Ao adicionar uma poupança, você deve informar: um nome para a poupança, o valor correspondente e o recurso financiador.

Exemplo: guardar dinheiro para uma viagem, para uma compra à vista, etc.

#### 1.3 - Contas

Contas são gastos mensais recorrentes e diretamente relacionados ao seu custo de vida. Seus valores tendem a seguir uma certa média.

Ao adicionar uma conta, você deve informar: um nome para a conta, o valor correspondente e data de vencimento.

Exemplos: faturas de água, energia elétrica, internet, etc.

#### 1.4 - Despesas

Despesas são gastos à parte das contas a serem pagas todos os meses. Podem ser recorrentes ou não e, quando recorrentes, seus valores podem variar.

Despesas normalmente são pagas no ato, sendo esses pagamentos vinculados à recursos ou créditos disponíveis.

Ao adicionar uma despesa, você deve informar: um nome para a despesa, o valor correspondente, a data do pagamento (data de ocorrência da despesa), e o recurso ou opção de crédito utilizado para efetuar o pagamento.

Além disso, você também deve informar a categoria da despesa adicionada. Despesas podem ter as seguintes categorias: "Casa", "Transporte", "Alimentação", "Saúde", "Lazer", "Taxas/Impostos" e "Outro".

Exemplos: jantar fora, comprar um presente, ir ao cinema, compras no supermercado, etc.

#### 1.5 - Parcelas

Parcelas são as partes de uma compra à prazo, utilizando créditos disponíveis ao invés de recursos.

Ao adicionar um parcelamento, você deve informar: um nome para o parcelamento, o valor correspondente a cada parcela, o número total de parcelas e a opção de crédito relacionada.

#### 1.6 - Créditos

Similares aos recursos, os créditos disponíveis estão vinculados à cartões de crédito e podem ser utilizados no pagamento de despesas e compras à prazo. Entretanto, sua utilização possui algumas particularidades das quais abordaremos mais à frente.

Ao adicionar uma opção de crédito, você deve informar: um nome para a opção de crédito, o limite total correspondente e a data de vencimento.

#### 1.7 - Relatórios

Após concluir todas as operações do mês (inclusão de recursos, de despesas, de eventuais parcelas, inclusão e pagamento de contas, etc), você deve clicar em 'Finalizar mês', opção disponível na página inicial da plataforma. Ao finalizar o mês atual, um novo relatório é gerado na aba "Relatórios", contendo uma apresentação simplificada do desempenho financeiro do mês a que ele se refere.

O relatório contém as seguintes informações: "Recursos restantes", "Poupança no período", "Contas pagas", "Contas atrasadas" (contas que não foram pagas no mês), "Despesas do período", "Parcelas do período" e "Créditos restantes".

**Importante**: Apenas finalize o mês quando tiver concluído todas as atividades do mês atual, pois não é possivel voltar atrás mais tarde!
