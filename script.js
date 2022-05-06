"use strict"
const url = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/'

class BasketItems {
  constructor({product_name,price}) {
    this.name = product_name;
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

class Control {
  constructor(url) {
    this.url = url;
    this.mItem =[];
    this.filteredItems = [];
  }
  service (cb) {
    fetch(this.url)
    .then(dat => dat.json())
    .then(dat => {
      this.mItem = dat;
      this.filteredItems = dat;
      cb()
      
    });
    
  }
  render() {
    const goods = this.filteredItems.map(item => {
      const goodItem = new BasketItems(item);
      return goodItem.render()
    }).join('');
    document.querySelector('.goods-list').innerHTML = goods;
  }
  filterItems(value) {
    this.filteredItems = this.mItem.filter(({ product_name }) => {
      return product_name.match(new RegExp(value, 'gui'))
    })
  } 
  info() {
    let ElBasket = new BasketInfo(this.mItem.amount,this.mItem.countGoods);
    document.querySelector('.itogPrice').innerHTML = ElBasket.render();
  }
} 
let contr = new Control(`${url}catalogData.json`);
contr.service(() => contr.render()); 

let inform = new Control(`${url}getBasket.json`);
inform.service(() => inform.info()); 

document.querySelector('#search-button').addEventListener('click', () => {
  const value = document.querySelector('#goods-search').value;
  contr.filterItems(value);
  contr.render();
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




