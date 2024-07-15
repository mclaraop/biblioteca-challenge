import { getProdutos } from './api.js';

export async function listarProdutos() {
    const listaProdutos = document.querySelector(".lista-produtos");
    const mensagemVazia = document.querySelector(".mensagem-vazia");

    try {
        const produtos = await getProdutos();
        console.log('Produtos recebidos:', produtos);

        if (produtos.length === 0) {
            mensagemVazia.style.display = "block";
        } else {
            mensagemVazia.style.display = "none";
            produtos.forEach(produto => {
                const li = document.createElement("li");
                li.classList.add("card");
                li.innerHTML = `
                    <img src="${produto.imagem}" alt="Imagem do produto" class="produto-imagem">
                    <div class="card-container--info">
                        <p>${produto.nome}</p>
                        <div class="card-container--value">
                            <p>Preço: R$ ${produto.preco}</p>
                            <img src="./imagens/delete-icon.png" alt="Ícone de exclusão" class="delete-button" onclick="deleteProduct(${produto.id})">
                        </div>
                    </div>
                `;
                listaProdutos.appendChild(li);
            });
        }
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        mensagemVazia.style.display = "block";
    }
}
