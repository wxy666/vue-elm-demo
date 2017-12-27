<template>
	<div>
		<v-header :sellera="seller"></v-header>
		<div class="tab">
			<div class="tab-item">
				<router-link to="/goods">商品</router-link>
			</div>
			<div class="tab-item">
				<router-link to="/ratings">评论</router-link>
			</div>
			<div class="tab-item">
				<router-link to="/seller">商家</router-link>
			</div>
		</div>
		<keep-alive>
			<router-view :sellera="seller"></router-view>
		</keep-alive>
	</div>
</template>

<script>
	import header from '@/components/header/header.vue';
	const ERR_OK = 0;
	export default {
		data() {
			return {
				seller: {}
			}
		},
		mounted: function() {
			this.$http.get('/api/seller').then((res) => {
				console.log(res)
				res = res.body;
				if(res.errno === ERR_OK) {
					this.seller = res.data;
				}
			});
		},
		components: {
			'v-header': header
		}
	}
</script>

<style>
	.tab {
		display: flex;
		width: 100%;
		height: 0.8rem;
		line-height: 0.8rem;
		border-bottom: 0.5px solid rgba(7, 17, 27, 0.1);
	}
	
	.tab-item {
		flex: 1;
		text-align: center;
	}
	
	.tab-item a {
		display: block;
		font-size: 0.28rem;
		color: rgb(77, 85, 93);
	}
	
	.tab-item .router-link-active {
		color: red;
	}
</style>