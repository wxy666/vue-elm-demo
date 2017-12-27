<template>
	<div>
		<div class="shopCart">
			<div class="content">
				<div class="content-left">
					<div class="logo-wrapper" @click="toggleList">
						<div class="logo" :class="{'heighlight':totalCount>0 }">
							<span class="iconfont icon-gouwuche1"></span>
						</div>
						<div class="num" v-show="totalCount>0">{{totalCount}}</div>
					</div>
					<div class="price" :class="{'highlight':totalPrice>0 }">¥{{totalPrice}}</div>
					<div class="desc">另需配送费¥{{deliveryPrice}}元</div>
				</div>
				<div class="content-right">
					<div class="pay" :class="payClass" @click.stop.prevent="pay">
						{{payDesc}}
					</div>
				</div>
			</div>
			<div class="ball-container">
				<div v-for="ball in balls">
					<transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
						<div class="ball" v-show="ball.show">
							<div class="inner inner-hook"></div>
						</div>
					</transition>
				</div>
			</div>
			<transition name="fold">
				<div class="shopcart-list" v-show="listShow">
					<div class="list-header">
						<h1 class="title">购物车</h1>
						<span class="empty" @click="empty">清空</span>
					</div>
					<div class="list-content" ref="listContent">
						<ul>
							<li class="food" v-for="food in selectFoods">
								<span class="name">{{food.name}}</span>
								<div class="price">
									<span>￥{{food.price*food.count}}</span>
								</div>
								<div class="cartcontrol-wrapper">
									<cartcontrol @add="addFood" :food="food"></cartcontrol>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</transition>
		</div>
		<transition name="fade">
			<div class="list-mask" @click="hideList" v-show="listShow"></div>
		</transition>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	import cartcontrol from '@/components/cartcontrol/cartcontrol';
	export default {
		props: {
			selectFoods: {
				type: Array,
				default() {
					return [{
						price: 10,
						count: 1
					}];
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
		data() {
			return {
				balls: [{
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
				dropBalls: [],
				fold: true
			};
		},
		computed: {
			totalPrice() {
				let total = 0;
				this.selectFoods.forEach((food) => {
					total += food.price * food.count;
				});
				return total;
			},
			totalCount() {
				let count = 0;
				this.selectFoods.forEach((food) => {
					count += food.count;
				});
				return count;
			},
			payDesc() {
				if(this.totalPrice === 0) {
					return `￥${this.minPrice}元起送`;
				} else if(this.totalPrice < this.minPrice) {
					let diff = this.minPrice - this.totalPrice;
					return `还差￥${diff}元起送`;
				} else {
					return '去结算';
				}
			},
			payClass() {
				if(this.totalPrice < this.minPrice) {
					return 'not-enough';
				} else {
					return 'enough';
				}
			},
			listShow() {
				if(!this.totalCount) {
					this.fold = true;
					return false;
				}
				let show = !this.fold;
				if(show) {
					this.$nextTick(() => {
						if(!this.scroll) {
							this.scroll = new BScroll(this.$refs.listContent, {
								click: true
							});
						} else {
							this.scroll.refresh();
						}
					});
				}
				return show;
			}
		},
		methods: {
			drop(el) {
				for(let i = 0; i < this.balls.length; i++) {
					let ball = this.balls[i];
					if(!ball.show) {
						ball.show = true;
						ball.el = el;
						this.dropBalls.push(ball);
						return;
					}
				}
			},
			toggleList() {
				if(!this.totalCount) {
					return;
				}
				this.fold = !this.fold;
			},
			hideList() {
				this.fold = true;
			},
			empty() {
				this.selectFoods.forEach((food) => {
					food.count = 0;
				});
			},
			pay() {
				if(this.totalPrice < this.minPrice) {
					return;
				}
				window.alert(`支付${this.totalPrice}元`);
			},
			addFood(target) {
				this.drop(target);
			},
			beforeDrop(el) {
				let count = this.balls.length;
				while(count--) {
					let ball = this.balls[count];
					if(ball.show) {
						let rect = ball.el.getBoundingClientRect();
						let x = rect.left - 32;
						let y = -(window.innerHeight - rect.top - 22);
						el.style.display = '';
						el.style.webkitTransform = `translate3d(0,${y}px,0)`;
						el.style.transform = `translate3d(0,${y}px,0)`;
						let inner = el.getElementsByClassName('inner-hook')[0];
						inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
						inner.style.transform = `translate3d(${x}px,0,0)`;
					}
				}
			},
			dropping(el, done) {
				/* eslint-disable no-unused-vars */
				let rf = el.offsetHeight;
				this.$nextTick(() => {
					el.style.webkitTransform = 'translate3d(0,0,0)';
					el.style.transform = 'translate3d(0,0,0)';
					let inner = el.getElementsByClassName('inner-hook')[0];
					inner.style.webkitTransform = 'translate3d(0,0,0)';
					inner.style.transform = 'translate3d(0,0,0)';
					el.addEventListener('transitionend', done);
				});
			},
			afterDrop(el) {
				let ball = this.dropBalls.shift();
				if(ball) {
					ball.show = false;
					el.style.display = 'none';
				}
			}
		},
		components: {
			cartcontrol
		}
	};
</script>

<style scoped="scoped">
	.logo {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		text-align: center;
		background: #2b343c;
	}
	
	.heighlight {
		background: rgb(0, 160, 220);
		color: #fff;
	}
	
	.heighlight .iconfont {
		color: #FFFFFF;
		width: 160px;
	}
	
	.shopCart {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 0.96rem;
		z-index: 50;
	}
	
	.highlight {
		color: #FFFFFF !important;
	}
	
	.logo span {
		font-size: 0.4rem;
		line-height: 0.88rem;
		color: #80858a;
	}
	
	.ball {
		position: fixed;
		left: 0.853333rem;
		bottom: 0.586666rem;
		z-index: 200;
		transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
	}
	
	.inner {
		width: 0.426666rem;
		height: 0.426666rem;
		border-radius: 50%;
		background: rgb(0, 160, 220);
		transition: all 0.4s linear;
	}
	
	.shopcart-list {
		position: absolute;
		left: 0;
		top: 0;
		z-index: -1;
		width: 100%;
		transform: translate3d(0, -100%, 0);
	}
	
	.fold-enter-active,
	.fold-leave-active {
		transition: all 0.5s
	}
	
	.fold-enter,
	.fold-leave-to {
		transform: translate3d(0, 0, 0)
	}
	
	.list-header {
		height: 1.066666rem;
		line-height: 1.066666rem;
		padding: 0 0.48rem;
		background: #f3f5f7;
		border-bottom: 1px solid rgba(7, 17, 27, 0.1);
	}
	
	.list-content {
		padding: 0 0.48rem;
		max-height: 5.786666rem;
		overflow: hidden;
		background: #fff;
	}
	
	.list-content .food {
		position: relative;
		padding: 0.32rem 0;
		box-sizing: border-box;
		border-bottom: 0.5px solid rgba(7, 17, 27, 0.1);
	}
	
	.list-content .name {
		line-height: 0.48rem;
		font-size: 0.28rem;
		color: rgb(7, 17, 27);
	}
	
	.list-content .price {
		position: absolute;
		right: 2.4rem;
		bottom: 0.32rem;
		line-height: 0.48rem;
		font-size: 0.28rem;
		font-weight: 700;
		color: rgb(240, 20, 20);
	}
	
	.title {
		float: left;
		font-size: 0.28rem;
		color: rgb(7, 17, 27);
	}
	
	.empty {
		float: right;
		font-size: 0.24rem;
		color: rgb(0, 160, 220);
	}
	
	.content {
		display: flex;
		background-color: #141d27;
		font-size: 0;
	}
	
	.content-left {
		flex: 1;
	}
	
	.logo-wrapper {
		display: inline-block;
		position: relative;
		top: -0.19rem;
		margin: 0 0.3rem;
		padding: 0.16rem;
		width: 1.12rem;
		height: 1.12rem;
		box-sizing: border-box;
		vertical-align: middle;
		border-radius: 50%;
		background-color: #141d27;
	}
	
	.num {
		position: absolute;
		top: 0;
		right: 0;
		width: 0.48rem;
		height: 0.32rem;
		line-height: 0.32rem;
		text-align: center;
		border-radius: 0.32rem;
		font-size: 0.24rem;
		font-weight: 400;
		color: #FFFFFF;
		background: rgb(240, 20, 20);
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
	}
	
	.price {
		display: inline-block;
		vertical-align: top;
		line-height: 0.48rem;
		margin-top: 0.24rem;
		padding-right: 0.24rem;
		box-sizing: border-box;
		border-right: 1px solid rgba(255, 255, 255, 0.1);
		font-size: 0.32rem;
		font-weight: 700;
		color: #919396;
	}
	
	.desc {
		display: inline-block;
		vertical-align: top;
		line-height: 0.48rem;
		margin: 0.2rem 0 0 0.1rem;
		color: rgba(255, 255, 255, 0.4);
		font-size: 0.24rem;
	}
	
	.content-right {
		flex: 0 0 2.8rem;
		width: 2.8rem;
	}
	
	.pay {
		line-height: 0.96rem;
		height: 0.96rem;
		text-align: center;
		font-size: 0.24rem;
		color: rgba(255, 255, 255, 0.4);
		font-weight: 700;
		background: #2b343c;
	}
	
	.not-enough {
		background: #2b333b;
	}
	
	.enough {
		background: #00b43c;
		color: #fff;
	}
	
	.list-mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 40;
		backdrop-filter: blur(10px);
		opacity: 1;
		background: rgba(7, 17, 27, 0.6);
	}
	
	.fade-enter-active,
	.fade-leave-active {
		transition: all 0.5s;
	}
	
	.fade-enter,
	.fade-leave-to {
		opacity: 0;
		background: rgba(7, 17, 27, 0);
	}
	
	.cartcontrol-wrapper {
		position: absolute;
		right: 0;
		bottom: 0.05rem;
	}
</style>