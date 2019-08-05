import Vue from 'vue'
import noticeTips from './noticeTips.vue'

const NoticeTips  = Vue.extend(noticeTips);

// let showNotice = false;

const Notice = () => {

	// if(showNotice) {return}
	// else {showNotice = true;}

	const NoticeInstance = new NoticeTips({
		data:{}
	})

	NoticeInstance.vm = NoticeInstance.$mount()	// $mount 返回vue组件实例本身

	document.body.appendChild(NoticeInstance.vm.$el)
}

export default {
	install:Vue => {
		Vue.prototype.$Logout = Notice;
	}
}


