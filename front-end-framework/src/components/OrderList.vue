<template>
  <div class="container mt-4">
    <h1>Danh sách đơn hàng</h1>
    <table class="table table-striped">
      <thead class="table-dark">
        <tr>
          <th>#</th>
          <th>Tên đơn hàng</th>
          <th>Khách hàng</th>
          <th>Địa chỉ</th>
          <th>Số điện thoại</th>
          <th>Ngày đặt</th>
          <th>Tổng tiền</th>
          <th>Trạng thái</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.orderName }}</td>
          <td>{{ order.customerName }}</td>
          <td>{{ order.address }}</td>
          <td>{{ order.phone }}</td>
          <td>{{ order.orderDate }}</td>
          <td>{{ formatCurrency(order.total) }}</td>
          <td>{{ order.status }}</td>
          <td>
            <router-link :to="'/orders/' + order.id" class="btn btn-info">Xem</router-link>
            <router-link :to="'/orders/edit/' + order.id" v-if="order.status !== 'Đã giao'" class="btn btn-warning">Sửa</router-link>
            <!-- <button @click="deleteOrder(order.id)" class="btn btn-danger">Xóa</button> -->
          </td>
        </tr>
      </tbody>
    </table>
    <router-link to="/orders/add" class="btn btn-primary">Thêm đơn hàng</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const orders = ref([]);

const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};


// Lấy danh sách đơn hàng khi component được khởi tạo
onMounted(async () => {
  const response = await axios.get("http://localhost:3000/orders");
  orders.value = response.data;
});

// Xóa một đơn hàng
// const deleteOrder = async (id) => {
//   try {
//     await axios.delete(`http://localhost:3000/orders/${id}`);
//     orders.value = orders.value.filter((order) => order.id !== id);
//   } catch (error) {
//     console.error("Không thể xóa đơn hàng:", error);
//   }
// };
</script>
