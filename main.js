$(document).ready(function() {

    // exibir informações do produto
    $(".lista-produto #btn-info").click(function() {
        const ulEspec = $(this).closest("li").find("ul");
        ulEspec.slideToggle(500);
    });

    // Carrinho
    const carrinhoLista = $(".carrinho-lista");
    const totalCarrinhoElement = $(".total-carrinho");

    // Abrir carrinho
    $("#btn-abrir-carrinho").click(function() {
        $(".carrinho-container").css("right", "0");
    });

    // Abrir carrinho direto do produto 
    $('.btn-carrinho').click(function () {
        $(".carrinho-container").css("right", "0")
    })

    // Fechar carrinho
    $("#fechar-carrinho").click(function() {
        $(".carrinho-container").css("right", "-300px");
    });

    $(".lista-produto .btn-carrinho").click(function() {
        const produto = $(this).closest("li");
        const produtoNome = produto.find("h3").text();
        const produtoPreco = parseFloat(produto.find(".preco-promo").text().replace("R$ ", ""));

        // Verifica se o item já está no carrinho
        const carrinhoItemExistente = carrinhoLista.find(`[data-produto="${produtoNome}"]`);

        if (carrinhoItemExistente.length > 0) {
            // Atualiza a quantidade e o preço do item existente
            const quantidadeAtual = parseInt(carrinhoItemExistente.find(".quantidade").text());
            const novaQuantidade = quantidadeAtual + 1;
            carrinhoItemExistente.find(".quantidade").text(novaQuantidade);

            const precoAtual = parseFloat(carrinhoItemExistente.find(".preco-item").text().replace("R$ ", ""));
            const novoPreco = (novaQuantidade * produtoPreco).toFixed(2);
            carrinhoItemExistente.find(".preco-item").text(`R$ ${novoPreco}`);
        } else {
            // Adiciona o item ao carrinho
            const carrinhoItem = $("<li>").attr("data-produto", produtoNome);
            carrinhoItem.html(`
                ${produtoNome}
                - <span class="quantidade">1</span>
                x R$ <span class="preco-item">${produtoPreco.toFixed(2)}</span>
                <button class="remover-item">Remover</button>
            `);

            carrinhoLista.append(carrinhoItem);
        }

        // Atualiza o total do carrinho
        atualizarTotalCarrinho();
    });

    // remover um item do carrinho
    carrinhoLista.on("click", ".remover-item", function() {
        $(this).closest("li").remove();
        atualizarTotalCarrinho();
    });

    // limpar o carrinho
    $(".limpar-carrinho").click(function() {
        carrinhoLista.empty();
        atualizarTotalCarrinho();
    });

    // Função para atualizar o total do carrinho
    function atualizarTotalCarrinho() {
        let totalCarrinho = 0;

        carrinhoLista.find(".preco-item").each(function() {
            totalCarrinho += parseFloat($(this).text().replace("R$ ", ""));
        });

        totalCarrinhoElement.text(`R$ ${totalCarrinho.toFixed(2)}`);
    }

    // abrir menu (celular)
    $(".abrir-menu").click(function() {
        $(".menu-container").css("right", "0");
    });

    $("#fechar-menu").click(function() {
        $(".menu-container").css("right", "-300px");
    });
});
