"use strict"
Vue.component('goods-list', {
  props: ['goods'],
  template: `
    <div class="goods-list">
      <goods-item :good="gooditem"  :key = "gooditem.id_product" v-for="gooditem in goods"></goods-item>
    </div>`
});
Vue.component('goods-item', {
  props:['good'],
  template: ` 
  <div class = "goods-item" >
    <div class="goods-image">
    </div>
    <div class="goods-name">
      <h3>{{ good.product_name }}</h3>
    </div>
    <div class="goods-count">
      <div class="goods-count__input">
          <div class="goods-count__pl">
            +
          </div>
          <div class="goods-count__pl">
            кол
          </div>
          <div class="goods-count__pl">
            -
          </div>                 
      </div>
    </div>
    <div class="goods-item__price">
      <p>Цена: {{ good.price }}</p>
    </div>   
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
    searchLine: '',
    isVisibleCart: true,
    errorsTitle: '',
  },
  methods: {
    service (url) {
      const partUrl = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';
      fetch(`${partUrl}${url}`)
      .then(dat => dat.json())
      .then(dat => {  
        this.mItem = dat;
        this.filteredItems = dat;
      }).catch(dat => this.errorsTitle = "dat");
    },
    serviceInfo (url) {
      const partUrl = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';
      fetch(`${partUrl}${url}`)
      .then(dat => dat.json())
      .then(dat => {
        this.mItemInfo = dat;
      }).catch(dat => this.errorsTitle = "dat");
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
    this.service(`catalogData.json`);
    this.serviceInfo(`getBasket.json`);
  },
});



