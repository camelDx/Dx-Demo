import Vue from 'vue'
import titleTips from './titleTips.vue'

// 指令 v-titleTips = { direction:'',text:'' }
// direction: right left  top  bottom 	默认bottom
// text 提示语句
let Tips = Vue.extend(titleTips);

const config = {
	bind(el,binding){
		const t = new Tips({
			el:document.createElement('div'),
			data:{
				text:binding.value.text,
				pos:binding.value.direction||'bottom'
			}
		});

		el.instance = t;	//t是一个vue实例	el是指令元素
		el.tips = t.$el;	// vue.$el	dom元素

		el.onmouseover = function(e){
			// 获取指令元素相对浏览器得位置
			const pos = el.getBoundingClientRect()
			const xc = pos.left + pos.width/2;	//元素横向中心点
			const yc = pos.top + pos.height/2;	//元素纵向中心点
			//元素四个边框相对视口得距离	加减 三角 
			const left = pos.left - 15;	 		//左		
			const right = pos.right + 15;	//右
			const top = pos.top - 10 ;			//上
			const bottom = pos.bottom + 10;		//下

			switch(binding.value.direction){
				case 'bottom':
					el.tips.style.top = bottom + 'px';
					el.tips.style.left = xc + 'px';
					el.tips.style.transform = 'translateX(-50%)';
					break;
				case 'top':
					el.tips.style.top = top + 'px';
					el.tips.style.left = xc + 'px';
					el.tips.style.transform = 'translateX(-50%)';
					break;
				case 'right':
					el.tips.style.top = yc + 'px';
					el.tips.style.left = right + 'px';
					el.tips.style.transform = 'translateY(-50%)';
					break;
				case 'left':
					el.tips.style.top = yc + 'px';
					el.tips.style.left = left + 'px';
					el.tips.style.transform = 'translateY(-50%)';
					break;
				default:
					el.tips.style.top = bottom + 'px';
					el.tips.style.left = xc + 'px';
					el.tips.style.transform = 'translateX(-50%)'; 
			}
			el.instance.open();
			document.body.appendChild(el.tips)
		}	
		el.onmouseout = function(e){
			el.instance.close()
			document.body.removeChild(el.tips);
		}
	}
}

export default config;