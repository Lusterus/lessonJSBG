class GoodsItem {
  constructor (title,price) {
    this.title = title;
    this.price = price;
  }
  render () {
    return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
  }
}

class GoodsList {
  constructor () {
    this.goods = [];
  }
  fetchGoods() {
    this.goods = [
      { title: 'Shirt', price: 150 },
      { title: 'Shoes', price: 250 },
      { title: 'Socks', price: 50 },
      { title: 'Jacket', price: 350 },
    ];  
  }  
  render() {
    let listHtml = '';
    this.goods.forEach(good => {
      const goodItem = new GoodsItem(good.title, good.price);
      listHtml += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = listHtml;
  }
  sumItem() {
    let sumItems = 0;
    for (let i =0; i < this.goods.length; i++) {
      sumItems += this.goods[i].price;
    } 
    document.querySelector('.itogPrice').innerHTML = `Сумма: ${sumItems}`;
  }    
}

class Basket {
  constructor() {
  }
  clear(){}
  countItems() {}
  sumPrice() {}
  pay() {}
}
class ItemBasket {
  constructor() { 
  }
  outputTitle() {}
  add() {}
  del() {}
}

const list = new GoodsList();
list.fetchGoods();
list.render();
list.sumItem();


