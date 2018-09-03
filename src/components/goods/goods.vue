<template>
	<div class="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li v-for="(item,index) in goods" :key="index" class="menu-item" :class="{'current':currentIndex === index}" @click="selectMenu(index, $event)">
					<span class="text">
						<span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>{{ item.name }}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref="foodsWrapper">
	      <ul>
	      	<li v-for="(item,index) in goods" :key="index" class="food-list food-list-hook">
	      		<h1 class="title">{{ item.name }}</h1>
	      		<ul>
	      			<li v-for="(food,fid) in item.foods" :key="fid" class="food-item">
	      				<div class="icon">
	      					<img width="57" height="57" :src="food.icon">
	      				</div>
	      				<div class="content">
	      					<h2 class="name">{{food.name}}</h2>
	      					<p class="desc">{{ food.description }}</p>
	      					<div class="extra">
	      						<span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
	      					</div>
	      					<div class="price">
	      						<span class="now">￥{{ food.price }}</span><span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
	      					</div>
	      					<div class="cartcontrol-wrapper">
	      						<cartcontrol :food="food"></cartcontrol>
	      					</div>
	      				</div>
	      			</li>
	      		</ul>
	      	</li>
	      </ul>
	    </div>
	    <shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	import shopcart from '../shopcart/shopcart'
	import cartcontrol from '../cartcontrol/cartcontrol'
	const ERR_OK = 0

	export default{
		props: {
			seller: {
				type: Object
			}
		},
		data () {
			return {
					goods: [],
					listHeight: [],
					scrollY: 0,
					selectedFood: {}
				} 
		},
		created () {
			this.classMap = ['decrease','discount','special','invoice','guarantee'];

		    this.$http.get('/api/goods').then((response) => {
		        response = response.body
		        if (response.erron === ERR_OK) {
		          this.goods = response.data;
		          this.$nextTick(() => {
		          	this._initScroll();
		          	this._calculateHeight();
		          })
		        }
		    })
		},
		methods: {
			_initScroll () {
				this.menuScroll = new BScroll(this.$refs.menuWrapper, {click: true});
				this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {probeType: 3, click: true});
				this.foodsScroll.on('scroll', (pos) => {
					this.scrollY = Math.abs(Math.round(pos.y));
				})
			},
			_calculateHeight () {
		        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook'); // 获取每一个food的dom对象
		        let height = 0
		        this.listHeight.push(height) // 初始化第一个高度为0
		        for (let i = 0; i < foodList.length; i++) {
		          let item = foodList[i] // 每一个item都是刚才获取的food的每一个dom
		          height += item.clientHeight // 主要是为了获取每一个foods内部块的高度
		          this.listHeight.push(height)
		        }
		    },
		    selectMenu (index, event) {
		        if (!event._constructed) { 
		        	// 去掉自带的click事件点击，即pc端直接返回
		          return;
		        }
		        let foodsList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
		        let el = foodsList[index];
		        // 类似jump to的功能,通过这个方法,跳转到指定的dom
		        this.foodsScroll.scrollToElement(el, 300);
			}
		},
		computed: {
			currentIndex () {
				// 计算到达哪个区域的区间的时候的对应的索引值
		        for (let i = 0; i < this.listHeight.length; i++) {
		          let height1 = this.listHeight[i]; // 当前menu子块的高度
		          let height2 = this.listHeight[i + 1]; // 下一个menu子块的高度
		          // 滚动到底部的时候,height2为undefined,需要考虑这种情况
		          // 需要确定是在两个menu子块的高度区间
		          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
		            return i; // 返回这个menu子块的索引
		          }
		        }
		        return 0;
			},
		    selectFoods () { 
		    	// 自动将所有的goods.food添加一个count属性,方便做数量运算
		        let foods = [];
		        this.goods.forEach((good) => {
		          good.foods.forEach((food) => {
		            if (food.count) {
		              foods.push(food);
		            }
		          });
		        });
		        return foods;
		    }
		},
		components: {
			shopcart,
			cartcontrol
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mainxin'
	.goods
		display: flex
		position: absolute
		top: 175px
		bottom: 46px
		width: 100%
		overflow: hidden
		.menu-wrapper
			flex: 0 0 80px
			width: 80px
			background: #f3f5f7
			.menu-item
				display: table
				height: 54px
				width: 56px
				line-height: 14px
				padding-left: 12px
				&.current
					position: relative
					z-index: 10
					margin-top: -1px
					background: #fff
					font-weight: bold
					padding-left: 20px
					.text
						border: 0
				.icon
					display inline-block
					width 12px
					height 12px
					vertical-align top
					margin-right 2px
					background-size 12px 12px
					background-repeat no-repeat
					&.decrease
						bg-image('decrease_3')
					&.discount
						bg-image('discount_3')
					&.guarantee
						bg-image('guarantee_3')
					&.invoice
						bg-image('invoice_3')
					&.special
						bg-image('special_3')	
				.text
					display: table-cell
					width: 56px
					vertical-align: middle
					font-size: 12px
					border-bottom: 1px solid rgba(7, 17, 27, 0.1)
					
		.foods-wrapper
			flex: 1
			.food-list
				.title
					padding-left: 14px
					height: 26px
					line-height: 26px
					font-size: 12px
					border-left: 2px solid #d9dde1
					color: rgb(147, 153, 159)
					background-color: #f3f5f7
				.food-item
					display: flex
					position: relative
					margin: 18px
					padding-bottom: 18px 
					border-bottom: 1px solid rgba(7, 17, 27, 0.1)
					&.last-child
						border: 0
						padding-bottom: 0
					.icon
						flex: 0 0 57px
						margin-right: 10px
					.content
						flex: 1
						.name
							margin:2px 0 8px 0
							height: 14px
							line-height: 14px
							font-size: 14px
							color: rgb(7, 17, 27)
							font-weight: bold
						.desc, .extra
							font-size: 10px
							line-height: 10px
							color: rgb(147, 153, 159)
						.desc
							margin-bottom: 8px
							line-height: 12px
						.extra
							.count
								margin-right: 12px
						.price
							font-weight: 700
							line-height: 24px
							.now
								color: rgb(240, 20, 20)
								margin-right: 8px
								font-size: 14px
								font-weight: bold
							.old
								text-decoration: line-through
								color: rgb(147, 153, 159)
								font-size: 10px
						.cartcontrol-wrapper
							position: absolute
							bottom: 0
							right: 0					
</style>