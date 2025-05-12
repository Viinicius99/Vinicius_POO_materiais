const estoque = {
  "Lápis": 5,
  "Caderno": 3,
  "Caneta": 2,
  "Borracha": 1,
  "Apontador": 4,
  "Régua": 3,
  "Cola": 2,
  "Tesoura": 2,
  "Marcador": 3,
  "Papel A4": 10
};

const materialSelect = document.getElementById("material");
const listaEstoque = document.getElementById("listaEstoque");
const requisicoes = document.getElementById("requisicoes");

// Atualiza o select de materiais
function atualizarSelect() {
  materialSelect.innerHTML = "";

  for (const item in estoque) {
    const option = document.createElement("option");
    const qtd = estoque[item];
    option.value = item;
    option.textContent = `${item} (${qtd})`;
    if (qtd <= 0) {
      option.disabled = true;
      option.classList.add("riscado");
    }
    materialSelect.appendChild(option);
  }
}

// Atualiza a lista de estoque na interface
function atualizarEstoqueUI() {
  listaEstoque.innerHTML = "";

  for (const item in estoque) {
    const li = document.createElement("li");
    li.textContent = `${item}: ${estoque[item]} unidades`;

    if (estoque[item] <= 0) {
      li.classList.add("riscado");
      const btn = document.createElement("button");
      btn.textContent = "Repor";
      btn.className = "btn";
      btn.style.marginTop = "5px";
      btn.onclick = () => {
        const novaQtd = parseInt(prompt(`Adicionar quantas unidades de ${item}?`));
        if (!isNaN(novaQtd) && novaQtd > 0) {
          estoque[item] += novaQtd;
          atualizarEstoqueUI();
          atualizarSelect();
        }
      };
      li.appendChild(document.createElement("br"));
      li.appendChild(btn);
    }

    listaEstoque.appendChild(li);
  }
}

// Enviar requisição
document.getElementById("requisicaoForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const nome = document.getElementById("nome").value.trim();
  const destino = document.getElementById("destino").value.trim();
  const material = materialSelect.value;
  const quantidade = parseInt(document.getElementById("quantidade").value);

  if (!nome || !destino || !material || isNaN(quantidade) || quantidade < 1) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  if (estoque[material] < quantidade) {
    alert("Estoque insuficiente.");
    return;
  }

  estoque[material] -= quantidade;

  const agora = new Date();
  const horario = agora.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

  const li = document.createElement("li");
  li.textContent = `${nome} solicitou ${quantidade}x ${material} para ${destino} às ${horario}`;
  requisicoes.prepend(li);

  this.reset();
  atualizarEstoqueUI();
  atualizarSelect();
});

// Alternar abas
function mostrarAba(aba) {
  document.getElementById("aba-requisicao").style.display = aba === "requisicao" ? "block" : "none";
  document.getElementById("aba-estoque").style.display = aba === "estoque" ? "block" : "none";

  const links = document.querySelectorAll(".sidebar nav a");
  links.forEach(link => link.classList.remove("active"));
  links.forEach(link => {
    if (link.textContent.toLowerCase().includes(aba)) {
      link.classList.add("active");
    }
  });
}

// Modo claro/escuro
const modoToggle = document.getElementById("modoToggle");
modoToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  modoToggle.textContent = document.body.classList.contains("dark") ? "🌞" : "🌙";
});

// Inicialização
atualizarSelect();
atualizarEstoqueUI();
