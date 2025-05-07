document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formRequisicao');
    const lista = document.getElementById('lista');


    function salvarRequisicoes(requisicoes) {
        localStorage.setItem('requisicoes', JSON.stringify(requisicoes));
    }


    function carregarRequisicoes() {
        const requisicoes = JSON.parse(localStorage.getItem('requisicoes')) || [];
        lista.innerHTML = '';
        requisicoes.forEach((req, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${req.nome}</strong> solicitou ${req.quantidade} de ${req.material}.
                <button onclick="removerRequisicao(${index})">Remover</button>
            `;
            lista.appendChild(li);
        });
    }

    window.removerRequisicao = (index) => {
        const requisicoes = JSON.parse(localStorage.getItem('requisicoes')) || [];
        requisicoes.splice(index, 1);
        salvarRequisicoes(requisicoes);
        carregarRequisicoes();
    };


    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nome = document.getElementById('nome').value;
        const material = document.getElementById('material').value;
        const quantidade = document.getElementById('quantidade').value;

        if (nome && material && quantidade) {
            const requisicoes = JSON.parse(localStorage.getItem('requisicoes')) || [];
            requisicoes.push({ nome, material, quantidade });
            salvarRequisicoes(requisicoes);
            carregarRequisicoes();
            form.reset();
        }
    });

    carregarRequisicoes();
});
