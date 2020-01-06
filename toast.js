let Toast = {}

Toast.install = function(Vue,options){
    let opt = {
        defaultType : 'center',// 弹出框位置
        duration: '1500' // 持续时间
    }
    for(let pro in options) {
       if(options.hasOwnProperty(key)){
           opt[pro] = options[pro]
       }
    }
    Vue.prototype.$toast = (tips,type)=>{
        if(type) {
            opt.defaultType = type
        }
        // 限制弹出的个数
        if(document.getElementsByClassName('vue-toast').length){
            return 
        }
        // 创建弹出框模板
        let toastTpl = Vue.extend({
            template: `<div class="vue-toast toast-${opt.defaultType}">${tips}</div>`
        })
        // 挂载到页面，先用$mount()挂载到内存，再获取$el
        let tpl = new toastTpl().$mount().$el
        document.body.appendChild(tpl)
        // 控制弹出框消失
        setTimeout(()=>{
            document.body.removeChild(tpl)
        },opt.duration)
        // 让调用this.$toast.top()的时候和this.$toast()一样的效果
        ['bottom','center','top'].forEach(type=>{
            Vue.prototype.$toast[type] = (tips)=>{
                return Vue.prototype.$toast(tips,type)
            }
        })
    }
}

export default Toast
