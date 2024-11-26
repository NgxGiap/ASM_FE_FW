<template>
    <div class="container mt-4">
      <h1>Chỉnh sửa thông tin khách hàng</h1>
      <form @submit.prevent="updateCustomer">
        <div class="mb-3">
          <label for="name" class="form-label">Họ và tên</label>
          <input v-model="customer.name" type="text" id="name" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="address" class="form-label">Địa chỉ</label>
          <input v-model="customer.address" type="text" id="address" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="phone" class="form-label">Số điện thoại</label>
          <input v-model="customer.phone" type="text" id="phone" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-primary">Cập nhật</button>
        <router-link to="/customers" class="btn btn-secondary ms-2">Hủy</router-link>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import axios from "axios";
  
  // Router hooks
  const route = useRoute();
  const router = useRouter();
  
  // Reactive customer object
  const customer = ref({
    id: "",
    name: "",
    address: "",
    phone: "",
  });
  
  // Fetch customer data by ID
  onMounted(async () => {
    try {
      const response = await axios.get(`http://localhost:3000/customers/${route.params.id}`);
      customer.value = response.data;
    } catch (error) {
      console.error("Không thể tải dữ liệu khách hàng:", error);
    }
  });
  
  // Update customer
  const updateCustomer = async () => {
    try {
      await axios.put(`http://localhost:3000/customers/${route.params.id}`, customer.value);
      router.push("/customers");
    } catch (error) {
      console.error("Không thể cập nhật thông tin khách hàng:", error);
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
  }
  </style>
  