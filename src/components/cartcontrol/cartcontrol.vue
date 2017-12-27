<template>
	<div class="cartcontrol">
		<transition name="move">
			<div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
				<span class="inner iconfont icon-asmkticon0223"></span>
			</div>
		</transition>
		<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
		<div class="cart-add iconfont icon-add" @click.stop.prevent="addCart"></div>
	</div>
</template>
<script>
	import Vue from 'vue';
	export default {
		props: {
			food: {
				type: Object
			}
		},
		created() {
//			console.log(this.food)
		},
		methods: {
			addCart(event) {
				if(!event._constructed) {
					return;
				}
				if(!this.food.count) {
					Vue.set(this.food, 'count', 1)
				} else {
					this.food.count++
				}
				this.$emit('add', event.target);
			},
			decreaseCart(event) {
				if(!event._constructed) {
					return;
				}
				if(this.food.count) {
					this.food.count--
				}
			}
		}
	}
</script>
<style scoped="scoped">
	.cartcontrol {
		font-size: 0;
	}	
	.cart-decrease {
		display: inline-block;
		opacity: 1;
      	transform: translate3d(0, 0, 0);
	}
	.inner{
		display: inline-block;
		font-size: 0.48rem;
		color: #00a0dc;
		padding: 0.16rem;
		line-height: 0.64rem;
		transition: all 0.4s linear;
        transform: rotate(0);
	}
	.move-enter-active,.move-leave-active{
		transition: all 0.4s linear;
	}
	.move-enter, .move-leave-to{
		opacity: 0;
		transform: translate3d(0.32rem,0,0);
	}
	.move-enter-active .inner,.move-leave-active .inner{
		transition: all 0.4s linear;
	}
	.move-enter .inner, .move-leave-to .inner{
		transform: rotate(180deg);
		
	}
	.cart-count {
		display: inline-block;
		font-size: 0.2rem;
		color: rgb(147, 153, 159);
		line-height: 0.48rem;
		vertical-align: top;
		width: 0.16rem;
		padding-top: 0.24rem;
	}
	
	.cart-add {
		display: inline-block;
		padding: 0.16rem;
		font-size: 0.48rem;
		color: #00a0dc;
		line-height: 0.64rem;
	}
</style>