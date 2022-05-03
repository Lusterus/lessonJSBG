"use strict"
const url = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/'

function service (url) {
  return fetch(url).then(dat => dat.json());
}
class BasketItems {
  constructor(name,price) {
    this.name = name;
    this.price = price;
  }
  render() {
    return `<div class="goods-item"><h3>${this.name}</h3><p>${this.price}</p></div>`;
  }
}
class BasketInfo {
  constructor (SumPrice,Countitems) {
    this.SumPrice = SumPrice;
    this.Countitems = Countitems;
  }
  render() {
    return `Сумма: ${this.SumPrice } Количество товара ${this.Countitems}`
  }

}
service(`${url}catalogData.json`)
.then(dat => {
  let listHtml ="";
  dat.forEach(e => {
    let ElBasket = new BasketItems(e.product_name,e.price);
    listHtml += ElBasket.render();
  });
  document.querySelector('.goods-list').innerHTML = listHtml;
})

service(`${url}getBasket.json`)
.then(dat => {
  let BsInfo = new BasketInfo(dat.amount,dat.countGoods);
  document.querySelector('.itogPrice').innerHTML = BsInfo.render();
})

// class Basket {
//   constructor() {
//   }
//   clear(){}
//   countItems() {}
//   sumPrice() {}
//   pay() {}
// }
// class ItemBasket {
//   constructor() { 
//   }
//   outputTitle() {}
//   add() {}
//   del() {}
// }




