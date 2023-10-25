export const recursos = {
    title: 'Recursos',
    textAdd: 'Nomeie o recurso a ser adicionado e insira um valor correspondente.',
    textEdit: 'Altere o nome dado a um recurso e/ou seu valor correspondente ou o remova por completo.',
    infoMessage:
        <>
            <p>Recursos são todos os valores disponíveis no momento e que podem ser direcionado para qualquer fim.</p>
            <p><b>Exemplos:</b> salário, saldo em conta bancário, rendimentos financeiros, etc.</p>
        </>,
    present: 'Confira os recursos disponíveis.',
    absent: 'Você não possui recursos registrados. Clique em + para adicionar um novo recurso ou em i para mais informações.'
}

export const poupanças = {
    title: 'Poupanças',
    textAdd: 'Nomeie a poupança a ser adicionada, insira um valor correspondente e indique o recurso financiador.',
    textEdit: 'Altere o nome dado a uma poupança e/ou seu valor correspondente ou a remova por completo.',
    infoMessage:
        <>
            <p>Poupanças são recursos preservados para alguma finalidade.</p>
            <p><b>Exemplo:</b> guardar dinheiro para uma viagem, para uma compra à vista, etc.</p>
        </>,
    present: 'Confira as poupanças atuais.',
    absent: 'Você não possui poupanças registradas. Clique em + para adicionar uma nova poupança ou em i para mais informações.'
}

// editado!
export const contas = {
    title: 'Contas',
    textAdd: 'Nomeie uma conta a ser adicionada, insira o valor correspondente e identifique o prazo de vencimento.',
    textEdit: 'Você pode alterar o nome dado a uma conta, seu valor correspondente, sua data de vencimento ou a remover completamente.',
    infoMessage:
        <>
            <p>Contas são gastos mensais recorrentes diretamente relacionados ao seu custo de vida. Seus valores tendem a seguir uma certa média.</p>
            <p><b>Exemplos:</b> faturas de água, energia elétrica, internet, etc.</p>
        </>,
    present: 'Confira as contas atuais.',
    absent: 'Você não possui contas registradas. Clique em + para adicionar uma nova conta ou em i para mais informações.'
}

export const despesas = {
    title: 'Despesas',
    textAdd: 'Nomeie a despesa a ser adicionada, insira o valor correspondente, indicando sua categoria, data e forma de pagamento.',
    textEdit: 'Você pode alterar  o nome dado a uma despesa, seu valor correspondente, sua categoria, data e forma de pagamento ou a remova por completo.',
    infoMessage:
        <>
            <p>Despesas são gastos à parte das contas a serem pagas todos os meses. Podem ser recorrentes ou não e, quando recorrentes, seus valores podem variar.</p>
            <p>Despesas normalmente são pagas no ato, sendo esses pagamentos vinculados à recursos ou créditos disponíveis.</p>
            <p><b>Exemplos:</b> jantar fora, comprar um presente, ir ao cinema, compras no supermercado, etc.</p>
        </>,
    present: 'Confira as despesas atuais.',
    absent: 'Você não possui despesas registradas. Clique em + para adicionar uma nova despesa ou em i para mais informações.'
}

export const parcelas = {
    title: 'Parcelas',
    textAdd: 'Nomeie a parcela a ser adicionada, insira o valor da parcela, a quantidade total de parcelas e a opção de crédito pagadora.',
    textEdit: 'Você pode alterar o nome dado a uma parcela, seu valor correspondente, a opção d ecrédito pagadora ou a remova por completo.',
    infoMessage:
        <>
            <p>Parcelas são as partes de uma compra à prazo e usaram créditos disponíveis ao invés de recursos.</p>
        </>,
    present: 'Confira as parcelas atuais.',
    absent: 'Você não possui parcelamentos registradas. Clique em + para adicionar uma nova parcela ou em i para mais informações.'
}

export const creditos = {
    title: 'Créditos',
    textAdd: 'Nomeie a opção de crédito a ser adicionada, insira o limite total de crédito e o dia em que a fatura vence.',
    textEdit: 'Você pode alterar o nome dado a uma opção de crédito, o seu limite total, seu dia de vencimento ou a remova por completo.',
    infoMessage:
        <>
            <p>Créditos são valores à parte dos recursos disponíveis. Estão vinculados à cartões de crédito, sendo possível direcionar os créditos disponíveis para o pagamento de despesas e compras à prazo.</p>
        </>,
    present: 'Confira os créditos atuais.',
    absent: 'Você não possui opções de crédito registradas. Clique em + para adicionar uma nova opção crédito ou em i para mais informações.'
}

export const relatorio = {
    title: 'Relatórios',
    present: 'Confira o desempenho financeiro dos meses passados.',
    absent: 'Você ainda não finalizou um mês. Assim que um mês for finalizado, o relatório do mesmo estará disponível aqui.'
}