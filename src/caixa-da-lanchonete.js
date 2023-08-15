class CaixaDaLanchonete {


    calcularValorDaCompra(metodoDePagamento, itens) {
        let pedidos = this.converter(itens, this.cardapio());
        let { aceito, mensagem } = this.verificacoes(pedidos, metodoDePagamento, ["dinheiro", "debito", "credito"]);
        return aceito ? this.calcular(pedidos, metodoDePagamento, 0) : mensagem;
    }


    converter(itens, card){
        return itens.map( 
            (item) => { 
                let aux = item.split(',');
                return { 
                    item: this.buscaItem(aux[0], card) , 
                    qnt: aux[1], 
                    valor: 0,
                    decimal: aux.length > 2
                } 
            } 
        )
    }

    cardapio(){
        return [
            {cod: "cafe", desc: "Café", valor: 3.00, tipo: "principal"},
            {cod: "chantily", desc: "Chantily (extra do Café)", valor: 1.50, tipo: "extra", extraDo: "cafe"},
            {cod: "suco", desc: "Suco Natural", valor: 6.20, tipo: "principal"},
            {cod: "sanduiche", desc: "Sanduíche", valor: 6.50, tipo: "principal"},
            {cod: "queijo", desc: "Queijo (extra do Sanduíche)", valor: 2.00, tipo: "extra", extraDo: "sanduiche"},
            {cod: "salgado", desc: "Salgado", valor: 7.25, tipo: "salgado"},
            {cod: "combo1", desc: "1 Suco e 1 Sanduíche", valor: 9.50, tipo: "combo", itens:["suco", "sanduiche"]},
            {cod: "combo2", desc: "1 Café e 1 Sanduíche", valor: 7.50, tipo: "combo", itens:["cafe", "sanduiche"]}
        ]
    }


    buscaItem(cod, card){
        return card.filter( (i) => i.cod == cod )[0];
    }

    principalPresente(extra, pedidos){
        return pedidos.filter( (p) => p.item.cod == extra.item.extraDo ).length > 0;
    }

    verificaPedido(pedido, pedidos){
        let aceito = true;
        let mensagem = '';

        if (pedido.item == null){ 
            aceito = false; 
            mensagem = "Item inválido!";
        } else if( pedido.qnt == null || pedido.qnt == "" || isNaN(parseInt(pedido.qnt)) || pedido.qnt.indexOf(".") != -1 || pedido.qnt.indexOf(",") != -1 || pedido.decimal == true ) {
            // Verifica se a quantidade é um número (não pode ter decimais)
            aceito = false;
            mensagem = "Quantidade inválida!";

        } else if(parseInt(pedido.qnt) < 1) { 
            aceito = false; 
            mensagem = "Quantidade inválida!";

        } else if(pedido.item.tipo == "extra" && this.principalPresente(pedido, pedidos) == false) {
            aceito = false; 
            mensagem = "Item extra não pode ser pedido sem o principal"
        }

        return {aceito: aceito, mensagem: mensagem};
    }


    verificacoes(pedidos, metodo, formas){
        let aceito = true,  mensagem = '',  i = 0;

        if (formas.indexOf(metodo) == -1){
            aceito = false;
            mensagem = 'Forma de pagamento inválida!';
            
        } else if (pedidos.length == 0){
            aceito = false;
            mensagem = 'Não há itens no carrinho de compra!';
        
        } else {
            while (aceito && i < pedidos.length) {
                let aux = this.verificaPedido(pedidos[i], pedidos);
                aceito = aux.aceito;
                mensagem = aux.mensagem;
                pedidos[i].qnt = aceito ? parseInt(pedidos[i].qnt) : 0;
                i += 1;
            }
        }
        return {aceito: aceito, mensagem: mensagem};
    }


    calcular(pedidos, metodo, valor){
        pedidos.forEach((p) => { valor += (p.item.valor * p.qnt) });
        return `R$ ${this.desconto(valor, metodo).toFixed(2).toString().replace(".", ",")}`;
    }

    desconto(valor, metodo){
        return (metodo == "dinheiro") ? (valor * 0.95) : (metodo == "credito") ? (valor + (valor * 0.03)) : valor
    }


}

export { CaixaDaLanchonete };

// const caixa = new CaixaDaLanchonete();

// let v = caixa.calcularValorDaCompra(
//     'dinheiro',
//     ['cafe,4', 'sanduich,3', 'queijo,2']
// )

// console.log(v);


