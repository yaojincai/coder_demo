<template>
	<div class="shopcart">
		<div class="content" @click="toggleList">
			<div class="content-left">
				<div class="logo-wrapper">
					<div class="logo" :class="{'hightLight':totalCount>0}">
						<span class="icon-shopping_cart" :class="{'hightLight':totalCount>0}"></span>
					</div>
					<div class="num" v-show="totalCount">{{ totalCount }}</div>
				</div>
				<div class="price" :class="{'hightLight':totalPrice>0}">￥{{ totalPrice }}元</div>
				<div class="desc">另需配送费￥{{ deliveryPrice}}元</div>
			</div>
			<div class="content-right" @click.stop.prevent="pay">
				<div class="pay" :class="payClass">
					{{ payDesc }}
				</div>
			</div>
		</div>
		<div class="ball-container"></div>
		<transition name="fold">
			<div class="shopcart-list" v-show="listShow">
				<div class="list-header">
					<h1 class="title">购物车</h1>
					<span class="empty" @click="empty">清空</span>
				</div>
				<div class="list-content" ref="listContent">
					<ul>
						<li class="food" v-for="(food,index) in selectFoods" :key="index">
							<span class="name">{{ food.name }}</span>
							<div class="price">
								<span>￥{{ food.price * food.count }}</span>
							</div>
							<div class="cartcontrol-wrapper">
								<cartcontrol :food="food"></cartcontrol>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</transition>
		<transition name="mask">
			<div class="list-mask" v-show="listShow" @click="hideList"></div>
		</transition>	
    </div>
	
</template>

<script>
	import cartcontrol from '../cartcontrol/cartcontrol'
	import BScroll from 'better-scroll'
	export default{
		props: {
			selectFoods: {
				type: Array,
				default () {
					return [
						{
							
						}
					];
				}
			},
			deliveryPrice: {
				type: Number,
				default: 0
			},
			minPrice: {
				type: Number,
				default: 0
			}
		},
		data () {
			return {
				balls: [
					{
						show: false
					},
					{
						show: false
					},
					{
						show: false
					},
					{
						show: false
					},
					{
						show: false
					}
				],
				fold: true
			}
		},
		computed: {
			totalPrice () {      
				// 根据selectFoods数组计算总价
				let total = 0
				this.selectFoods.forEach((food) => {  
				// 遍历数组，对每个food的food.price和food.count相乘求和
					total += food.price * food.count
				})
				return total
			},
			totalCount () {       
				// 根据selectFoods数组计算数量
				let count = 0
				this.selectFoods.forEach((food) => {
					count += food.count 
				})
				return count
			},
			payDesc () {   
				// 购物车右侧描述详情
				// 用反引号（波浪线下面）不用拼接字符串，返回{}
				if (this.totalPrice === 0) {       
				// 当前总价为0显示：￥${this.minPrice}元起送
					return `￥${this.minPrice}元起送`
				} else if (this.totalPrice < this.minPrice) {
					// 计算距离起送价的差价
					let diff = this.minPrice - this.totalPrice  
					return `还差￥${diff}元起送`  
				} else {
					return `去结算` // 满足起送价格条件显示去结算
				}
			},
			payClass () {
				if (this.totalPrice>=this.minPrice){
					return 'enough'
				}
				else
				{
					return 'not-enough'
				}
			},
			listShow () {
				if (!this.totalCount) {
					this.fold = true
					return false
				}
				let show = !this.fold
				if (show) {
					this.$nextTick(() => {
					this.scroll = new BScroll(this.$refs.listContent, {click: true});
					})
				}
				return show
			}
		},
		methods: {
			toggleList () {
				if (!this.totalCount) {
					return 
				}
				this.fold = !this.fold
			},
			empty () {
				this.selectFoods.forEach((food) => {
					food.count = 0 
				})
			},
			hideList () {
				this.fold = true;
			},
			pay () {
				if (this.totalPrice < this.minPrice) {
					return
				}
				else
				{
					alert('结算金额：￥' + parseFloat(this.totalPrice + this.deliveryPrice) + '元')
				}
			}
		},
		components: {
			cartcontrol
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.shopcart
		position: fixed
		left: 0
		bottom: 0
		z-index: 100
		width: 100%
		height: 48px
		background: #ddd // #141d27
		.content
			display: flex
			background: #141d27
			font-size: 0
			.content-left
				flex: 1
				font-size:0
				.logo-wrapper
					display: inline-block
					position: relative
					top: -10px
					margin: 0 6px
					padding: 6px
					width: 56px
					height: 56px
					box-sizing: border-box
					vertical-align: top
					border-radius: 50%
					background: #141d27
					font-size:0
					.logo
						width: 100%
						height: 100%
						border-radius: 50%
						background: #2b343c
						text-align: center
						.icon-shopping_cart
							font-size: 24px
							line-height: 44px
							color: rgba(255, 255, 255, 0.4)
							&.hightLight
								color: #fff
						&.hightLight
							background: rgb(0, 160, 220)
							
					.num
						position: absolute
						top: 0
						right: 0
						width: 24px
						height: 16px
						line-height: 16px
						text-align: center
						border-radius: 16px
						font-size: 9px
						font-weight: 700
						color: #fff
						background: rgb(240, 20, 20)
						box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
				.price
					display: inline-block
					vertical-align: top
					margin-top: 12px
					line-height: 24px
					box-sizing: border-box
					padding-right: 12px
					border-right: 1px solid #2b333b
					font-size: 16px
					font-weight: bold
					color: rgba(255, 255, 255, 0.1)
					&.hightLight
						color: #fff
				.desc
					display: inline-block
					vertical-align: top
					line-height: 24px
					font-size: 14px
					color: rgba(255, 255, 255, 0.4)
					font-weight: 200
					margin: 12px 0 0 6px
			.content-right
				flex: 0 0 105px
				width: 105px
				.pay
					height: 48px
					line-height: 48px
					text-align: center
					font-size: 12px
					font-weight: 700
					color: rgba(255, 255, 255, 0.4)
					&.not-enough
						background: #2b333b
					&.enough
						background: #00b43c
						color: #fff
		.shopcart-list
			position: absolute
			bottom: 48px
			left: 0
			z-index: -1
			width: 100%
			transition: all 0.4s linear
			&.fold-enter, &.fold-leave-to
				transform translate3d(0px, 100%, 0px)
			&.fold-enter-to, &.fold-leave
				transform translate3d(0px, 0px, 0px)
			.list-header
				height: 40px
				line-height: 40px
				padding: 0 18px
				background: #f3f5f7
				border-bottom: 2px solid rgba(7, 17, 27, 0.1)
				.title
					float: left
					font-size: 14px
					color: rgb(7, 17, 27)
					
				.empty
					float: right
					font-size: 14px
					color: rgb(0, 160, 220)
			.list-content
				padding: 0 18px
				max-height: 217px
				overflow: hidden
				background: #fff
				.food
					position: relative
					padding: 12px 0
					box-sizing: border-box
					border-bottom: 1px solid rgba(7, 17, 27, 0.1)
					.name
						line-height: 24px
						font-size: 14px
						color: rgb(7, 17, 27)
					.price
						position: absolute
						right: 90px
						bottom: 12px
						line-height: 24px
						font-size: 14px
						font-weight: 700
						color: rgb(240, 20, 20)
					.cartcontrol-wrapper
						position: absolute
						right: 0
						bottom: 6px
		.list-mask
			position: fixed
			left: 0
			top: 0
			width: 100%
			height: 100%
			z-index: -2
			background: rgba(7, 17, 27,0.6)
			backdrop-filter: blur(10px)
			&.mask-enter-active,&.mask-leave-active
					transition: all 0.5s
				&.mask-enter,&.mask-leave-to
					opacity: 0				
				
</style>