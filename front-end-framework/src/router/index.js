import { createRouter, createWebHistory } from "vue-router";
import ProductList from "@/components/ProductList.vue";
import ProductAdd from "@/components/ProductAdd.vue";
import ProductEdit from "@/components/ProductEdit.vue";
import ProductDetail from "@/components/ProductDetail.vue";

import OrderList from "@/components/OrderList.vue";
import OrderAdd from "@/components/OrderAdd.vue";
import OrderEdit from "@/components/OrderEdit.vue";
import OrderDetail from "@/components/OrderDetail.vue";

const routes = [
  // Quản lý sản phẩm
  { path: "/", redirect: "/products" },
  { path: "/products", component: ProductList },
  { path: "/products/add", component: ProductAdd },
  { path: "/products/edit/:id", component: ProductEdit },
  { path: "/products/:id", component: ProductDetail },

  // Quản lý đơn hàng
  { path: "/orders", component: OrderList },
  { path: "/orders/add", component: OrderAdd },
  { path: "/orders/edit/:id", component: OrderEdit },
  { path: "/orders/:id", component: OrderDetail },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
