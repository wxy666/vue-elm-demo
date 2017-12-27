<template>
	<div class="seller" ref="seller">
		<div class="seller-content">
			<div class="overview">
				<h1 class="title">{{ sellera.name }}</h1>
				<div class="desc">
					<star :size="36" :score="sellera.score"></star>
					<span class="text">({{sellera.ratingCount}})</span>
					<span class="text">月售{{ sellera.sellCount  }}</span>
				</div>
				<ul class="remark">
					<li class="block">
						<h2>起送价</h2>
						<div class="content">
							<span class="stress">{{sellera.minPrice}}</span>
						</div>
					</li>
					<li class="block">
						<h2>商家配送</h2>
						<div class="content">
							<span class="stress">{{sellera.deliveryPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h2>平均配送时间</h2>
						<div class="content">
							<span class="stress">{{sellera.deliveryTime}}</span>分钟
						</div>
					</li>
				</ul>
				<div class="favorite">
					<span class="icon-favorite"></span>
				</div>
			</div>
			<split></split>
			<div class="bulletin">
				<h1 class="title">公共与其活动</h1>
				<div class="content-wrap">
					<p class="content">{{sellera.bulletin}}</p>
				</div>
				<ul v-if="sellera.supports">
					<li class="support-item" v-for="(item,index) in sellera.supports">
						<type :sellera="sellera" :index="index"></type>
						<span class="text">{{sellera.supports[index].description}}</span>
					</li>
				</ul>
			</div>
			<split></split>
			<div class="pics">
				<h1 class="title">商家实景</h1>
				<div class="pic-wrapper" ref="picWrapper">
					<ul class="pic-list" ref="picList">
						<li class="pic-item" v-for="pic in sellera.pics">
							<img :src="pic">
						</li>
					</ul>
				</div>
			</div>
			<split></split>
			<div class="info">
				<h1 class="title">商家信息</h1>
				<ul>
					<li class="info-item" v-for="info in sellera.infos">
						{{info}}
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	import star from '@/components/star/star';
	import split from '@/components/split/split';
	import type from '@/components/type/type';
	export default {
		props: {
			sellera: {
				type: Object
			}
		},
		created() {

		},
		watch: {
			'sellera' () {
				this.$nextTick(() => {
					console.log(this.sellera)
					this._initScroll();
					this._initPics();
				})
			}
		},
		mounted() {
			this.$nextTick(() => {
				this._initScroll();
				this._initPics();
			})
		},
		methods: {
			_initScroll() {
				if(!this.scroll) {
					this.scroll = new BScroll(this.$refs.seller, {
						click: true
					});
				} else {
					this.scroll.refresh();
				}
			},
			_initPics() {
				if(this.sellera.pics) {
					let picWidth = 120;
					let margin = 6;
					let width = (picWidth + margin) * this.sellera.pics.length - margin;
					this.$refs.picList.style.width = width + 'px';
					this.$nextTick(() => {
						if(!this.picScroll) {
							this.picScroll = new BScroll(this.$refs.picWrapper, {
								scrollX: true,
								eventPassthrough: 'vertical'
							});
						} else {
							this.picScroll.refresh(); 
						}
					});
				}
			}
		},
		components: {
			star,
			split,
			type
		}
	}
</script>

<style scoped="scoped">
	.seller {
		position: absolute;
		top: 3.49rem;
		bottom: 0;
		left: 0;
		width: 100%;
		overflow: hidden;
	}
	
	.overview {
		padding: 0.36rem;
	}
	
	.overview .title {
		margin-bottom: 0.16rem;
		line-height: 0.16rem;
		color: rgb(7, 17, 27);
		font-size: 0.28rem;
	}
	
	.overview .desc {
		padding-bottom: 0.36rem;
		line-height: 0.36rem;
		border-bottom: 0.5px solid rgba(7, 17, 27, 0.1);
		font-size: 0;
	}
	
	.star {
		display: inline-block;
		vertical-align: top;
		margin-right: 0.16rem;
	}
	
	.desc .text {
		display: inline-block;
		margin-right: 0.24rem;
		line-height: 0.36rem;
		vertical-align: middle;
		font-size: 0.2rem;
		color: rgb(77, 85, 93);
	}
	
	.remark {
		display: flex;
		padding-top: 0.36rem;
	}
	
	.remark .block {
		flex: 1;
		text-align: center;
		border-right: 0.5px solid rgba(7, 17, 27, 0.1);
	}
	
	.remark .block:last-child {
		border: none;
	}
	
	.block h2 {
		margin-bottom: 0.08rem;
		line-height: 0.2rem;
		font-size: 0.2rem;
		color: rgb(147, 153, 159);
	}
	
	.block .content {
		line-height: 0.36rem;
		color: rgb(7, 17, 27);
		font-weight: 200;
	}
	
	.block .stress {
		font-size: 0.36rem;
	}
	
	.bulletin {
		padding: 0.36rem 0.36rem 0 0.36rem;
	}
	
	.bulletin .title {
		margin-bottom: 0.16rem;
		line-height: 0.28rem;
		color: rgb(7, 17, 27);
		font-size: 0.28rem;
	}
	
	.content-wrap {
		padding: 0 0.24rem 0.32rem 0.24rem;
		border-bottom: 0.5px solid rgba(7, 17, 27, 0.1);
	}
	
	.content-wrap .content {
		line-height: 0.48rem;
		font-weight: 200;
		font-size: 0.24rem;
		color: rgb(240, 20, 20);
	}
	
	.support-item {
		padding: 0.32rem 0.24rem;
		border-bottom: 0.5px solid rgba(7, 17, 27, 0.1);
		font-size: 0;
	}
	
	.support-item:last-child {
		border: none;
	}
	
	.support-item .text {
		font-size: 0.24rem;
		font-weight: 200;
		color: rgb(7, 17, 27);
	}
	
	.pics {
		padding: 0.36rem;
	}
	
	.pics .title {
		margin-bottom: 0.32rem;
		line-height: 0.373333rem;
		color: rgb(7, 17, 27);
		font-size: 0.28rem;
	}
	
	.pic-wrapper {
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
	}
	
	.pic-list {
		font-size: 0;
	}
	
	.pic-item {
		display: inline-block;
		margin-right: 0.12rem;
		width: 120px;
		height: 90px;
	}
	
	.pic-item:last-child {
		margin: 0;
	}
	
	.pic-item img {
		width: 120px;
		height: 90px;
	}
	
	.info {
		padding: 0.36rem 0.36rem 0 0.36rem;
		color: rgb(7, 17, 27);
	}
	
	.info .title {
		padding-bottom: 0.24rem;
		line-height: 0.24rem;
		border-bottom: 0.5px solid rgba(7, 17, 27, 0.1);
		font-size: 0.28rem;
	}
	
	.info-item {
		padding: 0.32rem 0.24rem;
		line-height: 0.32rem;
		border-bottom: 0.5px solid rgba(7, 17, 27, 0.1);
		font-size: 0.24rem;
		font-weight: 200;
		color: rgb(7, 17, 27);
	}
	
	.info-item:last-child {
		border: none;
	}
</style>