let resources = null;
let savings = null;
let bills = null;
let expenses = null;
let installments = null;
let credits = null;
let paidBills = null;
let unpaidBills = null;
let sideCredits = null;
let nextInvoices = null;
let sideInstallments = null;
let username = null;

let globalStorage = null;

export function addData(d, location) {
    if (location === 'recursos') {
        if (!localStorage.resources) {
            resources = [];
            resources.push(d);
            return localStorage.setItem('resources', JSON.stringify(resources));
        } else {
            const data = JSON.parse(localStorage.getItem('resources'));
            data.push(d);
            return localStorage.setItem('resources', JSON.stringify(data));
        }
    } else if (location === 'poupan%C3%A7as') {
        if (!localStorage.savings) {
            savings = [];
            savings.push(d);
            return localStorage.setItem('savings', JSON.stringify(savings));
        } else {
            const data = JSON.parse(localStorage.getItem('savings'));
            data.push(d);
            return localStorage.setItem('savings', JSON.stringify(data));
        }
    } else if (location === 'contas') {
        if (!localStorage.bills) {
            bills = [];
            bills.push(d);
            return localStorage.setItem('bills', JSON.stringify(bills));
        } else {
            const data = JSON.parse(localStorage.getItem('bills'));
            data.push(d);
            return localStorage.setItem('bills', JSON.stringify(data));
        }
    } else if (location === 'despesas') {
        if (!localStorage.bills) {
            bills = [];
            bills.push(d);
            return localStorage.setItem('expenses', JSON.stringify(expenses));
        } else {
            const data = JSON.parse(localStorage.getItem('expenses'));
            data.push(d);
            return localStorage.setItem('expenses', JSON.stringify(data));
        }
    } else if (location === 'parcelas') {
        if (!localStorage.installments) {
            installments = [];
            installments.push(d);
            return localStorage.setItem('installments', JSON.stringify(installments));
        } else {
            const data = JSON.parse(localStorage.getItem('installments'));
            data.push(d);
            return localStorage.setItem('installments', JSON.stringify(data));
        }
    } else if (location === 'creditos') {
        if (!localStorage.credits) {
            credits = [];
            credits.push(d);
            return localStorage.setItem('credits', JSON.stringify(credits));
        } else {
            const data = JSON.parse(localStorage.getItem('credits'));
            data.push(d);
            return localStorage.setItem('credits', JSON.stringify(data));
        }
        // Salva o valor das contas pagas:
    } else if (location === 'paidBills') {
        if (!localStorage.paidBills) {
            paidBills = [];
            paidBills.push(d);
            return localStorage.setItem('paidBills', JSON.stringify(paidBills));
        } else {
            const data = JSON.parse(localStorage.getItem('paidBills'));
            data.push(d);
            return localStorage.setItem('paidBills', JSON.stringify(data));
        }
    } else if (location === 'unpaidBills') {
        if (!localStorage.unpaidBills) {
            unpaidBills = [];
            unpaidBills.push(d);
            return localStorage.setItem('unpaidBills', JSON.stringify(unpaidBills));
        } else {
            const data = JSON.parse(localStorage.getItem('unpaidBills'));
            data.push(d);
            return localStorage.setItem('unpaidBills', JSON.stringify(data));
        }
    } else if (location === 'sideCredits') {
        if (!localStorage.sideCredits) {
            sideCredits = [];
            sideCredits.push(d);
            return localStorage.setItem('sideCredits', JSON.stringify(sideCredits));
        } else {
            const data = JSON.parse(localStorage.getItem('sideCredits'));
            data.push(d);
            return localStorage.setItem('sideCredits', JSON.stringify(data));
        }
    } else if (location === 'nextInvoices') {
        if (!localStorage.nextInvoices) {
            nextInvoices = [];
            nextInvoices.push(d);
            return localStorage.setItem('nextInvoices', JSON.stringify(nextInvoices));
        } else {
            const data = JSON.parse(localStorage.getItem('nextInvoices'));
            data.push(d);
            return localStorage.setItem('nextInvoices', JSON.stringify(data));
        }
    } else if (location === 'sideInstallments') {
        if (!localStorage.sideInstallments) {
            sideInstallments = [];
            sideInstallments.push(d);
            return localStorage.setItem('sideInstallments', JSON.stringify(sideInstallments));
        } else {
            const data = JSON.parse(localStorage.getItem('sideInstallments'));
            data.push(d);
            return localStorage.setItem('sideInstallments', JSON.stringify(data));
        }
    } else if (location === 'username') {
        if (!localStorage.username) {
            username = [];
            username.push(d);
            return localStorage.setItem('username', JSON.stringify(username));
        } else {
            const data = JSON.parse(localStorage.getItem('username'));
            data.push(d);
            return localStorage.setItem('username', JSON.stringify(data));
        }
    }
}

export function loadData(location) {
    if (location === 'resources') {
        if (!localStorage.resources) {
            resources = [];
            localStorage.setItem(location, JSON.stringify(resources));
            const data = JSON.parse(localStorage.getItem(location));
            return data;
        } else {
            const data = JSON.parse(localStorage.getItem(location));
            return data;
        }
    } else if (location === 'savings') {
        if (!localStorage.savings) {
            savings = [];
            localStorage.setItem(location, JSON.stringify(savings));
            const data = JSON.parse(localStorage.getItem(location));
            return data;
        } else {
            const data = JSON.parse(localStorage.getItem(location));
            return data;
        }
    } else if (location === 'bills') {
        if (!localStorage.bills) {
            bills = [];
            localStorage.setItem(location, JSON.stringify(bills));
            const data = JSON.parse(localStorage.getItem(location));
            return data;
        } else {
            const data = JSON.parse(localStorage.getItem(location));
            return data;
        }
    } else if (location === 'expenses') {
        if (!localStorage.expenses) {
            expenses = [];
            localStorage.setItem(location, JSON.stringify(expenses));
            const data = JSON.parse(localStorage.getItem(location));
            return data;
        } else {
            const data = JSON.parse(localStorage.getItem(location));
            return data;
        }
    } else if (location === 'installments') {
        if (!localStorage.installments) {
            installments = [];
            localStorage.setItem(location, JSON.stringify(installments));
            const data = JSON.parse(localStorage.getItem(location));
            return data;
        } else {
            const data = JSON.parse(localStorage.getItem(location));
            return data;
        }
    } else if (location === 'credits') {
        if (!localStorage.credits) {
            credits = [];
            localStorage.setItem(location, JSON.stringify(credits));
            const data = JSON.parse(localStorage.getItem(location));
            return data;
        } else {
            const data = JSON.parse(localStorage.getItem(location));
            return data;
        }
    } else if (location === 'paidBills') {
        if (!localStorage.paidBills) {
            paidBills = [];
            localStorage.setItem(location, JSON.stringify(paidBills));
            const data = JSON.parse(localStorage.getItem(location));
            return data;
        } else {
            const data = JSON.parse(localStorage.getItem(location));
            return data;
        }
    } else if (location === 'unpaidBills') {
        if (!localStorage.unpaidBills) {
            unpaidBills = [];
            localStorage.setItem(location, JSON.stringify(unpaidBills));
            const data = JSON.parse(localStorage.getItem(location));
            return data;
        } else {
            const data = JSON.parse(localStorage.getItem(location));
            return data;
        }
    } else if (location === 'sideCredits') {
        if (!localStorage.sideCredits) {
            sideCredits = [];
            localStorage.setItem(location, JSON.stringify(sideCredits));
            const data = JSON.parse(localStorage.getItem(location));
            return data;
        } else {
            const data = JSON.parse(localStorage.getItem(location));
            return data;
        }
    } else if (location === 'nextInvoices') {
        if (!localStorage.nextInvoices) {
            nextInvoices = [];
            localStorage.setItem(location, JSON.stringify(nextInvoices));
            const data = JSON.parse(localStorage.getItem(location));
            return data;
        } else {
            const data = JSON.parse(localStorage.getItem(location));
            return data;
        }
    } else if (location === 'sideInstallments') {
        if (!localStorage.sideInstallments) {
            sideInstallments = [];
            localStorage.setItem(location, JSON.stringify(sideInstallments));
            const data = JSON.parse(localStorage.getItem(location));
            return data;
        } else {
            const data = JSON.parse(localStorage.getItem(location));
            return data;
        }
    } else if (location === 'username') {
        if (!localStorage.username) {
            username = [];
            localStorage.setItem(location, JSON.stringify(username));
            const data = JSON.parse(localStorage.getItem(location));
            return data;
        } else {
            const data = JSON.parse(localStorage.getItem(location));
            return data;
        }
    }
}

export function getData(id, location) {
    const data = loadData(location);
    const filteredData = data.filter(e => e.id === id);
    const filteredData2 = { ...filteredData[0] }
    return filteredData2;
}

export function updateData(id, formData, location) {
    const data = loadData(location);
    const filteredData = data.filter(e => e.id !== id);
    return localStorage.setItem(location, JSON.stringify([...filteredData, formData]));
}

export function deleteData(id, location) {
    const data = loadData(location);
    const filteredData = data.filter(e => e.id !== id);
    return localStorage.setItem(location, JSON.stringify(filteredData));
}

export function totalData(data) {
    const mappedTotalSavings = data[0] !== undefined ? data.map(e => Number(e.value)) : data = [0, 0];
    const reducedTotalSavings = mappedTotalSavings.reduce(function (a, b) {
        return a + b;
    })
    return reducedTotalSavings;
}

export function saveInfo(info) {
    localStorage.setItem('info', JSON.stringify(info));
}

export function localStorageClear() {
    // localStorage.removeItem('resources');
    // localStorage.removeItem('savings');
    localStorage.removeItem('bills');
    localStorage.removeItem('expenses');
    localStorage.removeItem('installments');
    localStorage.removeItem('credits');
    localStorage.removeItem('paidbills');
}

export function loadGlobalSave() {
    if (typeof (localStorage.globalStorage) === 'string') {
        const data = JSON.parse(localStorage.globalStorage);
        return data;
    }
}

export function globalSave() {
    if (localStorage.globalStorage === undefined) {
        globalStorage = [];
        const main = {
            info: JSON.parse(localStorage.getItem('info')),
            Recursos: totalData(loadData('resources')),
            Poupanças: totalData(loadData('savings')),
            ContasNP: totalData(loadData('bills')),
            ContasPG: totalData(loadData('paidBills')),
            Despesas: totalData(loadData('expenses')),
            Parcelas: totalData(loadData('installments')),
            Créditos: totalData(loadData('credits'))
        };
        globalStorage.push(main);
        return localStorage.setItem('globalStorage', JSON.stringify(globalStorage));
    } else {
        const data = JSON.parse(localStorage.getItem('globalStorage'));
        const main = {
            info: JSON.parse(localStorage.getItem('info')),
            Recursos: totalData(loadData('resources')),
            Poupanças: totalData(loadData('savings')),
            ContasNP: totalData(loadData('bills')),
            ContasPG: totalData(loadData('paidBills')),
            Despesas: totalData(loadData('expenses')),
            Parcelas: totalData(loadData('installments')),
            Créditos: totalData(loadData('credits'))
        };
        data.push(main);
        return localStorage.setItem('globalStorage', JSON.stringify(data));
    }
}