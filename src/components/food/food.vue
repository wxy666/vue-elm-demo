<template>
	<transition name="move">
		<div class="food" v-show="showFlag" ref="food">
			<div class="food-content">
				<div class="image-header">
					<img :src="food.image">
					<div class="back" @click="hide">
						< </div>
					</div>
					<div class="content">
						<h1 class="title">{{food.name}}</h1>
						<div class="detail">
							<span class="sell-count">月售{{food.sellCount}}份</span>
							<span class="rating">好评率{{food.rating }}</span>
						</div>
						<div class="price">
							<span class="now">￥{{food.price}}</span><span v-show="food.oldPrice">￥{{food.oldPrice}}</span>
						</div>
						<div class="cartcontrol-wrapper">
							<cartcontrol @add="addFood" :food="food"></cartcontrol>
						</div>
						<transition name="fade">
							<div @click="addFirst(food,$event)" class="buy" v-show="!food.count ||food.count===0">
								加入购物车
							</div>
						</transition>
					</div>
					<split></split>
					<div class="des">
						<h1 class="title">商品介绍</h1>
						<div class="info">{{food.info}}</div>
					</div>
					<split></split>
					<div class="ratings">
						<h1 class="title">商品评价</h1>
						<ratingselect @select="selectRating"  @toggle="toggleContent" :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
						<div class="rating-wrapper">
							<ul v-show="food.ratings && food.ratings.length">	
								<li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item">
									<div class="user">
										<span class="name">{{rating.username}}</span>
										<img class="avatar" width="12" height="12" :src="rating.avatar" alt="" />
									</div>
									<div class="time">
										{{rating.rateTime|formatDate}}
									</div>
									<div class="text">
										<span class="iconfont" :class="{'icon-dianzan_leave':rating.rateType===0,'icon-cai':rating.rateType===1 }"></span>{{rating.text}}
									</div>
								</li>
							</ul>
							<div class="no-rating" v-show="!food.ratings||!food.ratings.length">
								暂无评价
							</div>
						</div>
					</div>
				</div>
			</div>
	</transition>
</template>

<script>
	import BScroll from "better-scroll";
	import Vue from 'vue';
	import {formatDate} from '@/common/js/date';
	import split from '@/components/split/split';
	import cartcontrol from '@/components/cartcontrol/cartcontrol';
	import ratingselect from '@/components/ratingselect/ratingselect';
	const ALL = 2;
	export default {
		props: {
			food: {
				type: Object
			}
		},
		data() {
			return {
				showFlag: false,
				selectType: ALL,
				onlyContent: true,
				desc: {
					all: "全部",
					positive: "推荐",
					negative: "吐槽"
				}
			};
		},
		watch:{
			'food'(){
				console.log(this.food)
			}
		},
		methods: {
			show() {
				this.showFlag = true;
				this.selectType = ALL;
				this.onlyContent = false;
				this.$nextTick(() => {
					if(!this.scroll) {
						this.scroll = new BScroll(this.$refs.food, {
							click: true
						});
					} else {
						this.scroll.refresh()
					}
				})
			},
			hide() {
				this.showFlag = false;
			},
			addFirst(food, event) {
				if(!event._constructed) { // //如果不存在这个属性,则不执行下面的函数 防止pc点击切换两次
					return;
				}
				this.$emit('add', event.target);
				Vue.set(this.food, 'count', 1)

			},
			needShow(type,text){
				if(this.onlyContent && !text){
					return false;
				}
				if(this.selectType===ALL){
					return true;
				}else{
					return type===this.selectType;
				}
			},
			addFood(target) {
				this.$emit('add', target);
			},
			selectRating(type) {
				this.selectType = type;
				this.$nextTick(() => {
					this.scroll.refresh();
				});
			},
			toggleContent() {
				this.onlyContent = !this.onlyContent;
				this.$nextTick(() => {//异步更新DOM刷新better-scroll
					this.scroll.refresh();
				});
			}
		},
		filters:{
			formatDate(time){
				let data=new Date(time);
				return formatDate(data,'yyyy-MM-dd hh:mm')
			}
		},
		components: {
			split,
			cartcontrol,
			ratingselect
		}
	};
</script>

<style scoped="scoped">
	.food {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0.96rem;
		z-index: 30;
		width: 100%;
		background: #FFFFFF;
		transform: translate3d(0, 0, 0);
	}
	
	.move-enter-active,
	.move-leave-active {
		transition: all 0.2s linear;
	}
	
	.move-enter,
	.move-leave-to {
		transform: translate3d(100%, 0, 0);
	}
	
	.image-header {
		position: relative;
		width: 100%;
		height: 0;
		padding-top: 100%;
	}
	
	.image-header img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	
	.back {
		position: absolute;
		top: 0.2rem;
		left: 0;
		color: indianred;
	}
	
	.content {
		padding: 0.36rem;
		position: relative;
	}
	
	.content .title {
		line-height: 0.28rem;
		margin-bottom: 0.16rem;
		font-size: 0.28rem;
		font-weight: 700;
		color: rgb(7, 17, 27);
	}
	
	.content .detail {
		margin-bottom: 0.36rem;
		line-height: 0.2rem;
		height: 0.2rem;
		font-size: 0;
	}
	
	.sell-count,
	.rating {
		display: inline-block;
		font-size: 0.2rem;
		color: rgb(147, 153, 159);
	}
	
	.sell-count {
		margin-right: 0.24rem;
	}
	
	.now {
		color: red;
		margin-right: 0.16rem;
	}
	
	.cartcontrol-wrapper {
		position: absolute;
		right: 0.24rem;
		bottom: 0.2rem;
	}
	
	.buy {
		position: absolute;
		right: 0.36rem;
		bottom: 0.36rem;
		z-index: 10;
		height: 0.48rem;
		line-height: 0.48rem;
		padding: 0 0.24rem;
		box-sizing: border-box;
		font-size: 0.2rem;
		border-radius: 0.24rem;
		color: #FFFFFF;
		background: rgb(0, 160, 220);
	}
	
	.des {
		padding: 0.36rem;
	}
	
	.des .title {
		font-size: 0.2rem;
	}
	
	.des .info {
		font-size: 0.24rem;
		font-weight: 200;
		color: rgb(77, 85, 93);
		line-height: 0.48rem;
		padding: 0 0.16rem;
	}
	
	.ratings {
		width: 100%;
		padding-top: 0.36rem;
	}
	
	.ratings .title {
		line-height: 0.28rem;
		margin-left: 0.36rem;
		font-size: 0.28rem;
		color: #07111b;
	}
	.rating-wrapper{
		padding: 0 0.36rem;
	}
	.rating-item{
		position: relative;
		padding: 0.32rem 0;
		border-bottom: 0.02rem solid rgba(7,17,27,0.1);
	}
	.user{
		position: absolute;
		right: 0;
		top: 0.32rem;
		line-height: 0.24rem;
		font-size: 0;
	}
	.user .name{
		display: inline-block;
		vertical-align: top;
		font-size: 0.2rem;
		color: rgb(147,153,159);
		margin-right: 0.12rem;
	}
	.user .avatar{
		border-radius: 50%;
	}
	.time{
		margin-bottom: 0.12rem;
		line-height: 0.24rem;
		font-size: 0.2rem;
		color: rgb(147,153,159);
	}
	.text{
		line-height: 0.32rem;
		font-size: 0.24rem;
		color: rgb(7,17,27);
	}
	.text .icon-cai{
		color: rgb(147,153,159);
	}
	.text .icon-dianzan_leave{
		color: rgb(0,160,220);
	}
	.iconfont{
		margin-right: 0.04rem;
		font-size: 0.24rem;
		line-height: 0.32rem;
	}
	.no-rating{
		padding: 0.32rem 0;
		font-size: 0.24rem;
		color: rgb(147,153,159);
	}
</style>