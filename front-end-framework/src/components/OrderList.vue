<template>
  <div class="container mt-4">
      <h1>Danh sách đơn hàng</h1>
      <router-link to="/orders/add" class="btn btn-primary">Thêm đơn hàng</router-link>

    <table class="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Khách hàng</th>
          <th>Ngày đặt</th>
          <th>Tổng tiền</th>
          <th>Trạng thái</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.customerName }}</td>
          <td>{{ order.orderDate }}</td>
          <td>{{ order.total }} VND</td>
          <td>{{ order.status }}</td>
          <td>
            <router-link :to="`/orders/${order.id}`" class="btn btn-info btn-sm">Xem</router-link>
            <router-link :to="`/orders/edit/${order.id}`" class="btn btn-warning btn-sm">Sửa</router-link>
            <button class="btn btn-danger btn-sm" @click="deleteOrder(order.id)">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "OrderList",
  data() {
    return {
      orders: [],
    };
  },
  created() {
    this.fetchOrders();
  },
  methods: {
    fetchOrders() {
      axios.get("http://localhost:3000/orders").then((response) => {
        this.orders = response.data;
      });
    },
    deleteOrder(orderId) {
      if (confirm("Bạn có chắc chắn muốn xóa đơn hàng này?")) {
        axios.delete(`http://localhost:3000/orders/${orderId}`).then(() => {
          this.fetchOrders();
        });
      }
    },
  },
};
</script>
