function loadCartItems() {
  var carrinho = JSON.parse(localStorage.getItem("cart")) || [];
  var listaCarrinho = document.getElementById("cart-items-list");
  var total = document.getElementById("subtotal");
  var checkoutButton = document.getElementById("checkout");

  listaCarrinho.innerHTML = "";

  if (carrinho.length === 0) {
    listaCarrinho.innerHTML = "<li>Carrinho vazio</li>";
    total.textContent = "0,00";
    checkoutButton.disabled = true;
  } else {
    carrinho.forEach(function (item) {
      var itemExistente = listaCarrinho.querySelector(
        `li[data-item-id="${item.id}"]`
      );
      if (itemExistente) {
        var quantidadeItem = itemExistente.querySelector(".item-quantity");
        var quantity =
          parseInt(quantidadeItem.getAttribute("data-quantity")) + 1;
        quantidadeItem.setAttribute("data-quantity", quantity);
        quantidadeItem.textContent = quantity;
      } else {
        var li = document.createElement("li");
        li.setAttribute("data-item-id", item.id);
        li.setAttribute("data-quantity", 1);

        const itemDoCarrinho = document.createElement("div");
        itemDoCarrinho.classList.add(
          "flex",
          "justify-between",
          "items-center",
          "w-full",
          "p-4",
          "bg-white",
          "shadow-md"
        );

        const imgItem = document.createElement("img");
        imgItem.src = item.imagem_url;
        imgItem.classList.add("h-16", "w-16", "object-cover");
        itemDoCarrinho.appendChild(imgItem);

        const nomeItem = document.createElement("span");
        nomeItem.classList.add("text-lg", "font-bold", "word-break", "w-1/3");
        nomeItem.textContent = item.nome;
        itemDoCarrinho.appendChild(nomeItem);

        const precoItem = document.createElement("span");
        precoItem.textContent = "R$" + item.preco.toFixed(2);
        itemDoCarrinho.appendChild(precoItem);

        const quantidadeItem = document.createElement("span");
        quantidadeItem.textContent = "1";
        quantidadeItem.classList.add("item-quantity");
        quantidadeItem.setAttribute("data-quantity", 1);
        itemDoCarrinho.appendChild(quantidadeItem);

        const removerItem = document.createElement("button");
        removerItem.textContent = "Remover";
        removerItem.classList.add("text-red-500", "font-bold");
        removerItem.addEventListener("click", function () {
          var carrinho = JSON.parse(localStorage.getItem("cart")) || [];
          var itemIndex = carrinho.findIndex((i) => i.id === item.id);
          carrinho.splice(itemIndex, 1);
          localStorage.setItem("cart", JSON.stringify(carrinho));
          loadCartItems();
        });

        itemDoCarrinho.appendChild(removerItem);

        li.appendChild(itemDoCarrinho);
        listaCarrinho.appendChild(li);
      }
    });
    var total = carrinho.reduce((acc, item) => acc + item.preco, 0);
    const totalElement = document.querySelector("#subtotal span");
    if (totalElement) {
      totalElement.innerHTML = "R$" + total.toFixed(2);
    } else {
      const totalElement = document.createElement("span");
      totalElement.innerHTML = "R$" + total.toFixed(2);
      document.querySelector("#subtotal").appendChild(totalElement);
    }

    if (checkoutButton) {
      checkoutButton.addEventListener("click", function () {
        const confirmBuy = confirm("Deseja confirmar a compra?");
        if (!confirmBuy) return;
        alert("Compra realizada com sucesso!");
        localStorage.removeItem("cart");
        loadCartItems();
      });
    }
  }
}

document.addEventListener("DOMContentLoaded", (event) => {
  loadCartItems();
});
