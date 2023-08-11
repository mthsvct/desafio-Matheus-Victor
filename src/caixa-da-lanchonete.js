class CaixaDaLanchonete {


    calcularValorDaCompra(metodoDePagamento, itens) {
        // metodoDePagamento
        // itens = ['cafe,1', 'sanduiche,1', 'queijo,1']

        // Dinheiro = 5% de desconto
        // Crédito = + 3% acrescimo
        let card = this.cardapio();
        let pedidos = this.converter(itens);
        let formas = ["dinheiro", "debito", "credito"]

        let ver = this.verificacoes(pedidos, card, metodoDePagamento, formas);

        console.log(ver);
        // let valor = this.calcular(pedidos, card);
        return "";
    }


    converter(itens){
        return itens.map( (item) => { return {cod: item.split(',')[0], qnt: parseInt(item.split(',')[1])}})
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

    qntPrincipais(pedidos){
        return pedidos.filter((p) => { return p.tipo == "principal" });
    }

    codValido(item, card) {
        // Se o filtro retorna uma lista que possui a quantidade de itens maior que 0:
        //      Então o código que está no pedido é válido. 
        return card.filter(i => {return i.cod == item.cod}).length > 0
    }


    verificacoes(pedidos, card, metodo, formas){
       let aceito = true;
       let mensagem = '';
       return {aceito: aceito, mensagem: mensagem};
    }

}

// export { CaixaDaLanchonete };

const caixa = new CaixaDaLanchonete();

caixa.calcularValorDaCompra(
    'dinheiro',
    ['cafe,1', 'sanduiche,1', 'queijo,1']
)


