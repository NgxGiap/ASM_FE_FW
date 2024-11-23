<template>
  <div class="container mt-4">
    <h1>Chi tiết đơn hàng</h1>
    <div v-if="order">
      <p><strong>Khách hàng:</strong> {{ order.customerName }}</p>
      <p><strong>Ngày đặt:</strong> {{ order.orderDate }}</p>
      <p><strong>Trạng thái:</strong> {{ order.status }}</p>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th>Giá</th>
            <th>Giảm giá</th>
            <th>Số lượng</th>
            <th>Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in order.products" :key="index">
            <td>{{ getProductName(product.id) }}</td>
            <td>{{ formatCurrency(product.price) }}</td>
            <td>{{ product.discount }}%</td>
            <td>{{ product.quantity }}</td>
            <td>{{ formatCurrency(calculateDiscountedPrice(product)) }}</td>
          </tr>
        </tbody>
      </table>
      <p><strong>Tổng tiền:</strong> {{ formatCurrency(order.total) }}</p>
    </div>
    <div v-else>
      <p>Đơn hàng không tồn tại.</p>
    </div>
    <button class="btn btn-secondary mt-3" @click="$router.push('/orders')">Quay lại</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "OrderDetail",
  data() {
    return {
      order: null,
      products: [],
    };
  },
  created() {
    const orderId = this.$route.params.id;
    axios.get(`http://localhost:3000/orders/${orderId}`).then((response) => {
      this.order = response.data;
    });
    axios.get("http://localhost:3000/products").then((response) => {
      this.products = response.data;
    });
  },
  methods: {
    getProductName(productId) {
      const product = this.products.find((p) => p.id === productId);
      return product ? product.name : "N/A";
    },
    calculateDiscountedPrice(product) {
      const discountedPrice = product.price - (product.price * product.discount) / 100;
      return discountedPrice * product.quantity;
    },
    formatCurrency(value) {
      return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
    },
  },
};
</script>
