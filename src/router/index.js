import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  ]
})
router.beforeEach(Check)

function Check(to, from, next)
{
  if(to.meta.authorized && sessionStorage.getItem("token")===null){
      next({
        path: '/login'
      })
  }
  if(to.meta.adminOnly && sessionStorage.getItem("role")!=="ADMIN"){
    next({
      path: from.path
    })
  }
  next()
}

export default router
