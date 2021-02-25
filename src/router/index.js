import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap } from './router.config.js'

// hack router push callback
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

const createRouter = () =>
  new Router({
    // 新增base配置 解决项目名称问题
    //base: '/vuem',
    mode: 'history', // 如果你是 history模式 需要配置vue.config.js publicPath
    // base: process.env.BASE_URL,
    //如果keepAlive的话，返回时定位在原来的位置
    scrollBehavior (to, from, savedPosition) {
       if (savedPosition) {
        return savedPosition
      } else {
        if (from.meta.keepAlive) {
          from.meta.savedPosition = document.body.scrollTop;
        }
        return { x: 0, y: to.meta.savedPosition ||0}
      }
    },
    routes: constantRouterMap
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
