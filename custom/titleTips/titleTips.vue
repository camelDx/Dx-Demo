<template>
	<div v-show="show" class="x_title_tips">
		<div class="t_box">
			{{text}}
			<span :class="[pos]"></span>
		</div>
	</div>
</template>
<script>
export default {
	data(){
		return {
			show:false,
			pos:'top',
			text:''
		}
	},
	methods:{
		open(){
			this.show = true;
		},
		close(){
			this.show = false;
		}
	}
}
</script>
<style lang="scss" scoped>
.x_title_tips{
	position: fixed;
	background: rgba(0,0,0,0.55);
	border-radius: 5px;
	z-index:1000;
	height:35px;
	white-space: nowrap;
	font-size:14px;
	.t_box{
		position: relative;
		width:100%;
		height:100%;
		padding:8px 10px;
		.bottom{
			position: absolute;
			top:-10px;
			left:50%;
			transform: translateX(-50%);
			border-right: 8px solid transparent;
			border-left: 8px solid transparent;
			border-bottom:10px solid rgba(0,0,0,0.55);
		}
		.top{
			position: absolute;
			bottom:-10px;
			left:50%;
			transform: translateX(-50%);
			border-right: 8px solid transparent;
			border-left: 8px solid transparent;
			border-top:10px solid rgba(0,0,0,0.55);
		}
		.right{
			position: absolute;
			top:50%;
			left: -8px;
			transform: translateY(-50%);
			border-top: 8px solid transparent;
			border-bottom: 8px solid transparent;
			border-right:8px solid rgba(0,0,0,0.55);
		}
		.left{
			position: absolute;
			top:50%;
			right: -8px;
			transform: translateY(-50%);
			border-top: 8px solid transparent;
			border-bottom: 8px solid transparent;
			border-left:8px solid rgba(0,0,0,0.55);
		}
	}
}
</style>

