<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img :src="sellera.avatar" />
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{ sellera.name }}</span>
				</div>
				<div class="description">
					{{ sellera.description }}/{{ sellera.deliveryTime }}分钟送达
				</div>
				<!--//为什么要用 v-if判断，因为数据是ajax异步获取，而此时子组建的seller还是空的，没渲染，v-if为true才会渲染-->
				<div v-if="sellera.supports" class="support">
					<type :sellera="sellera" :index="0"></type>
					<span class="text">{{ sellera.supports[0].description }}</span>
				</div>
			</div>
			<div v-if="sellera.supports" class="support-count">
				<span class="count">
					{{ sellera.supports.length }}个
				</span>
				<i class="icon-right" @click="showDetail()">></i>
			</div>
		</div>
		<div class="bulletin-wrapper">
			<span class="bulletin-title"></span>
			<span class="bulletin-text">{{ sellera.bulletin }}</span>
			<i class="icon-right">></i>
		</div>
		<div class="background">
			<img :src="sellera.avatar" />
		</div>
		<transition name='fade'>
			<div v-show="detailShow" class="detail">
				<div class="detail-wrapper clearfix">
					<div class="detail-main">
						<h1 class="name">{{ sellera.name }}</h1>
						<div class="star-wrapper">
							<star :size="48" :score="sellera.score"></star>
						</div>
						<div class="title">
							<div class="line">

							</div>
							<div class="text">
								优惠信息
							</div>
							<div class="line">

							</div>
						</div>
						<ul v-if="sellera.supports" class="supports">
							<li class="support-item" v-for="(item,index) in sellera.supports">
								<type :sellera="sellera" :index="index"></type>
								<span class="text">{{sellera.supports[index].description}}</span>
							</li>
						</ul>
						<div class="title">
							<div class="line">

							</div>
							<div class="text">
								商家公告
							</div>
							<div class="line">

							</div>
						</div>
						<div class="information">
							{{ sellera.bulletin }}
						</div>
					</div>
				</div>
				<div class="detail-close">
					<i @click="hideDetail()">x</i>
				</div>
			</div>
		</transition>
	</div>
</template>

<script type="text/ecmascript-6">
	import star from '@/components/star/star';
	import type from '@/components/type/type'
	export default {
		props: { //sellera对象通过props传递给子组件header
			sellera: {
				type: Object
			}
		},
		data() {
			return {
				detailShow: false
			}
		},
		methods: {
			showDetail() {
				this.detailShow = true
			},
			hideDetail() {
				this.detailShow = false
			}
		},
		components: {
			star,
			type
		}
	}
</script>

<style scoped="scoped">
	.header {
		width: 100%;
		color: #FFFFFF;
		position: relative;
		background-color: rgba(7, 17, 27, 0.5);
		overflow: hidden;
	}
	
	.content-wrapper {
		padding: 0.48rem 0.24rem 0.36rem 0.48rem;
		font-size: 0;
		position: relative;
	}
	
	.avatar {
		display: inline-block;
		vertical-align: top;
	}
	
	.avatar img {
		width: 1.28rem;
		height: 1.28rem;
		border-radius: 0.04rem;
	}
	
	.content {
		display: inline-block;
		margin-left: 0.426666rem;
	}
	
	.title {
		margin: 0.04rem 0 0.16rem 0;
	}
	
	.title .brand {
		display: inline-block;
		vertical-align: top;
		width: 0.6rem;
		height: 0.36rem;
		background: url(brand@2x.png) no-repeat center left;
		background-size:100% 100%;
	}
	
	.title .name {
		font-size: 0.32rem;
		color: rgb(255, 255, 255);
		font-weight: bold;
		line-height: 0.36rem;
		margin-left: 0.12rem;
	}
	
	.description {
		font-size: 0.24rem;
		font-weight: 200;
		color: rgb(255, 255, 255);
		line-height: 0.24rem;
		margin-top: 0;
	}
	
	.support {
		margin-top: 0.2rem;
	}	
	
	.support .text {
		font-size: 0.2rem;
		color: rgb(255, 255, 255);
		font-weight: 200;
		line-height: 0.2rem;
		margin-left: 0.08rem;
	}
	
	.support-count {
		position: absolute;
		right: 0.24rem;
		bottom: 0.36rem;
		padding: 0 0.32rem;
		height: 0.64rem;
		line-height: 0.64rem;
		border-radius: 0.373333rem;
		background: rgba(0, 0, 0, 0.2);
	}
	
	.count {
		font-size: 0.2rem;
		vertical-align: top;
	}
	
	.support-count .icon-right {
		font-size: 0.24rem;
		display: inline-block;
	}
	
	.bulletin-wrapper {
		height: 0.56rem;
		padding: 0 0.44rem 0 0.24rem;
		background: rgba(7, 17, 27, 0.2);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		position: relative;
	}
	
	.bulletin-title {
		display: inline-block;
		vertical-align: top;
		width: 0.44rem;
		height: 0.24rem;
		margin-top: 0.15rem;
		background: url(bulletin@2x.png) no-repeat center center;
		background-size: 100% 100%;
	}
	
	.bulletin-text {
		font-size: 0.2rem;
		font-weight: 200;
		line-height: 0.56rem;
		margin-left: 0.08rem;
		margin-right: 0.08rem;
	}
	
	.bulletin-wrapper .icon-right {
		position: absolute;
		right: 0.32rem;
		margin-top: 0.15rem;
	}
	
	.background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		filter: blur(10px);
		z-index: -1;
	}
	
	.background img {
		width: 100%;
		height: 100%;
	}
	/*弹框*/
	
	.detail {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
		width: 100%;
		height: 100%;
		overflow: auto;
		opacity: 1;
		background: rgba(7, 17, 27, 0.8);
	}
	
	.fade-enter-active,
	.fade-leave-active {
		transition: all 0.5s
	}
	
	.fade-enter,
	.fade-leave-to {
		opacity: 0;
		background: rgba(7, 17, 27, 0);
	}
	
	.detail-wrapper {
		width: 100%;
		min-height: 100%;
	}
	
	.detail-main {
		margin-top: 1.28rem;
		padding-bottom: 1.32rem;
	}
	
	.detail-close {
		position: relative;
		width: 0.4rem;
		height: 0.4rem;
		margin: -1.64rem auto 0.64rem auto;
		clear: both;
		font-size: 0.64rem;
	}
	
	.name {
		line-height: 0.32rem;
		text-align: center;
		font-size: 0.32rem;
		font-weight: 700;
	}
	
	.star-wrapper {
		margin-top: 0.32rem;
	}
	/*flex 布局*/
	
	.detail-main .title {
		display: flex;
		width: 80%;
		margin: 0.56rem auto 0.48rem auto;
	}
	
	.title .line {
		flex: 1;
		position: relative;
		top: -0.15rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.2);
	}
	
	.title .text {
		padding: 0 0.24rem;
		font-weight: 700;
		font-size: 0.28rem;
		line-height: 0.28rem;
	}
	
	.supports {
		width: 80%;
		margin: 0 auto;
	}
	
	.supports li {
		margin-bottom: 0.24rem;
	}
	
	.supports .text {
		font-size: 0.24rem;
		color: rgb(255, 255, 255);
		font-weight: 200;
		line-height: 0.24rem;
		vertical-align: top;
	}
	
	.information {
		width: 71%;
		margin: 0 auto;
		font-size: 0.24rem;
		font-weight: 200;
		line-height: 0.48rem;
	}
</style>