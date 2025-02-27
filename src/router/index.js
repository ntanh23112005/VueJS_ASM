import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/views/Index.vue';
import Login from '@/views/Login.vue';
import Detail from '@/views/Detail.vue';
import Register from '@/views/Register.vue';
import CreatePost from '@/views/CreatePost.vue';
import Swal from 'sweetalert2';
import ChangePass from '@/views/ChangePass.vue';
const isAuthenticated = !!localStorage.getItem('logUser');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Index,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/createPost',
      name: 'createPost',
      component: CreatePost,
      meta: { requiresAuth: true },
    },
    {
      path: '/detailNews/:id',
      name: 'DetailPost',
      component: Detail,
    },
    {
      path:'/changePass',
      name: 'ChangePass',
      component: ChangePass,
      meta: {requiresAuth: true},
    }
  ],
})


router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
    Swal.fire({
      icon: 'error',
      title: 'Thất bại!',
      text: 'Bạn phải đăng nhập để tiếp tục',
      confirmButtonText: 'OK'
    }).then(() => {
      next({ name: "Login" });
    });
  } else {
    next(); // Cho phép tiếp tục điều hướng
  }
});



export default router
