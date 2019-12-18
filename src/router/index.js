import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Regist from '../components/Regist'
import Search from '../components/search/Search'
import Write from '../components/write/Write'
import Index from '../components/index/index'
import Admin from '../components/admin/me/Admin'
import PaperListRecommend from '../components/paperList/PaperListRecommend'
// eslint-disable-next-line camelcase
import PaperListSearch_author from '../components/paperList/PaperListSearch_author'
// eslint-disable-next-line camelcase
import PaperListSearch_keyword from '../components/paperList/PaperListSearch_keyword'
import Paper from '../components/Paper/Paper'
import PaperListType from '../components/paperList/PaperListType'
import MyProfile from '../components/admin/me/myprofile/MyProfile'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      redirect: '/index/PaperList/listRecommend',
      children: [
        {
          path: '/index',
          name: 'Index',
          component: Index,
          children: [
            {
              path: 'PaperList/listRecommend',
              name: 'PaperListRecommend',
              component: PaperListRecommend
            },
            {
              path: 'PaperList/:PaperType',
              name: 'PaperListType',
              component: PaperListType
            },
            {
              path: 'Paper/:PaperNo',
              name: 'Paper',
              component: Paper
            }
          ]
        },
        {
          path: '/search',
          name: 'Search',
          component: Search,
          children: [
            {
              path: 'listSearch/:input',
              name: 'PaperlistSearch_author',
              component: PaperListSearch_author
            },
            {
              path: 'listSearch1/:input',
              name: 'PaperlistSearch_keyword',
              component: PaperListSearch_keyword
            }
          ]
        },
        {
          path: '/write',
          name: 'Write',
          component: Write,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/admin',
          name: 'Admin',
          component: Admin,
          redirect: '/admin/myProfile',
          meta: {
            requireAuth: true
          },
          children: [
            {
              path: 'myProfile',
              name: 'MyProfile',
              component: MyProfile,
              meta: {
                requireAuth: true
              }
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/regist',
      name: 'Regist',
      component: Regist
    }
  ]
})
