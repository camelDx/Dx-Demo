<template>
	<div class="xx_warpper">
		<div class="xx_body">
			<div class="tips_box">
				<p>
					<img src="../../../assets/icons/finish.png">
				</p>
				<p>密码修改成功</p>
				<p class="time">{{num}}s</p>
				<p><span class="btn" @click.stop="logout">立即登录</span></p>
			</div>
		</div>
	</div>
</template>
<script>
import {logout} from 'api/login'
import {removeToken} from 'auth'
export default {
	data(){
		return {
			timer:'',
			num:3
		}
	},
	methods:{
		loading(){
			var self = this;
			this.timer = setInterval(()=>{
				if( self.num <= 1 ){
					self.logout()
				}else{
					self.num -= 1;
				}
			},1000)
		},
		clear(){
			removeToken();
			localStorage.clear();
			this.$destroy();
			this.$el.parentNode.removeChild(this.$el);
			location.reload();
		},
		logout(){
			clearInterval( this.timer )
			logout().then(()=>{
				this.clear()
			}).catch(e=>{
				this.clear()
			})
		}
	},
	mounted(){
		this.loading()
	}
}
</script>
<style lang="scss" scoped>
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
		.tips_box{
			position: absolute;
			top:40%;
			left:50%;
			width:18rem;
			min-height:12rem;
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
