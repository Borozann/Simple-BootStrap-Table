export default class Item {
  constructor(descricao, quantidade, valor) {
    this.descricao = descricao.toUpperCase();
    this.quantidade = quantidade;
    this.valor = valor;
  }

  get subtotal() {
    return this.quantidade * this.valor;
  }

  static transformDataToItem = function (data) {
    return new Item(data.descricao, data.quantidade, data.valor);
  };
}
