import { createRouter, createWebHistory } from "vue-router";
import ProductList from "@/components/ProductList.vue";
import ProductAdd from "@/components/ProductAdd.vue";
import ProductEdit from "@/components/ProductEdit.vue";
import ProductDetail from "@/components/ProductDetail.vue";

import OrderList from "@/components/OrderList.vue";
import OrderAdd from "@/components/OrderAdd.vue";
import OrderEdit from "@/components/OrderEdit.vue";
import OrderDetail from "@/components/OrderDetail.vue";

import CustomerList from "@/components/CustomerList.vue";
import CustomerAdd from "@/components/CustomerAdd.vue";
import CustomerEdit from "@/components/CustomerEdit.vue";

import Statistics from "@/components/Statistics.vue";

import Home from '../views/Home.vue';
import Admin from '../views/Admin.vue';
import Login from '../views/Login.vue';
const routes = [
  // Quản lý sản phẩm
  { path: '/', name: 'Home', component: Home },
  { path: '/products',
    name: 'ProductList',
    component: ProductList,
    beforeEnter: (to, from, next) => {
      const role = localStorage.getItem('role');
      if (role === 'admin' || role === 'employee') {
        next();
      } else {
        alert("Bạn không có quyền truy cập vào trang này!");
        next('/');
      }
    }, },
  { path: "/products/add", component: ProductAdd },
  { path: "/products/edit/:id", component: ProductEdit },
  { path: "/products/:id", component: ProductDetail },

  // Quản lý đơn hàng
  { path: '/orders',
    name: 'OrderList',
    component: OrderList,
    beforeEnter: (to, from, next) => {
      const role = localStorage.getItem('role');
      if (role === 'admin' || role === 'employee') {
        next();
      } else {
        alert("Bạn không có quyền truy cập vào trang này!");
        next('/');
      }
    }, },
  { path: "/orders/add", component: OrderAdd },
  { path: "/orders/edit/:id", component: OrderEdit },
  { path: "/orders/:id", component: OrderDetail },

  { path: '/customers',
    name: 'CustomerList',
    component: CustomerList,
    beforeEnter: (to, from, next) => {
      const role = localStorage.getItem('role');
      if (role === 'admin' || role === 'employee') {
        next();
      } else {
        alert("Bạn không có quyền truy cập vào trang này!");
        next('/');
      }
    }, },
  { path: "/customers/add", name: "CustomerAdd", component: CustomerAdd },
  { path: "/customers/edit/:id", name: "CustomerEdit", component: CustomerEdit, props: true },

  {
    path: "/statistics", name: "Statistics", component: Statistics,
  },
  
  { path: '/admin', component: Admin, meta: { requiresAdmin: true } },
  { path: '/login', name: 'Login', component: Login }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const userRole = localStorage.getItem('role'); // Lấy role từ localStorage
  const isAuthenticated = !!userRole; // Kiểm tra người dùng đã đăng nhập chưa

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else if (to.meta.role && to.meta.role !== userRole) {
    next('/unauthorized'); // Hoặc thông báo không có quyền
  } else {
    next();
  }
});

export default router;
