"use strict"
const app = new Vue({
  el: "#app",
  data: {
    mItem: [],
    mItemInfo: [],
    filteredItems: [],  
    searchLine: '',
    isVisibleCart: true
  },
  methods: {
    service (url) {
      const partUrl = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';
      fetch(`${partUrl}${url}`)
      .then(dat => dat.json())
      .then(dat => {
        this.mItem = dat;
        this.filteredItems = dat;
      });
    },
    serviceInfo (url) {
      const partUrl = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';
      fetch(`${partUrl}${url}`)
      .then(dat => dat.json())
      .then(dat => {
        this.mItemInfo = dat;
      });
    },
    serchItems () {
      this.filteredItems = this.mItem.filter(({ product_name }) => {
        return product_name.match(new RegExp(this.searchLine, 'gui'))
      })
    }

  }, 
  mounted() {
    this.service(`catalogData.json`);
    this.serviceInfo(`getBasket.json`);
  }
});
