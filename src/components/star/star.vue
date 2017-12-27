<template>
	<div class="star" :class="starType">
		<span v-for="(itemClasas,index) in itemClasses" :class="itemClasas" class="star-item" :bal="index"></span>
	</div>
</template>

<script>
	const LENGTH = 5; //总共五个星星的位置
	const CLS_ON = 'on';
	const CLS_HALF = 'half';
	const CLS_OFF = 'off';

	export default{
		props: {
			size: {
				type: Number
			},
			score: {
				type: Number
			}
		},
		computed: {
			starType() {
				return 'star-' + this.size;
			},
			itemClasses() {
				let result = [];
				//向下取整
				let score = Math.floor(this.score * 2) / 2;
				let hasDecimal = score % 1 !== 0;
				let integer = Math.floor(score); //全星
				for(let i = 0; i < integer; i++) {
					result.push(CLS_ON);
				}
				if(hasDecimal) { //半星
					result.push(CLS_HALF);
				}
				while(result.length < LENGTH) { //没有星星
					result.push(CLS_OFF);
				}
				return result;
			}
		}
	}
</script>

<style scoped="scoped">
	.star {
		font-size: 0;
		text-align: center;
	}
	
	.star .star-item {
		display: inline-block;
		background-repeat: no-repeat;
	}
	
	.star-48 .star-item {
		width: 0.4rem;
		height: 0.38rem;
		margin-right: 0.44rem;
		background-size: 0.4rem 0.38rem;
	}
	
	.star-48 .star-item:last-child {
		margin-right: 0;
	}
	
	.star-48 .on {
		background-image: url(star48_on@2x.png);
	}
	
	.star-48 .half {
		background-image: url(star48_half@2x.png);
	}
	
	.star-48 .off {
		background-image: url(star48_off@2x.png);
	}
	
	.star-36 .star-item {
		width: 0.3rem;
		height: 0.29rem;
		margin-right: 0.2rem;
		background-size: 0.3rem 0.29rem;
	}
	
	.star-36 .star-item:last-child {
		margin-right: 0;
	}
	
	.star-36 .on {
		background-image: url(star36_on@2x.png);
	}
	
	.star-36 .half {
		background-image: url(star36_half@2x.png);
	}
	
	.star-36 .off {
		background-image: url(star36_off@2x.png);
	}
	
	.star-24 .star-item {
		width: 0.2rem;
		height: 0.19rem;
		margin-right: 0.12rem;
		background-size: 0.2rem 0.19rem;
	}
	
	.star-24 .star-item:last-child {
		margin-right: 0;
	}
	
	.star-24 .on {
		background-image: url(star24_on@2x.png);
	}
	
	.star-24 .half {
		background-image: url(star24_half@2x.png);
	}
	
	.star-24 .off {
		background-image: url(star24_off@2x.png);
	}
</style>