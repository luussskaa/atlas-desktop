import Config from '../assets/config.svg';

import "../../public/Instrucoes.css";

export default function Instrucoes() {
    return (
        <div className="Instrucoes">
            <h1>Confira abaixo algumas informações importantes:</h1>
            <br />
            <h2>O que é o Atlas?</h2>
            <p>O Atlas é uma plataforma desenvolvida para te ajudar a administrar suas finanças pessoais de forma prática.</p>
            <br />
            <h2>Como o Atlas funciona?</h2>
            <h3>1 - ABAS E FUNCIONALIDADES</h3>
            <p>Dentro da plataforma existem 7 abas que juntos representam toda as funcionalidades. Dentro de cada aba, e possível adicionar, editar e remover uma série de informações. As abas são:</p>
            <br />
            <h3>1.1 - Recursos</h3>
            <p>Recursos são todos os valores disponíveis no momento e que podem ser direcionado para qualquer fim.</p>
            <p>Ao adicionar um recurso, você deve informar: um nome para o recurso e um valor correspondente.</p>
            <p><b>Exemplos:</b> salário, saldo em conta bancário, rendimentos financeiros, etc.</p>
            <h3>1.2 - Poupanças</h3>
            <p>Poupanças são recursos preservados para alguma finalidade.</p>
            <p>Ao adicionar uma poupança, você deve informar: um nome para a poupança, o valor correspondente e o recurso financiador.</p>
            <p><b>Exemplo:</b> guardar dinheiro para uma viagem, para uma compra à vista, etc.</p>
            <h3>1.3 - Contas</h3>
            <p>Contas são gastos mensais recorrentes diretamente relacionados ao seu custo de vida. Seus valores tendem a seguir uma certa média.</p>
            <p>Ao adicionar uma conta, você deve informar: um nome para a conta, o valor correspondente e data de vencimento.</p>
            <p><b>Exemplos:</b> faturas de água, energia elétrica, internet, etc.</p>
            <h3>1.4 - Despesas</h3>
            <p>Despesas são gastos à parte das contas a serem pagas todos os meses. Podem ser recorrentes ou não e, quando recorrentes, seus valores podem variar.</p>
            <p>Despesas normalmente são pagas no ato, sendo esses pagamentos vinculados à recursos ou créditos disponíveis.</p>
            <p>Ao adicionar uma despesa, você deve informar: um nome para a despesa, o valor correspondente, a data do pagamento, e o recurso ou opção de crédito pagador(a). Além disso, você também deve informar a categoria da despesa adicionada. Despesas podem ter as seguintes categorias: "Casa", "Transporte", "Alimentação", "Saúde", "Lazer", "Taxas/Impostos" e "Outro".</p>
            <p><b>Exemplos:</b> jantar fora, comprar um presente, ir ao cinema, compras no supermercado.</p>
            <h3>1.5 - Parcelas</h3>
            <p>Parcelas são as partes de uma compra à prazo e usaram créditos disponíveis ao invés de recursos.</p>
            <p>Ao adicionar um parcelamento, você deve informar: um nome para o parcelamento, o valor correspondente a cada parcela, o número total de parcelas e a opção de crédito relacionada.</p>
            <h3>1.6 - Créditos</h3>
            <p>Créditos são valores à parte dos recursos disponíveis. Estão vinculados à cartões de crédito, sendo possível direcionar os créditos disponíveis para o pagamento de despesas e compras à prazo.</p>
            <p>Ao adicionar uma opção de crédito, você deve informar: um nome para a opção de crédito, o limite total correspondente e a data de vencimento.</p>
            <h3>1.7 - Relatórios e a divisão por meses</h3>
            <p>Após concluir todas as operações do mês (inclusão de recursos, de despesas, de eventuais parcelas, inclusão e pagamento de contas, etc), você deve clicar em 'Finalizar mês', opção disponível na página inicial da plataforma. Ao finalizar o mês atual, um novo relatório é gerado na aba "Relatórios", contendo uma apresentação simplificada do desempenho financeiro do mês a que ele se refere.</p>
            <p>O relatório contém as seguintes informações: "Recursos restantes", "Poupança no período", "Contas pagas", "Contas atrasadas" (contas que não foram pagas no mês), "Despesas do período", "Parcelas do período" e "Créditos restantes".</p>
            <p><b>Importante:</b> Apenas finalize o mês quando tiver concluído todas as atividades do mês atual, pois não é possivel voltar atrás mais tarde!</p>
            <br />
            <h3>2 - RELAÇÃO ENTRE ABAS</h3>
            <p>Todas as abas se relacionem entre si de formas específicas visando a praticidade de uso. Confira a seguir como as abas se relacionam umas com as outras:</p>
            <br />
            <h3>2.1 - Poupanças e Recursos</h3>
            <p>Os valores poupados registrados na aba "Poupanças" precisam sair de algum lugar, da mesma forma que você só pode poupar um recurso que possui. Por isso, só é possível cadastrar uma poupança hanvendo um recurso disponível cujo valor seja ao menos igual ao da poupança pretendida.</p>
            <p>Ao adicionar uma poupança, o valor poupado é deduzido do recurso indicado pelo usuário.</p>
            <h3>2.2 - Contas e Recursos</h3>
            <p>Ao adicionar uma conta, a mesma aparece na página inicial como um cartão contendo todas as informações indicadas pelo usuário (nome da conta, valor e data de vencimento). Você deve indicar o pagamento das contas cadastradas através desses cartões.</p>
            <p>Contudo, só é possível indicar o pagamento de uma conta hanvendo um recurso disponível cujo valor seja ao menos igual ao da conta em questão. Afinal de contas, você precisa utilizar algum recurso para pagar contas, não é mesmo?</p>
            <p>Ao indicar o pagamento de uma conta, o valor da mesma é deduzido do recurso pagante indicado pelo usuário.</p>
            <p><b>Importante:</b> Contas não pagas continuarão presentes na aba de contas do mês seguinte e pode ser necessário atualizar o seu valor para que o mesmo condiza com multas e taxas decorrentes de atrasos!</p>
            <h3>2.3 - Despesas, Recursos e Créditos</h3>
            <p>O pagamento de despesas normalmente é feito no ato. Por isso, ao adicionar uma nova despesa, você deve indicar um recurso (caso o pagamento seja à vista ou no débito) ou um opção de crédito (caso o pagamento seja no crédito) pagante. Recursos e opções de crédito só podem ser indicados como pagantes caso tenham um valor, ao menos, igual ao valor da despesa em questão.</p>
            <p>Quando um recurso é indicado como o pagador de uma despesa, o valor da despesa é deduzido do recurso indicado. O mesmo vale para opções de crédito, mas há um adendo importante: despesas relacionadas à uma opção de crédito geram uma fatura para aquela opção de crédito. Falaremos mais sobre faturas em breve.</p>
            <h3>2.4 - Parcelas e Créditos</h3>
            <p>Só é possível adicionar um novo parcelamento tendo uma opção de crédito previamente cadastrada cujo o valor do crédito disponível seja, ao menos, igual ao valor do parcelamento total (dado pelo valor da parcela multiplicado pelo número de parcelas), assim como você precisa de um cartão de crédito para comprar no crédito.</p>
            <p>Além disso, assim como nas despesas pagas com opções de crédito, os parcelamentos relacionados à uma opção de crédito são adicionados à fatura da opção de credito em questão.</p>
            <p><b>Importante:</b> O Atlas atualiza automaticamente o progresso dos seus parcelamentos no tempo e os remove automaticamente quando o parcelamento chega ao fim.</p>
            <h3>2.5 - Créditos e Faturas</h3>
            <p>Faturas de opção de crédito são contas adicionadas às contas do mês seguinte que consideram o montante de todos os gastos relacionados à uma opção de crédito (despesas e valores de parcelas). Essas faturas representam à fatura do cartão de crédito que a opção de crédito cadastrada representa.</p>
            <h3>3 - BOAS PRÁTICAS EM GESTÃO DE FINANÇAS PESSOAIS</h3>
            <p>O Atlas foi limitado em 2 aspectos importantes, justamente para viabilizar apenas boas práticas em gestão de finanças pessoais. Dessa forma, NÃO é possíve:</p>
            <h3>3.1 - Indicar o pagamento de contas com opções de crédito</h3>
            <p>Entendemos que pode ser necessário, em situações emergenciais. Ainda assim, procuramos desencorajar a prática, que pode levar à complicações financeiras ainda piores.</p>
            <h3>3.2 - Faturas de opção de crédito surgem apenas no mês seguinte</h3>
            <p>Procuramos encorajar um uso mais criterioso e planejado de opções de crédito. Por isso, as faturas de opções de crédito surgem apenas no mês seguinte, de forma que, não é possível adicionar um gasto (seja uma despesa ou parcelamento) à uma opção de crédito e pagar a fatura referente à esse gasto no mesmo mês em que o mesmo foi adicionado (como no caso de cartões de crédito cuja data de fechamento estejam no início de um um mês e não ao final).</p>
            <p>Procure se organizar de forma que seus gastos em crédito aconteçam apenas dentro do mês atual.</p>
            <br />
            <h3>4 - MAIS INFORMAÇÕES</h3>
            <p>Você sempre poderá visualizar um painel lateral (lado direito), contendo o resumo de todas as informações pertinentes ao mês em questão, incluindo o "Resultado" atual do mês. Esse resultado se refere à soma de todos os recursos, subtraindo o valor de todas as contas (em aberto - não pagas) e despesas do mês.</p>
            <p>Você pode usar <img style={{ width: '15px' }} src={Config} /> para acessar as opções de usuário, que incluem: "Recomeçar" (um reset completo da plataforma, caso você queira começar de novo com a gente, por alguma razão 🤔) e "Mais informações", que torna possível visualizar todos os pontos dessa página novamente.</p>
            <h3>5 - USO DE INFORMAÇÕES</h3>
            <p>Por fim, deixaremos bem claro que o Atlas não coleta e nem requere nenhuma informação pessoal ou bancária do usuário e nenhum dado relacionado ao dispositivo utilizado ao usar este software.</p>
        </div>
    )
}