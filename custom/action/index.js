import Vue from 'vue'
import actionTips from './actionTips.vue'

const ActionTips = Vue.extend(actionTips)

const action = (args={}) =>{
	const ActionInstance = new ActionTips({
		data:args
	}) 

	ActionInstance.vm = ActionInstance.$mount()

	document.body.appendChild(ActionInstance.vm.$el);

}

export default {
	install:Vue => {
		Vue.prototype.$actionTips = action;
	}
}