<template>
	<div>
		<div class="goods">
			<div class="menu-wrapper" ref="menuWrapper">
				<ul>
					<li v-for="(item,index) in goods" ref="menuList" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
						<span class="text">
					<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span> {{ item.name }}
						</span>
					</li>
				</ul>
			</div>
			<div class="foods-wrapper" ref="foodsWrapper">
				<ul>
					<li v-for="item in goods" class="food-list" ref="foodList">
						<h1 class="title">{{ item.name }}</h1>
						<ul>
							<li @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item">
								<div class="icon">
									<img :src="food.icon" />
								</div>
								<div class="content">
									<h2 class="name">{{food.name}}</h2>
									<p class="desc">{{food.description}}</p>
									<div class="extra">
										<span class="count">月售{{food.sellCount}}</span>
										<span>好评率{{food.rating}}%</span>
									</div>
									<div class="price">
										<span class="now">￥{{food.price}}</span><span v-show="food.oldPrice">￥{{food.oldPrice}}</span>
									</div>
									<div class="cartControl-wrapper">
										<cartcontrol @add="addFood" :food="food"></cartcontrol>
									</div>
								</div>
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="sellera.deliveryPrice" :min-price="sellera.minPrice"></shopcart>
		</div>
		<food @add="addFood" :food="selectedFood" ref="food"></food>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	import shopcart from '@/components/shopcart/shopcart.vue';
	import cartcontrol from '@/components/cartcontrol/cartcontrol.vue';
	import food from '@/components/food/food'
	const ERR_OK = 0;
	export default {
		props: {
			sellera: {
				type: Object
			}
		},
		data() {
			return {
				goods: [],
				listHeight: [],
				scrollY: 0,
				selectedFood: {}
			}
		},
		computed: {
			currentIndex() {
				for(let i = 0; i < this.listHeight.length; i++) {
					//判断当currentIndex在height1和height2之间的时候显示
					let height1 = this.listHeight[i];
					let height2 = this.listHeight[i + 1];
					//最后一个区间没有height2
					if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
						this._followScroll(i);
						return i;
					}
					//if(this.scrollY>=height1 && this.scrollY<height2){ 其实这么写也是正确的, 数字 && undefind 返回的是false; true &&false 返回的还是false
					//console.log(!height2)
					//	return i;						
					//}
				}
				return 0;
			},
			selectFoods() {
				let foods = [];
				this.goods.forEach(function(good) {
					good.foods.forEach((food) => {
						if(food.count) {
							
							foods.push(food);
						}
					});
				});
				return foods;
			}
		},
		created() {
			this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'] //后台返回的type索引是什么，数组就选中什么
			this.$http.get('/api/goods').then((res) => {
				res = res.body;
				if(res.errno === ERR_OK) {
					this.goods = res.data;
					console.log();
					this.$nextTick(function() {
						this._initScroll();
						this._calculateHeight();
					})
				}
			})
		},
		methods: {
			addFood(target) {
				this._drop(target)
			},
			_drop(target) {
				// 体验优化,异步执行下落动画
				this.$nextTick(() => {
					this.$refs.shopcart.drop(target);
				});
			},
			selectMenu(index, event) {
				if(!event._constructed) { // //如果不存在这个属性,则不执行下面的函数 防止pc点击切换两次
					return;
				}
				let foodList = this.$refs.foodList;
				let el = foodList[index];
				this.foodsScroll.scrollToElement(el, 300)
			},
			selectFood(food, event) {
				if(!event._constructed) { // //如果不存在这个属性,则不执行下面的函数 防止pc点击切换两次
					return;
				}
				this.selectedFood = food;
				this.$refs.food.show(); //父组件里面通过ref调用子组件方法
			},
			_initScroll() {
				this.meunScroll = new BScroll(this.$refs.menuWrapper, {
					click: true
				});
				this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
					click: true,
					probeType: 3 //传递类型，告诉插件需要实时检测高度坐标

				});
				this.foodsScroll.on('scroll', (pos) => {
					// 判断滑动方向，避免下拉时分类高亮错误（如第一分类商品数量为1时，下拉使得第二分类高亮）
					if(pos.y <= 0) {
						this.scrollY = Math.abs(Math.round(pos.y)); //取整 ，并且取正值
					}
				});
			},
			_calculateHeight() {
				let foodList = this.$refs.foodList;
				let height = 0;
				this.listHeight.push(height);
				for(let i = 0; i < foodList.length; i++) {
					let item = foodList[i];
					height += item.clientHeight;
					this.listHeight.push(height);
				}
			},
			_followScroll(index) {
				let menuList = this.$refs.menuList;
				let el = menuList[index];
				//scrollToElement(el, time, offsetX, offsetY, easing)滚动到某个元素，el（必填）表示 dom 元素，time 表示动画时间，offsetX 和 offsetY 表示坐标偏移量，easing 表示缓动函数
				this.meunScroll.scrollToElement(el, 300, 0, -200);
			}
		},
		components: {
			shopcart,
			cartcontrol,
			food
		}
	}
</script>

<style scoped="scoped">
	.goods {
		display: flex;
		position: absolute;
		width: 100%;
		bottom: 0.92rem;
		top: 3.5rem;
		overflow: hidden;
	}
	
	.menu-wrapper {
		flex: 0 0 1.6rem;
		width: 1.6rem;
		background: #F3F5F7;
	}
	
	.menu-item {
		width: 100%;
		display: table;
		height: 1.08rem;
		border-bottom: 0.5px solid rgba(7, 12, 27, 0.1);
		margin: 0 auto
	}
	
	.current {
		position: relative;
		z-index: 10;
		margin-top: -1px;
		background-color: #FFFFFF;
		font-weight: 700;
		border: none;
	}
	
	.current .text {
		font-weight: 700;
		color: #07111b;
	}
	
	.text {
		display: table-cell;
		padding: 0 0.24rem;
		font-size: 0.24rem;
		color: #07111b;
		line-height: 0.28rem;
		vertical-align: middle;
	}
	
	.icon {
		display: inline-block;
		vertical-align: top;
		width: 0.32rem;
		height: 0.32rem;
		background-size: 0.32rem, 0.32rem;
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	
	.decrease {
		background-image: url(decrease_2@2x.png);
	}
	
	.discount {
		background-image: url(discount_2@2x.png);
	}
	
	.guarantee {
		background-image: url(guarantee_2@2x.png);
	}
	
	.invoice {
		background-image: url(invoice_2@2x.png);
	}
	
	.special {
		background-image: url(special_2@2x.png);
	}
	
	.foods-wrapper {
		flex: 1;
	}
	
	.title {
		padding-left: 0.28rem;
		height: 0.52rem;
		line-height: 0.52rem;
		border-left: 0.04rem solid #d9dde1;
		font-size: 0.24rem;
		color: rgb(147, 153, 159);
		background: #F3F5F7;
	}
	
	.food-item {
		display: flex;
		margin: 0.36rem;
		padding-bottom: 0.36rem;
		border-bottom: 0.5px solid rgba(7, 17, 27, 0.1);
	}
	
	.food-item:last-child {
		border: none;
	}
	
	.food-item .icon {
		flex: 0 0 1.12rem;
		margin-right: 0.2rem;
	}
	
	.icon img {
		width: 1.12rem;
		height: 1.14rem;
	}
	
	.content {
		flex: 1;
		position: relative;
	}
	
	.name {
		margin: 0.04rem 0 0.16rem 0;
		line-height: 0.28rem;
		font-size: 0.28rem;
		color: rgb(7, 17, 27);
	}
	
	.now {
		color: red;
	}
	
	.desc,
	.extra {
		line-height: 0.2rem;
		font-size: 0.2rem;
		color: rgb(147, 153, 159)
	}
	
	.extra {
		margin: 0.16rem 0;
	}
	
	.cartControl-wrapper {
		position: absolute;
		right: 0;
		bottom: -0.15rem;
	}
</style>