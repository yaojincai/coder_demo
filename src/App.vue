<template>
  <div class="app">
    <Vheader :seller="seller"></Vheader>
    <div class="nav">
      <div class="nav_item">
        <router-link to='/goods'>商品</router-link>
      </div>
      <div class="nav_item">
        <router-link to='/seller'>评价</router-link>
      </div> 
      <div class="nav_item">
        <router-link to='/ratings'>商家</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>

</template>

<script>
import header from './components/hearder/hearder.vue'

const ERR_OK = 0

export default {
  name: 'App',

  data () {
    return {
     // name: 'App'
      seller: {}
    }
  },
  components: {
    Vheader: header
  },
  created () {
    this.$http.get('/api/seller').then((response) => {
        response = response.body
        if (response.erron === ERR_OK) {
          this.seller = response.data
        }
    })
  }        
};
</script>

<style>
.app {
  font-family: "Microsoft Yahei",'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

<style scoped>
  .app .nav{
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid rgba(7,17,27,0.1);

  }

  .app .nav .nav_item{
    flex: 1;
    height: 40px;
    font: 14px/40px "Microsoft Yahei";
    text-align: center;
  }

  .app .nav .router-link-active{
    color: rgb(240,20,20);
    /*<a data-v-04c2046b="" href="#/seller" class="router-link-exact-active router-link-active">评价</a>*/
  }

  .app .nav .nav_item a{
    display: block;
  }

</style>
