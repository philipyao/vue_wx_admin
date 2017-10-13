import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

var menuObj = []
let menuInfo = window.localStorage.getItem('menuInfo');
if(menuInfo) {
    //取出缓存菜单
    menuObj = JSON.parse(menuInfo) || []
    //TODO 插入notfound页面
}


const router = new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: resolve => require(['@/components/Main'], resolve)
    },
    {
      path: '/example2',
      name: 'example2',
      component: resolve => require(['@/components/Example2'], resolve)
    },    
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/components/Login'], resolve)
    },
    {
      path: '/example/archives_material_create',
      name: 'mcreate',
      component: resolve => require(['@/views/archives/MaterialCreate'], resolve)
    },
    ...routeFromMenu(menuObj)
  ]
})

router.beforeEach((to, from, next) => {
    //获取用户是否登陆
    let menuInfo = window.localStorage.getItem('menuInfo')
    if (!menuInfo && to.path != '/login') {
        next({path: '/login'})
    } else if (to.path == '/login' && menuInfo) {
        next({path: '/'})
    }
    console.log("route to ", to.path)
    next()
})

export default router

//根据菜单生成对应的路由
export function routeFromMenu(menu = []) {
    let routes = []
    for (let item of menu){
        console.log("component: ", item.component)
        if(item.path && item.component) {
            let rt = {
                path: item.path,
                component: compo(item.component),
                meta: {
                    title: item.name,
                    navigation: item.navigation
                },
                children: []
            }
            for (let child of item.children) {
                rt.children.push({
                  path: child.path,
                  component: view(child.component)
                })
            }
            routes.push(rt)
        }
    }
    
    return routes      
}

function compo(name) {
  return resolve => require(['@/components/' + name + '.vue'], resolve)
}
function view(name) {
  return resolve => require(['@/views/' + name + '.vue'], resolve)
}
