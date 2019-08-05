<template>
	<!-- 自定义提示 $actionTips -->
	<div class="xx_warpper" @click.stop="close">
		<div :class="['xx_body',getIn?'get-enter':'get-out']">
			<div class="tips_box">
				<p>
					<img src="../../../assets/icons/finish.png">
				</p>
				<p>{{msg||'此处填写弹窗提示'}}</p>
				<p class="time">{{num}}s</p>
				<!-- <p><span class="btn" @click.stop="close">确定</span></p> -->
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data(){
		return {
			num:3,
			msg:'',
			type:'succ',
			getIn:true,
		}
	},
	mounted(){
		this.loading()
	},
	methods:{
		close(){
			clearInterval(this.timer);
			this.timer = null;
			this.getIn = false;
			
			var x = setTimeout(()=>{
				this.$el.parentNode.removeChild(this.$el);
				this.$destroy();
				clearTimeout(x)
			},350)
		},
		loading(){
			var self = this;
			this.timer = setInterval(()=>{
				if( self.num <= 1 ){
					self.close()
				}else{
					self.num -= 1;
				}
			},1000)
		}
	}
}
</script>
<style lang="scss" scoped>
@keyframes ui-dialog-fade-in {
	0% {
		transform: translate3d(0,-20px,0);
		opacity: 0
	}
	to {
		transform: translateZ(0);
		opacity: 1
	}
}

.get-enter {
	animation: ui-dialog-fade-in .25s
}

.get-out {
	transform: translate3d(0,-20px,0);
	opacity: 0
}
.xx_warpper{
	position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
	z-index:2001;
	background: rgba(0,0,0,0.5);
	.xx_body{
		position: relative;
		width:100%;
		height:100%;
		transition: all .25s;
		.tips_box{
			position: absolute;
			top:40%;
			left:50%;
			width:16rem;
			padding: 1rem 0;
			transform: translate(-50%,-50%);
			background: #fff;
			p{
				text-align: center;
				margin-bottom:1rem;
				color:#333;
				font-size:0.9rem;
				&.time{
					color:#999;
					margin-bottom:1.75rem;
				}
				&:last-child{
					margin-bottom: 0;
				}
				span.btn{
					cursor: pointer;
					color:#187ce3;
					text-decoration: underline;
				}
			}
		}
	}
}
</style>
