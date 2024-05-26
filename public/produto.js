import { addToCart, updateCartItemCount } from "./utils.js";

fetch("http://localhost:8080/produtos")
  .then((response) => response.json())
  .then((data) => {
    const products = data;
    function getProductDetails(productId) {
      const product = products.find((item) => item.id === productId);
      if (product) {
        document.getElementById("produto-categoria").innerText =
          product.categoria;
        document.getElementById("product-name").innerText = product.nome;
        document.getElementById("product-description").innerText =
          product.descricao;
        document.getElementById("produto-preco").innerText =
          "R$" + product.preco.toFixed(2);
        document.getElementById("product-image").src = product.imagem_url;

        const addToCartButton = document.getElementById("add-to-cart");
        if (addToCartButton) {
          addToCartButton.addEventListener("click", function () {
            addToCart(product);
            ///Alert
            alert("Produto: " + product.nome + ", adicionado ao carrinho!");
          });
        }
      } else {
        document.getElementById("product-name").innerText =
          "Produto não encontrado";
      }
    }

    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get("id"));
    if (!isNaN(productId)) {
      getProductDetails(productId);
    } else {
      console.error("ID do produto inválido");
    }
  })
  .catch((error) => {
    console.error("Erro ao buscar os produtos:", error);
  });

document.addEventListener("DOMContentLoaded", (event) => {
  updateCartItemCount();
});
