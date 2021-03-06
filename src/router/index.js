import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '../components/Login'
import Regist from '../components/Regist'
import Search from '../components/search/Search'
import Write from '../components/write/Write'
import Index from '../components/index/index'
import Admin from '../components/admin/me/Admin'
import AdminOthers from '../components/admin/others/Admin'
import PaperListRecommend from '../components/paperList/PaperListRecommend'
import PaperListFollow from '../components/Paper/PaperListFollow'
import PaperListSearch_author from '../components/paperList/PaperListSearch_author'
import PaperListSearch_keyword from '../components/paperList/PaperListSearch_keyword'
import UserSearch from '../components/user/UserSearch'
import Paper from '../components/Paper/Paper'
import PaperListType from '../components/paperList/PaperListType'
import MyPaper from '../components/admin/me/myPaper/MyPaper'
import MyFollower from '../components/admin/me/myfollower/MyFollower'
import MyFollowing from '../components/admin/me/myfollowing/MyFollowing'
import MyProfile from '../components/admin/me/myprofile/MyProfile'
import OthersPaper from '../components/admin/others/othersPaper/OthersPaper'
import OthersFavor from '../components/admin/others/othersfavor/OthersFavor'
import OthersProfile from '../components/admin/others/othersprofile/OthersProfile'
import OthersFollowing from '../components/admin/others/othersfollowing/OthersFollowing'
import OthersFollower from '../components/admin/others/othersfollower/OthersFollower'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
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
              path: 'PaperList/listFollow',
              name: 'PaperListFollow',
              component: PaperListFollow,
              meta: {
                requireAuth: true
              }
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
            },
            {
              path: 'userSearch/:input',
              name: 'UserSearch',
              component: UserSearch
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
              path: 'myPaper',
              name: 'MyPaper',
              component: MyPaper,
              meta: {
                requireAuth: true
              }
            },
            {
              path: 'myFollower',
              name: 'MyFollower',
              component: MyFollower,
              meta: {
                requireAuth: true
              }
            },
            {
              path: 'myFollowing',
              name: 'MyFollowing',
              component: MyFollowing,
              meta: {
                requireAuth: true
              }
            },
            {
              path: 'myProfile',
              name: 'MyProfile',
              component: MyProfile,
              meta: {
                requireAuth: true
              }
            },
            {
              path: 'myFavor',
              name: 'MyFavor',
              component: PaperListFollow,
              meta: {
                requireAuth: true
              }
            }
          ]
        }
      ]
    },
    {
      path: '/user/:username',
      name: 'AdminUser',
      component: AdminOthers,
      meta: {
        requireAuth: false
      },
      children: [
        {
          path: 'othersPaper',
          name: 'OthersPaper',
          component: OthersPaper
        },
        {
          path: 'othersFollower',
          name: 'OthersFollower',
          component: OthersFollower
        },
        {
          path: 'othersFollowing',
          name: 'OthersFollowing',
          component: OthersFollowing
        },
        {
          path: 'othersProfile',
          name: 'OthersProfile',
          component: OthersProfile
        },
        {
          path: 'othersFavor',
          name: 'OthersFavor',
          component: OthersFavor
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
