import { addToCart } from "./utils.js";

fetch("http://localhost:8080/produtos")
  .then((response) => response.json())
  .then((data) => {
    // Define um Objeto
    const produtosPorCategoria = {};
    data.forEach((produto) => {
      if (!produtosPorCategoria[produto.categoria]) {
        produtosPorCategoria[produto.categoria] = [];
      }
      //push -> para manipular um array
      produtosPorCategoria[produto.categoria].push(produto);
    });

    for (const categoria in produtosPorCategoria) {
      const produtos = produtosPorCategoria[categoria];
      const categoriaSection = document.createElement("section");
      categoriaSection.classList.add(
        "flex",
        "flex-col",
        "items-center",
        "mb-4",
        "scroll-mt-40",
        "py-4",
        "shadow-md"
      );
      categoriaSection.id = categoria;
      const heading = document.createElement("h2");
      heading.classList.add("text-2xl", "font-bold", "mb-4", "text-[#009933]");
      heading.textContent = categoria;
      categoriaSection.appendChild(heading);

      const listaProdutos = document.createElement("div");
      listaProdutos.classList.add(
        "flex",
        "items-center",
        "gap-10",
        "overflow-x-hidden",
        "scroll-smooth",
        "w-full",
        "relative"
      );

      produtos.forEach((produto) => {
        const divProduto = document.createElement("div");
        divProduto.classList.add(
          "flex",
          "flex-col",
          "items-center",
          "min-w-[200px]",
          "max-w-[200px]",
          "rounded-lg",
          "p-4",
          "border",
          "border-white",
          "hover:border",
          "hover:border-[#009933]",
          "overflow-hidden",
          "gap-2"
        );

        const img = document.createElement("img");
        img.src = produto.imagem_url;
        img.classList.add("h-40", "object-cover");
        divProduto.appendChild(img);

        const nomeProduto = document.createElement("h3");
        nomeProduto.textContent = produto.nome;
        nomeProduto.classList.add(
          "font-bold",
          "text-center",
          "overflow-hidden",
          "whitespace-nowrap",
          "text-overflow-ellipsis",
          "w-full"
        );
        divProduto.appendChild(nomeProduto);

        const precoProduto = document.createElement("span");
        precoProduto.textContent = `R$ ${produto.preco}`;
        divProduto.appendChild(precoProduto);

        const btnAdicionar = document.createElement("button");
        btnAdicionar.textContent = "Adicionar";
        btnAdicionar.classList.add(
          "p-2",
          "bg-[#009933]",
          "rounded-lg",
          "w-full"
        );

        btnAdicionar.addEventListener("click", function () {
          addToCart(produto);
          alert("Produto: " + produto.nome + ", adicionado ao carrinho!");
        });

        img.addEventListener("click", () => {
          /// Redirecionanamento
          window.location.href = `produto.html?id=${produto.id}`;
        });

        divProduto.appendChild(btnAdicionar);
        listaProdutos.appendChild(divProduto);
      });

      const divIntermediaria = document.createElement("div");
      divIntermediaria.classList.add(
        "w-full",
        "flex",
        "relative",
        "items-center"
      );

      divIntermediaria.appendChild(listaProdutos);

      const scrollLeft = document.createElement("button");
      scrollLeft.textContent = "⬅";
      scrollLeft.classList.add(
        "bg-[#009933]",
        "rounded-full",
        "text-white",
        "font-bold",
        "absolute",
        "left-0",
        "h-10",
        "w-10",
        "z-10",
        "flex",
        "items-center",
        "justify-center",
        "opacity-50",
        "hover:opacity-100"
      );
      scrollLeft.addEventListener("click", () => {
        const width = listaProdutos.clientWidth;
        listaProdutos.scrollBy({
          left: -width,
          behavior: "smooth",
        });
      });

      const scrollRight = document.createElement("button");
      scrollRight.textContent = "➡";
      scrollRight.classList.add(
        "bg-[#009933]",
        "rounded-full",
        "text-white",
        "font-bold",
        "absolute",
        "right-0",
        "h-10",
        "w-10",
        "z-10",
        "flex",
        "items-center",
        "justify-center",
        "opacity-50",
        "hover:opacity-100"
      );

      scrollRight.addEventListener("click", () => {
        const width = listaProdutos.clientWidth;
        listaProdutos.scrollBy({
          left: width,
          behavior: "smooth",
        });
      });

      divIntermediaria.appendChild(scrollLeft);
      divIntermediaria.appendChild(scrollRight);
      categoriaSection.appendChild(divIntermediaria);

      const productListSection = document.querySelector("#product-list");
      productListSection.appendChild(categoriaSection);
    }
  })
  .catch((error) => {
    console.error("Erro ao buscar produtos:", error);
  });
