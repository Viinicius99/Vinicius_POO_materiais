function showSection(id) {
  document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

let materiais = [];
let historico = [];

document.getElementById("formMaterial").addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nomeMaterial").value;
  const tipo = document.getElementById("tipoMaterial").value;
  const quantidade = document.getElementById("quantidadeMaterial").value;

  if (!nome || !tipo || !quantidade) return;

  const material = { nome, tipo, quantidade };
  materiais.push(material);

  atualizarTabelaMateriais();
  atualizarSelectMateriais();
  this.reset();
  alert("Material cadastrado com sucesso!");
});

function atualizarTabelaMateriais() {
  const tbody = document.getElementById("tabelaMateriais");
  tbody.innerHTML = "";

  materiais.forEach(m => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${m.nome}</td>
      <td>${m.tipo}</td>
      <td>${m.quantidade}</td>
    `;
    tbody.appendChild(tr);
  });
}

function atualizarSelectMateriais() {
  const select = document.getElementById("selectMaterial");
  select.innerHTML = "";
  materiais.forEach((m, i) => {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = `${m.nome} (${m.tipo})`;
    select.appendChild(opt);
  });
}

document.getElementById("formSolicitacao").addEventListener("submit", function (e) {
  e.preventDefault();

  const index = document.getElementById("selectMaterial").value;
  const data = document.getElementById("dataSolicitacao").value;
  const quantidade = document.getElementById("quantidadeSolicitada").value;
  const observacoes = document.getElementById("obsSolicitacao").value;

  if (index === "" || !data) return;

  const material = materiais[index];
  const registro = {
    nome: material.nome,
    tipo: material.tipo,
    data,
    quantidade: quantidade || material.quantidade,
    obs: observacoes
  };

  historico.push(registro);
  atualizarHistorico();
  this.reset();
  alert("Solicitação registrada com sucesso!");
});

function atualizarHistorico() {
  const tbody = document.getElementById("tabelaHistorico");
  tbody.innerHTML = "";

  historico.forEach(h => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${h.nome} (${h.tipo})</td>
      <td>${h.data}</td>
      <td>${h.quantidade}</td>
      <td>${h.obs}</td>
    `;
    tbody.appendChild(tr);
  });
}
