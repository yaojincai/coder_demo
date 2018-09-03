import Vue from 'vue'
import Router from 'vue-router'
import goods from '@/components/goods/goods'
import seller from '@/components/seller/seller'
import ratings from '@/components/ratings/ratings'

Vue.use(Router)

export default new Router({
  routes: [
	  {
	  	path: '/',
	  	name: 'goods',
	  	component: goods,
	  	children: [
	  		{
	  			path: '/goods'
	  		}
	  	]
	  },
	  {
	  	path: '/',
	  	name: 'seller',
	  	component: seller,
	  	children: [
	  		{
	  			path: '/seller'
	  		}
	  	]
	  },
	  {
	  	path: '/',
	  	name: 'ratings',
	  	component: ratings,
	  	children: [
	  		{
	  			path: '/ratings'
	  		}
	  	]
	  }
  ]
})
