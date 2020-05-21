import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../components/Index.vue'
import Product from '../components/Product.vue'
import Course from '../components/Course.vue'
import CourseDetail from "../components/CourseDetail.vue"
import CoursePlay from "../components/CoursePlay.vue"
import Teacher from '../components/Teacher.vue'
import Community from '../components/Community.vue'
import NewsDetail from '../components/NewsDetail.vue'
import NewsArticle from '../components/NewsArticle.vue'
import Person from '../components/Person.vue'

import Test from '../components/Test.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/course',
    name: 'Course',
    component: Course
  },
  {
    path: '/courseDetail',
    name: 'CourseDetail',
    component: CourseDetail
  },
  {
    path: '/coursePlay',
    name: 'CoursePlay',
    component: CoursePlay
  },
  {
    path: '/teacher',
    name: 'Teacher',
    component: Teacher
  },
  {
    path: '/community',
    name: 'Community',
    component: Community
  },
  {
    path: '/newsDetail',
    name: 'NewsDetail',
    component: NewsDetail
  },
  {
    path: '/newsArticle',
    name: 'NewsArticle',
    component: NewsArticle
  },
  {
    path: '/product',
    name: 'Product',
	component:Product
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../components/Product.vue')
  },
  {
    path: '/person',
    name: 'Person',
    component: Person
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
