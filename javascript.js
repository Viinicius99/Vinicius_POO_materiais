document.getElementById('requisicaoForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const turma = document.getElementById('turma').value.trim();
  const material = document.getElementById('material').value;

  if (!nome || !turma || !material) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  const mensagem = `
    Requisição enviada com sucesso!
    Nome: ${nome}
    Turma: ${turma}
    Material: ${material}
  `;

  document.getElementById('mensagem').innerText = mensagem;
  document.getElementById('requisicaoForm').reset();
});
