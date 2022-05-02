const GET_GOODS_ITEMS = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json'
const GET_GOODS_lIST = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json'

class XhrQuest {
  constructor (url) {
    this.url = url;
  }
  service(callback) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', this.url);
    xhr.send();
    xhr.onload = () => {
      callback(JSON.parse(xhr.response))
    }
  }
}

let rec = new XhrQuest(GET_GOODS_ITEMS);
let res2 = new XhrQuest(GET_GOODS_lIST);


rec.service(dat => {
  let listHtml =""
  dat.forEach(good => {
    let goodItem = `<div class="goods-item"><h3>${good.product_name}</h3><p>${good.price}</p></div>`;
    listHtml += goodItem;
  });
  document.querySelector('.goods-list').innerHTML = listHtml;
});

res2.service(dat => {
  document.querySelector('.itogPrice').innerHTML = `Сумма: ${dat.amount} Количество товара ${dat.countGoods}`;
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




