"use strict"


Vue.component('goods-list', {
  props: ['goods'],
  template: `
    <div class="goods-list">
      <goods-item :good="gooditem" @add-basket = "$emit('add-basket', $event)" :key = "gooditem.id_product" v-for="gooditem in goods"></goods-item>
    </div>`
});
Vue.component('goods-item', {
  props:['good'],
  template: ` 
  <div class = "goods-item" >
    <div class="goods-image">
    </div>
    <div class="goods-name">
      <h3>{{ good.data.product_name }}</h3>
    </div>
    <div class="goods-count">
      <div class="goods-count__input">
          <div class="goods-count__pl" @click = "$emit('add-basket', good.id_product)">
            +
          </div>
          <div class="goods-count__pl">
            {{good.count}}
          </div>
          <div class="goods-count__pl">
            -
          </div>                 
      </div>
    </div>
    <div class="goods-item__price">
      <p>Цена: {{ good.total }}</p>
    </div>   
  </div>`
});


Vue.component('catalog-list', {
  props: ['goods'],
  template: `
    <div class="catalog-list">
      <catalog-item :good="gooditem"  @add-basket = "$emit('add-basket', $event)"  :key = "gooditem.id_product" v-for="gooditem in goods"></catalog-item>
    </div>`
}); //@add-basket = "(id) => { $emit('add-basket',id)}" Можно вот так передать параметр вместо $event
Vue.component('catalog-item', {
  props:['good'],
  template: `   
  <div class = "catalog-item" >
      <div class="catalog-name">
        <h3>{{ good.product_name }}</h3>
     </div>
     <div class="catalog-item__price">
     <p>Цена: {{ good.price  }}</p>
   </div>   
   <input class = "add_basket" type="submit" @click = "$emit('add-basket',good.id_product)" value = "Добавить в корзину">
  </div>`
});

Vue.component('search', {
  props: ['value'],
  template: `
  <div class="seach">
    <input 
    type="text" id = "goods-search" 
    :value="value"
    @input="$emit('input', $event.target.value)"
    >
    <input
      type="button" value="Искать" id = "search-button" @click="$emit('go-filter')"
    >
  </div>
  `
});



const app = new Vue({
  el: "#app",
  data: {
    mItem: [],
    mItemInfo: [],
    filteredItems: [],  
    mItemCatalog: [],
    searchLine: '',
    isVisibleCart: true,
    errorsTitle: '',
    ConstUrl: `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/`
  },
  methods: {
    service (url_path,mas) {
      return fetch(url_path)
      .then(dat => dat.json()
      .then(dat => { 
        if (mas == 1) {
          this.mItem = dat;
          this.filteredItems = dat;
        } else if (mas == 2) {
          this.mItemInfo = dat;
        } else if (mas == 3) {
          this.mItemCatalog = dat;
        } 
 
      }).catch(dat => this.errorsTitle = "dat")
      )
    },
    servisePost (url_path, body) {
       return fetch(url_path, {
        method: 'POST',
        headers: {
          "Content-type": 'application/json'
        },
        body: JSON.stringify(body)
      })
    },
    addBasket (idItem) {
      this.servisePost('http://localhost:8000/goods',{
        id: idItem,
      });

    },
    serchItems () {
      this.filteredItems = this.mItem.filter(({ product_name }) => {
        return product_name.match(new RegExp(this.searchLine, 'gui'))
      })
    },
    hideBasket () {
      this.isVisibleCart = !this.isVisibleCart;
    }

  }, 
  mounted() {
    this.service(`http://localhost:8000/goods`,1)
    //this.service(`${this.ConstUrl}getBasket.json`,2)
    this.service(`http://localhost:8000/goodsBasket`,3)
  },
});



