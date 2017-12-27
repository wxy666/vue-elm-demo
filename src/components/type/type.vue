<template>
	<span class="icon" :class="classMap[sellera.supports[index].type]"></span>
</template>
<script>
	export default{
		props:{
			sellera:{
				type:Object
			},
			index:{
				type:Number
			}
		},
		created() {
			this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'] //后台返回的type索引是什么，数组就选中什么
		}
	}
</script>

<style>
	.icon {
		display: inline-block;
		vertical-align: top;
		width: 0.32rem;
		height: 0.32rem;
		background-size: 0.32rem, 0.32rem;
		background-repeat: no-repeat;
		margin-top: -0.06rem;
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
</style>