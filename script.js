const GET_GOODS_ITEMS = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json'
const GET_GOODS_lIST = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json'
function service(url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send();
  xhr.onload = () => {
    callback(JSON.parse(xhr.response))
  }
}

class GoodsItem {
  constructor (title,price) {
    this.title = title;
    this.price = price;
  }
  render () {
    return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
0  }
}

class GoodsList {
  constructor () {
    this.goods = [];
  }
  fetchGoods(url,cb) {
     service(url, (mas) => {
       this.goods=mas;
       cb();
     });

  }  
  render() {
    let listHtml = '';
    this.goods.forEach(good => {
      const goodItem = new GoodsItem(good.product_name, good.price);
      listHtml += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = listHtml;
  } 
}

class GoodsListNew{
  constructor () {
  }
  fetchGoods(url) {
     service(url, (mas) => {
      this.amount = mas.amount;
      this.countGoods = mas.countGoods;
      this.contents = mas.contents;
      document.querySelector('.itogPrice').innerHTML = `Сумма: ${this.amount} Количество товара ${this.countGoods}`;
     });

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
const list2 = new GoodsListNew();
list.fetchGoods(GET_GOODS_ITEMS,()=>{list.render();});

list2.fetchGoods(GET_GOODS_lIST);


