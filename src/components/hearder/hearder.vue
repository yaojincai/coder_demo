<template>
	<div class="header">
      <div class="cotent-wrapper">
      	<div class="avatar">
      		<img class="a-img" width="64" height="64" :src="seller.avatar">
      	</div>
      	<div class="content">
      		<div class="title">
      			<span class="brand"></span>
      			<h3 class="name">{{ seller.name }}</h3>
      		</div>
      		<div class="description">
      			{{ seller.description }}{{ seller.deliveryTime }} 分钟送达
      		</div>
      		<div v-if="seller.supports" class="supports">
      			<span class="icon" :class="classMap[seller.supports[0].type]"></span>
      			<span class="desc-text">{{ seller.supports[0].description }}</span>
      		</div>
      		
      	</div>
      	<div v-if="seller.supports" class="supports-content" @click="showDetail">
      		<span class="count">{{ seller.supports.length }} 个</span>
      		<span class="icon-keyboard_arrow_right"></span>
      	</div>
      </div>
      <div class="bulletin-wrapper" @click="showDetail">
      	<span class="bulletin-title"></span><p class="bulletin-text">{{ seller.bulletin }}</p>
		<i class="icon-keyboard_arrow_right"></i>
      </div>
      <div class="background">
      	<img :src="seller.avatar" width="100%" height="100%">
      </div>
      <transition name="fade">
	      <div v-show="detailShow" class="detail">
	      	<div class="detail-wrapper clearfix">
	      		<div class="detail-main">
	      			<h1 class="name">{{ seller.name }}</h1>
	      			<div class="star-wrapper">
	      				<star :size="48" :score="seller.score"></star>
	      			</div>
	      			<div class="title">
	      				<div class="line"></div>
	      				<div class="text">优惠信息</div>
	      				<div class="line"></div>
	      			</div>
	      			 <ul v-if="seller.supports" class="supports">
			            <li class="support-item" v-for="(item,index) in seller.supports" :key="(item.id,index.id)">
			              <span class="icon" :class="classMap[seller.supports[index].type]"></span>
			              <span class="text">{{seller.supports[index].description}}</span>
			            </li>
	          		</ul>
	          		<div class="title">
	      				<div class="line"></div>
	      				<div class="text">商家公告</div>
	      				<div class="line"></div>
	      			</div>
	      			<div class="bulletin">
	      				<p class="content">{{ seller.bulletin }}</p>
	      			</div>
	      		</div>
	      	</div>
	      		<div class="detail-close" @click="hideDetail">
	      			<i class="icon-close"></i>
	      		</div>
	      </div>
      </transition>
	</div>
</template>
<script>
	import star from '../star/star.vue'
	export default{
		props: {
		    seller: {
		        type: Object
		    }
		},
		data () {
			return {
				detailShow: false
			}
		},
		methods: {
			showDetail () {
				this.detailShow = true
			},
			hideDetail () {
				this.detailShow = false
			}
		},
		created () {
			this.classMap = ['decrease','discount','special','invoice','guarantee']
		},
		components: {
			star
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mainxin'

	.header
		color: #fff
		position: relative
		background: rgba(7, 17, 27, 0.5)
		overflow: hidden
		.cotent-wrapper
			padding: 24px 12px 18px 12px
			font-size: 0px
			position: relative
			.avatar
				display: inline-block
				.a-img
					border-radius: 4px
			.content
				vertical-align: top
				display: inline-block
				padding-left: 16px
				.title
					margin: 2px 0 8px 0
					.brand
						display: inline-block
						vertical-align: top
						width: 30px
						height: 18px
						bg-image('brand')
						background-size: 30px 18px
						background-repeat : no-repeat
					.name
						display: inline-block
						margin-left: 6px
						font-size: 16px
						line-height: 18px
						font-weight: bold
				.description
					margin-bottom: 10px
					font-size: 12px
					ling-height: 12px
				.supports
					.icon
						display: inline-block
						vertical-align: top
						width: 12px
						height: 12px
						margin-right: 4px
						background-size: 12px 12px
						background-repeat : no-repeat
					& .decrease
						bg-image('decrease_1')
					& .discount
						bg-image('discount_1')
					& .guarantee
						bg-image('guarantee_1')
					& .invoice
						bg-image('invoice_1')
					& .special
						bg-image('special_1')
					.desc-text
						line-height: 12px
						font-size: 10px
						vertical-align: top
			.supports-content
				position: absolute
				right: 12px
				bottom: 18px
				padding: 0 8px
				border-radius: 14px
				width: 50px
				height: 24px
				text-algin: center
				background-color: rgba(0, 0, 0, 0.2)
				.count
					font-size: 10px
					line-height: 24px
					font-weight: 200
					color: #fff
					vertical-align: top
					margin-left: 5px
				.icon-keyboard_arrow_right
					vertical-align: top
					margin-left: 8px
					font-size: 10px
					line-height: 24px
		.bulletin-wrapper
			height: 28px
			line-height: 28px
			padding: 0 44px 0 12px
			background: rgba(7, 17, 27, 0.2)
			white-space: nowrap
			overflow: hidden
			text-overflow: ellipsis
			position: relative
			.bulletin-title
				display: inline-block
				width: 22px
				height: 12px
				bg-image('bulletin')
				background-size: 22px 12px
				background-repeat : no-repeat
				vertical-align: top
				margin-top: 8px
			.bulletin-text
				display: inline-block
				vertical-align: top
				font-size: 10px
				margin: 0 4px	
			.icon-keyboard_arrow_right
				position: absolute
				color: #fff
				top: 10px
				right:12px
				font-size: 10px
		.background
			position: absolute
			top: 0
			left: 0
			width:100%
			height: 100%
			z-index: -1
			filter: blur(10px)
		.detail
			position: fixed
			top: 0
			left: 0
			z-index: 200
			width: 100%
			height:100%
			background: rgba(7, 17, 27,0.8)
			backdrop-filter: bulr(10px)
			&.fade-enter-active,&.fade-leave-active
				transition: opacity 0.5s
			&.fade-enter,&.fade-leave-to
				opacity: 0
			.detail-wrapper
				min-height: 100%
				width: 100%
				.detail-main
					padding: 64px 0
					.name
						line-height: 16px
						font-size: 16px
						font-weight: 700
						text-align: center
					.star-wrapper
						margin-top: 18px
						padding: 2px 0
						text-align: center
					.title
						display: flex
						width: 80%
						margin: 28px auto 24px auto
						.line
							flex: 1
							position:  relative
							top: -6px
							border-bottom: 1px solid rgba(255, 255, 255, 0.2)
						.text
							padding: 0 12px
							font-size: 14px
							font-weight: bold
					.supports
						width 80%
						margin 22px auto
						.support-item
							padding 0 12px
							font-size 0
							margin-bottom 12px
							&:last-child
								margin-bottom 0px
							.icon
								display inline-block
								width 16px
								height 16px
								vertical-align top
								margin-right 6px
								background-size 16px 16px
								background-repeat no-repeat
								&.decrease
									bg-image('decrease_2')
								&.discount
									bg-image('discount_2')
								&.guarantee
									bg-image('guarantee_2')
								&.invoice
									bg-image('invoice_2')
								&.special
									bg-image('special_2')
							.text
								line-height 16px
								font-size 12px
								color: #fff
					.bulletin
						width: 80%
						margin: 0 auto
						.content
							padding: 0 12px
							font-size: 12px
							line-height: 24px
							font-weight: 200
							color: rgb(255, 255, 255)
						
			.detail-close
				position: relative
				width: 32px
				height: 32px
				font-size: 32px
				margin: -64px auto 0 auto
				clear: both
				.icon-close
					color: #fff		
					
</style>
