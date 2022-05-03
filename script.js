const url = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/'

function service(url,callback) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send();
  xhr.onload = () => {
    callback(JSON.parse(xhr.response))
  }
}
    
class BasketItems {
  constructor (name,price) {
    this.name = name;
    this.price = price;
  }
  render () {
    return `<div class="goods-item"><h3>${this.name}</h3><p>${this.price}</p></div>`
  };
}

class BasketInfo  {
  constructor(SumPrice, CountPrice) {
    this.SumPrice= SumPrice;
    this.CountPrice = CountPrice;
  }
  render () {
    return `Сумма: ${this.SumPrice} Количество товара ${this.CountPrice}`
  }
}
service(`${url}catalogData.json`,dat => {
  let listHtml =""
  dat.forEach(good => {
    let goodItem = new BasketItems(good.product_name,good.price);
    listHtml += goodItem.render();
  });
  document.querySelector('.goods-list').innerHTML = listHtml;
});


service(`${url}getBasket.json`,dat => {
  let inf = new BasketInfo(dat.amount,dat.countGoods);
  document.querySelector('.itogPrice').innerHTML = inf.render();
});



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




