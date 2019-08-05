import Vue from 'vue'
import HoverTip from './HoverTip.vue'

let Tip = Vue.extend(HoverTip)
// 在body下插入全局的hoverTip
const globalDOM = document.querySelector('body').appendChild(new Tip({
    el: document.createElement('section')
}).$el)
// 用于控制弹框显示与隐藏
let timer = null

const config = {
    bind(el, binding) {
        // 将绑定值塞进组件内
        let toHTML = () => {
            // z用于判断binding.value值的嵌套层级
            let z = 0
            // value即binding.value
            return value => {
                z ++
                let html = ''
                if (value instanceof Array) {
                    let row = ''
                    // 因为z === 1且value为数组时，value只是最外层容器
                    // 所以z === 2且value为数组时，value是该行容器，需外套一层div
                    if (z === 2) {
                        let rowChild = ''
                        value.forEach(item => {
                            rowChild += toHTML(item)
                        })
                        row += `<div>${rowChild}</div>`
                    } else {
                        value.forEach(item => {
                            row += toHTML(item)
                        })
                    }
                    html = row
                } else if (value instanceof Object) {
                    let keys = Object.keys(value)
                    if (keys.length > 1) {
                        keys.forEach(key => {
                            html += `<p><span>${key}：</span>${value[key]}</p>`
                        })
                    } else {
                        html = `<p><span>${keys[0]}：</span>${value[keys[0]]}</p>`
                    }
                } else {
                    html = `<p>${value}</p>`
                }
                z = 0
                return html
            }
        }
        toHTML = toHTML()
        // 添加父级的mouseover事件改变显隐
        el.addEventListener('mouseover',e => {
            clearTimeout(timer)
            let val = toHTML(binding.value)
            globalDOM.innerHTML = val
            // 获取父节点在视口中的位置
            const clientRect = el.getBoundingClientRect()
            const top = clientRect.bottom
            const left = clientRect.left + clientRect.width/2
            // 获取屏幕高度大小，当hoverTip超出高度时向上摆放
            const windowHeight = window.innerHeight
            if (windowHeight > top + 80) {
                globalDOM.style.top = top + 'px'
                globalDOM.style.transform = 'translate(-50%,0)'
            } else {
                globalDOM.style.top = clientRect.top + 'px'
                globalDOM.style.transform = 'translate(-50%,-100%)'
            }
            globalDOM.style.left = left + 'px'
            globalDOM.__vue__.open()
        })
        el.addEventListener('mouseout',() => {
            timer = setTimeout(() => {
                globalDOM.__vue__.close()
            },100)
        })
    },
    unbind(el) {
        globalDOM.__vue__.close()
    }
}

export default config