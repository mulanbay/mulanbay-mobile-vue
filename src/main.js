// 兼容 IE
// https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md#babelpolyfill
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 设置 js中可以访问 $cdn
import { $cdn } from '@/config'
Vue.prototype.$cdn = $cdn

// 设置 svg
import './assets/icons' // icon

//自定义主题
import 'vant/lib/index.less';

//本地图标库，vant默认是网络
import 'vant/lib/index.css';
import 'vant/lib/icon/local.css';

// 全局引入按需引入UI库 vant
import '@/plugins/vant'
// 引入全局样式
import '@/assets/css/index.scss'

// 移动端适配
import 'lib-flexible/flexible.js'

//全局方法
import {getEnumTree,getDictItemTree} from "@/api/common";
import {formatMoney} from "@/utils/index";
import {beautifyDateTime,beautifyDate} from "@/utils/datetime";

// 全局方法挂载
Vue.prototype.getEnumTree = getEnumTree
Vue.prototype.getDictItemTree = getDictItemTree
Vue.prototype.formatMoney = formatMoney
Vue.prototype.beautifyDateTime = beautifyDateTime
Vue.prototype.beautifyDate = beautifyDate

//图片匹配成功的最低匹配度
Vue.prototype.matchedRate = 0.98
Vue.prototype.windowHeight = window.screen.height+'px'
//日期选择的最小日期
Vue.prototype.calendarMinDate = new Date(1970, 0, 1)

//时间格式
Vue.prototype.dateFormat = 'yyyy-MM-dd'
Vue.prototype.dateTimeFormat = 'yyyy-MM-dd hh:mm:ss'

// filters
import './filters'
Vue.config.productionTip = false

//回到顶部
import BackToTop from 'vue-backtotop'
Vue.use(BackToTop)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
