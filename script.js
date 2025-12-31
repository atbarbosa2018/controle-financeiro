const form = document.getElementById("form-lancamento");
const lista = document.getElementById("lista-lancamentos");

const campoReceitas = document.getElementById("total-receitas");
const campoGastos = document.getElementById("total-gastos");
const campoSaldo = document.getElementById("saldo");

let lancamentos = JSON.parse(localStorage.getItem("lancamentos")) || [];

function atualizarDashboard() {
    let totalReceitas = 0;
    let totalGastos = 0;

    lista.innerHTML = "";

    lancamentos.forEach(item => {
        const li = document.createElement("li");
        li.classList.add(item.tipo);

        li.innerHTML = `
            <span>${item.descricao}</span>
            <strong>R$ ${item.valor.toFixed(2)}</strong>
        `;

        lista.appendChild(li);

        if (item.tipo === "receita") {
            totalReceitas += item.valor;
        } else {
            totalGastos += item.valor;
        }
    });

    campoReceitas.innerText = `R$ ${totalReceitas.toFixed(2)}`;
    campoGastos.innerText = `R$ ${totalGastos.toFixed(2)}`;
    campoSaldo.innerText = `R$ ${(totalReceitas - totalGastos).toFixed(2)}`;
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const tipo = document.getElementById("tipo").value;
    const descricao = document.getElementById("descricao").value;
    const valor = parseFloat(document.getElementById("valor").value);

    lancamentos.push({ tipo, descricao, valor });

    localStorage.setItem("lancamentos", JSON.stringify(lancamentos));

    atualizarDashboard();
    form.reset();
});

// carrega dados ao abrir o app
atualizarDashboard();

const botaoLimpar = document.getElementById("limpar-dados");

botaoLimpar.addEventListener("click", function() {
    if (confirm("Tem certeza que deseja apagar todos os dados?")) {
        localStorage.removeItem("lancamentos");
        lancamentos = [];
        atualizarDashboard();
    }
});
