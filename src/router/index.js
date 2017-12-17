import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/pages/Index'
import EmployeeList from '../components/pages/EmployeeList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      component: Index,
      name: 'Index',
      path: '/'
    },
    {
      component: EmployeeList,
      name: 'EmployeeList',
      path: '/employees/:display?'
    }
  ]
})
