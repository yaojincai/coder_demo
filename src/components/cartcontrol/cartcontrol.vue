<template>
	<div class="cartcontrol">
		<transition name="fade"> 
			<div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click.stop.prevent="decreaseCart($event)">
				<transition name="inner">
				<span class="inner icon-remove_circle_outline"></span>
				</transition>
			</div>
		</transition>
		<div class="cart-count" v-show="food.count>0">{{ food.count }}</div>
		<div class="cart-add icon-add_circle" @click.stop.prevent="addCart($event)"></div>
    </div>
</template>

<script>
	import Vue from 'vue'
	export default{
		props: {
			food: {
				type: Object
			}
		},
		methods: {
			addCart (event) {
				if (!event._constructed) { 
					// 去掉自带的click事件点击，即pc端直接返回
		          return;
		        }
				console.log('click')
				if ( !this.food.count) {
					Vue.set(this.food, 'count', 1 )
				}
				else
				{
					this.food.count++
				}
			},
			decreaseCart (event) {
				if (!event._constructed) { 
					// 去掉自带的click事件点击，即pc端直接返回
		          return;
		        }
		        if (this.food.count) {
		        	this.food.count--
		        }
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.cartcontrol
		font-size: 0
		.cart-decrease
			display: inline-block
			padding: 6px
			&.fade-enter-active, &.fade-leave-active
				transition: all 0.4s linear
				&.fade-enter, &.fade-leave-active
					opacity: 0
					transform translate3d(24px, 0px, 0px)
			.inner
				display: inline-block
				line-height: 24px
				font-size: 24px
				color: rgb(0, 160, 220)
				&.inner-enter-active, &.inner-leave-active
					transition: all 0.5s linear
					transform: rotate(0)
			
				&.inner-enter, &.inner-leave-active
					opacity: 0
					transform  rotate(180deg)
		.cart-count
			display: inline-block
			vertical-align: top
			width: 12px
			font-size: 10px
			line-height: 24px
			text-align: center
			color: rgb(147, 153, 159)
			padding-top: 6px
		.cart-add	
			display: inline-block
			padding: 6px
			line-height: 24px
			font-size: 24px
			color: rgb(0, 160, 220)

</style>