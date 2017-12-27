<template>
	<div class="ratings" ref="ratings">
		<div class="ratings-content">
			<div class="overview">
				<div class="overview-left">
					<h1 class="score">{{sellera.score}}</h1>
					<div class="title">综合评分</div>
					<div class="rank">高于周边商家{{sellera.rankRate}}%</div>
				</div>
				<div class="overview-right">
					<div class="score-wrapper">
						<span class="title">服务态度</span>
						<star :size="36" :score="sellera.score"></star>
						<div class="score">{{ sellera.serviceScore }}</div>
					</div>
					<div class="score-wrapper two">
						<span class="title">商品评分</span>
						<star :size="36" :score="sellera.foodScore"></star>
						<div class="score">{{ sellera.foodScore }}</div>
					</div>
					<div class="delivery-wrapper">
						<span class="title">送达时间</span>
						<span class="delivery">{{sellera.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<split></split>
			<ratingselect @select="selectRating" @toggle="toggleContent" :selectType="selectType" :onlyContent="onlyContent" :ratings="ratings"></ratingselect>
			<div class="rating-wrapper">
				<ul>
					<li v-for="rating in ratings" v-show="needShow(rating.rateType, rating.text)" class="rating-item">
						<div class="avatar">
							<img :src="rating.avatar" alt="" />
						</div>
						<div class="content">
							<h1 class="name">{{rating.username}}</h1>
							<div class="star-wrapper">
								<star :size="24" :score="rating.score"></star>
								<span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
							</div>
							<p class="text">{{rating.text}}</p>
							<div class="recommend" v-show="rating.recommend && rating.recommend.length">
								<span class="iconfont" :class="{'icon-dianzan_leave':rating.rateType===0,'icon-cai':rating.rateType===1 }"></span>
								<span class="item" v-for="item in rating.recommend">{{item}}</span>
							</div>
							<div class="time">
								{{rating.rateTime | formatDate}}
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	import { formatDate } from '@/common/js/date';
	import star from '@/components/star/star';
	import ratingselect from '@/components/ratingselect/ratingselect';
	import split from '@/components/split/split';

	const ALL = 2
	const ERR_OK = 0
	export default {
		props: {
			sellera: {
				type: Object
			}
		},
		data() {
			return {
				ratings: [],
				selectType: ALL,
				onlyContent: true
			}
		},
		created() {
			this.$http.get('/api/ratings').then((response) => {
				response = response.body;
				console.log(response)
				if(response.errno === ERR_OK) {
					this.ratings = response.data;
					this.$nextTick(() => {
						this.scroll = new BScroll(this.$refs.ratings, {
							click: true
						});
					});
				}
			})
		},
		methods: {
			selectRating(type) {
				this.selectType = type;
				this.$nextTick(() => {
					this.scroll.refresh();
				})
			},
			toggleContent() {
				this.onlyContent = !this.onlyContent;
				this.$nextTick(() => {
					this.scroll.refresh();
				})
			},
			needShow(type, text) {
				if(this.onlyContent && !text) {
					return false;
				}
				if(this.selectType === ALL) {
					return true;
				} else {
					return type === this.selectType;
				}
			}
		},
		filters: {
			formatDate(time) {
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm');
			}
		},
		components: {
			star,
			split,
			ratingselect
		}
	}
</script>

<style scoped="scoped">
	.ratings {
		position: absolute;
		top: 3.49rem;
		left: 0;
		bottom: 0;
		width: 100%;
		overflow: hidden;
	}
	
	.overview {
		display: flex;
		padding: 0.36rem 0;
	}
	
	.overview-left {
		flex: 0 0 2.75rem;
		width: 2.75rem;
		text-align: center;
		border-right: 0.01rem solid rgba(7, 17, 27, 0.1);
	}
	
	.overview-left h1 {
		font-size: 0.48rem;
		color: rgb(255, 153, 0);
		line-height: 0.56rem;
	}
	
	.overview-left .title {
		font-size: 0.24rem;
		color: rgb(7, 17, 27);
		line-height: 0.36rem;
		padding: 0.12rem 0 0.16rem 0;
	}
	
	.overview-left .rank {
		font-size: 0.2rem;
		color: rgb(147, 153, 159);
		line-height: 0.2rem;
		margin-bottom: 0.12rem;
	}
	
	.overview-right {
		flex: 1;
		padding: 0.06rem 0 0.06rem 0.48rem;
	}
	
	.score-wrapper {
		font-size: 0
	}
	
	.score-wrapper .title {
		display: inline-block;
		font-size: 0.24rem;
		color: rgb(7, 17, 27);
		line-height: 0.36rem;
	}
	
	.star {
		display: inline-block;
		vertical-align: top;
		margin-top: 2px;
		padding: 0 0.2rem;
	}
	
	.score-wrapper .score {
		display: inline-block;
		font-size: 0.24rem;
		color: rgb(255, 153, 0);
		line-height: 0.36rem;
	}
	
	.two {
		padding: 0.16rem 0;
	}
	
	.delivery-wrapper .title {
		font-size: 0.24rem;
		color: rgb(255, 153, 0);
		line-height: 0.24rem;
	}
	
	.delivery-wrapper .delivery {
		font-size: 0.24rem;
		color: rgb(147, 153, 159);
		line-height: 0.36rem;
		margin-left: 0.12rem;
	}
	
	.rating-wrapper {
		padding: 0 0.36rem;
	}
	
	.rating-item {
		display: flex;
		padding: 0.36rem 0;
		border-bottom: 0.5px solid rgba(7, 17, 27, 0.1);
	}
	
	.avatar {
		flex: 0 0 0.56rem;
		width: 0.56rem;
		margin-right: 0.24rem;
	}
	
	.avatar img {
		width: 0.56rem;
		height: 0.56rem;
		border-radius: 50%;
	}
	
	.content {
		position: relative;
		flex: 1;
	}
	
	.name {
		margin-bottom: 0.08rem;
		line-height: 0.24rem;
		font-size: 0.2rem;
		color: rgb(7, 17, 27);
	}
	
	.star-wrapper {
		margin-bottom: 0.12rem;
		font-size: 0;
	}
	
	.star-wrapper .star {
		display: inline-block;
		margin-right: 0.12rem;
		vertical-align: top;
		padding: 0;
	}
	
	.delivery {
		display: inline-block;
		vertical-align: top;
		line-height: 0.24rem;
		font-size: 0.2rem;
		color: rgb(147, 153, 159);
	}
	
	.text {
		margin-bottom: 0.16rem;
		line-height: 0.36rem;
		color: rgb(7, 17, 27);
		font-size: 0.24rem;
	}
	
	.recommend {
		line-height: 0.32rem;
		font-size: 0;
	}
	
	.icon-dianzan_leave,
	.item {
		display: inline-block;
		margin: 0 0.16rem 0.08rem 0;
		font-size: 0.18rem;
	}
	
	.iconfont {
		font-size: 0.24rem;
	}
	
	.icon-dianzan_leave {
		color: rgb(0, 160, 220);
	}
	
	.item {
		padding: 0 0.12rem;
		border: 1px solid rgba(7, 17, 27, 0.1);
		border-radius: 0.02rem;
		color: rgb(147, 153, 159);
		background: #fff;
	}
	
	.time {
		position: absolute;
		top: 0;
		right: 0;
		line-height: 0.24rem;
		font-size: 0.2rem;
		color: rgb(147, 153, 159);
	}
</style>