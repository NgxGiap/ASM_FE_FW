<template>
    <div class="container mt-4">
      <h1>Danh sách khách hàng</h1>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Họ tên</th>
            <th>Địa chỉ</th>
            <th>Số điện thoại</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(customer, index) in customers" :key="customer.id">
            <td>{{ index + 1 }}</td>
            <td>{{ customer.name }}</td>
            <td>{{ customer.address }}</td>
            <td>{{ customer.phone }}</td>
            <td>
              <button class="btn btn-primary btn-sm me-2" @click="editCustomer(customer.id)">Sửa</button>
              <button class="btn btn-danger btn-sm" @click="deleteCustomer(customer.id)">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
      <router-link to="/customers/add" class="btn btn-success mt-3">Thêm khách hàng</router-link>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import axios from "axios";
  
  const router = useRouter();
  const customers = ref([]);
  
  const fetchCustomers = () => {
    axios.get("http://localhost:3000/customers").then((response) => {
      customers.value = response.data;
    });
  };
  
  const editCustomer = (id) => {
    router.push(`/customers/edit/${id}`);
  };
  
  const deleteCustomer = (id) => {
    if (confirm("Bạn có chắc chắn muốn xóa khách hàng này?")) {
      axios.delete(`http://localhost:3000/customers/${id}`).then(fetchCustomers);
    }
  };
  
  onMounted(fetchCustomers);
  </script>
  