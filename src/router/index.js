import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Lazyout from '../views/lazyout/Lazyout.vue'


Vue.use(VueRouter)

const routes = [

  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/register/Register.vue'),
    meta: {
      title: '注册'
    }
  }, {
    path: '/city',
    name: 'City',
    component: () => import('../views/city/City.vue'),
    meta: {
      title: '城市'
    }
  },
  {
    path: '/setup',
    name: 'Setup',
    component: () => import('../views/setup/Setup.vue'),
    meta: {
      title: '设置修改个人信息'
    }
  },
  {
    path: '/evaluate',
    name: 'Evaluate',
    component: () => import('../views/evaluate/Evaluate.vue'),
    meta: {
      title: '评价中心'
    }
  },
  {
    path: '/comment',
    name: 'Comment',
    component: () => import('../views/comment/Comment.vue'),
    meta: {
      title: '发表评论'
    }
  },
  {
    path: '/commentdetails',
    name: 'Commentdetails',
    component: () => import('../views/commentDetails/CommentDetails.vue'),
    meta: {
      title: '发表评论'
    }
  },




  {
    path: '/details',
    name: 'Details',
    component: () => import('../views/details/Details.vue'),
    meta: {
      title: '详情'
    }
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('../views/order/Order.vue'),
    meta: {
      title: '已完成和全部订单'
    }
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: () => import('../views/favorites/Favorites.vue'),
    meta: {
      title: '收藏商品'
    }
  },
  {
    path: '/settlement',
    name: 'Settlement',
    component: () => import('../views/settlement/Settlement.vue'),
    meta: {
      title: '结算'
    }
  },

  {
    path: '/address',
    name: 'Address',
    component: () => import('../views/address/Address.vue'),
    meta: {
      title: '地址列表'
    }
  },

  {
    path: '/newaddress',
    name: 'Newaddress',
    component: () => import('../views/newaddress/Newaddress.vue'),
    meta: {
      title: '编辑地址'
    }
  },
  {
    path: '/browse',
    name: 'Browse',
    component: () => import('../views/browse/Browse.vue'),
    meta: {
      title: '最近浏览'
    }
  },
  {
    path: '', //父路由
    component: Lazyout,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
          title: '首页'
        }
      },
      {
        path: '/classification',
        name: 'Classification',
        component: () => import('../views/classification/Classification.vue'),
        meta: {
          title: '分类'
        }
      },
      {
        path: '/cart',
        name: 'Cart',
        component: () => import('../views/cart/Cart.vue'),
        meta: {
          title: '购物车'
        }
      }, {
        path: '/my',
        name: 'my',
        component: () => import('../views/my/My.vue'),
        meta: {
          title: '我的'
        }
      }

    ]
  },
  {
    path: '*',
    name: '',
    component: () => import('../views/404/404.vue'),
    meta: {
      title: 'mall'
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
  let user = localStorage.getItem('name')
  if (user) {
    next()
  } else {
    if (to.path === '/' || to.path === '/details' || to.path === '/register' || to.path === '/city' || to.path === '/classification' || to.path === '/cart' || to.path === '/my') {
      next()
    } else {
      next('/')
    }
  }

})
export default router
