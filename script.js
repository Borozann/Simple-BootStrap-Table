import Item from "./models/Item.js";

const adicionaDados = function () {
  const descInput = document.getElementById("desc");
  const qtdInput = document.getElementById("qtd");
  const valorInput = document.getElementById("valor");

  if (!(descInput.value && qtdInput.value && valorInput.value)) {
    alert("Preencha todos os campos!");
    return;
  }

  const item = Item.transformDataToItem(
    descInput.value,
    parseInt(qtdInput.value),
    Number(valorInput.value),
  );

  listaCompras.push(item);

  salvarNoStorage();
  limparInput();
  carregarTabela();
};

const carregarTabela = function () {
  const tabela = document.getElementById("table-body");

  tabela.innerHTML = "";
  let valorTotalGeral = 0;

  if (listaCompras.length == 0) {
    tabela.innerHTML =
      '<tr><td colspan="5" class="text-center empty-msg">Nenhum item na lista</td></tr>';
    return;
  }

  listaCompras.forEach((item, index) => {
    valorTotalGeral += item.subtotal;

    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td class="fw-bold">${item.descricao}</td>
        <td class="text-center">${item.quantidade}</td>
        <td>R$ ${item.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
        <td>R$ ${item.subtotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
        <td class="text-center">
        <button onclick="removerItem(${index})" class="btn btn-outline-danger btn-sm">
        <i class="fas fa-times"></i>
        </button>
        </td>
            `;
    tabela.appendChild(tr);
  });

  document.getElementById("total-geral").innerHTML =
    `Total: <span class="text-success">R$ ${valorTotalGeral.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>`;
};

const salvarNoStorage = function () {
  try {
    localStorage.setItem("itens_compra", JSON.stringify(listaCompras));
  } catch (error) {
    console.error("Erro ao salvar no localStorage:", error);
  }
};

const limparInput = function () {
  document.getElementById("desc").value = "";
  document.getElementById("qtd").value = "";
  document.getElementById("valor").value = "";
};

const removerItem = function (index) {
  listaCompras.splice(index, 1);
  salvarNoStorage();
  carregarTabela();
};

const deletaLista = function () {
  if (confirm("Tem certeza que deseja apagar toda a lista?")) {
    listaCompras = [];
    localStorage.removeItem("itens_compra");

    document.getElementById("total-geral").innerHTML =
      `Total: <span class="text-success">R$ ${(0.0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>`;

    carregarTabela();
  }
};

const buscarLocalStorage = function () {
  try {
    return JSON.parse(localStorage.getItem("itens_compra")) || [];
  } catch (error) {
    console.error("Erro ao buscar no localStorage:", error);
    return [];
  }
};

let listaLocal = buscarLocalStorage();
let listaCompras = listaLocal.map((r) => Item.transformDataToItem(r));

window.adicionaDados = adicionaDados;
window.limparInput = limparInput;
window.deletaLista = deletaLista;
window.removerItem = removerItem;

carregarTabela();
