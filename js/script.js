import { getProdutos, deleteProduct, addProduct } from './api.js';

document.addEventListener("DOMContentLoaded", async () => {
    const listaProdutos = document.querySelector(".lista-produtos");
    const mensagemVazia = document.querySelector(".mensagem-vazia");
    const produtoForm = document.getElementById("produto-form");

    const produtos = await getProdutos();
    if (produtos.length === 0) {
        mensagemVazia.style.display = "block";
    } else {
        mensagemVazia.style.display = "none";
        produtos.forEach(produto => renderProduct(produto));
    }

    produtoForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const nomeProduto = document.getElementById("nome-produto").value;
        const precoProduto = document.getElementById("preco-produto").value;
        const imagemProduto = document.getElementById("imagem-produto").value;

        if (!isValidUrl(imagemProduto)) {
            alert("Por favor, insira uma URL válida para a imagem do produto.");
            return;
        }

        const novoProduto = {
            nome: nomeProduto,
            preco: precoProduto,
            imagem: imagemProduto
        };

        const produtoAdicionado = await addProduct(novoProduto);
        if (produtoAdicionado) {
            renderProduct(produtoAdicionado);
            mensagemVazia.style.display = "none";
        } else {
            alert("Erro ao adicionar produto");
        }

        produtoForm.reset();
    });

    listaProdutos.addEventListener("click", async function(event) {
        if (event.target.classList.contains("delete-button")) {
            const produtoId = event.target.dataset.id;
            await deleteProduct(produtoId);
            event.target.closest(".card").remove();
            if (listaProdutos.children.length === 0) {
                mensagemVazia.style.display = "block";
            }
        }
    });
});

function renderProduct(produto) {
    const listaProdutos = document.querySelector(".lista-produtos");
    const novoProduto = document.createElement("li");
    novoProduto.classList.add("card");

    novoProduto.innerHTML = `
        <img src="${produto.imagem}" alt="Imagem do produto" class="produto-imagem">
        <div class="card-container--info">
            <p>${produto.nome}</p>
            <div class="card-container--value">
                <p>Preço: R$ ${produto.preco}</p>
                <img src="./imagens/delete-icon.png" alt="Ícone de exclusão" class="delete-button" data-id="${produto.id}">
            </div>
        </div>
    `;

    listaProdutos.appendChild(novoProduto);
}

function isValidUrl(string) {
    try {
        new URL(string);
        console.log("Validando URL:", string);
        return true;
    } catch (_) {
        console.log("Deu errado:", string);
        return false;
    }
}
