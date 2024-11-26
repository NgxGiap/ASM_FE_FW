<template>
    <div class="container mt-4">
      <h1>Thêm khách hàng</h1>
      <form @submit.prevent="addCustomer">
        <div class="mb-3">
          <label for="name" class="form-label">Họ tên</label>
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
        <button type="submit" class="btn btn-primary">Thêm</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import axios from "axios";
  
  const router = useRouter();
  const customer = ref({ name: "", address: "", phone: "" });
  
  const addCustomer = () => {
    axios.post("http://localhost:3000/customers", customer.value).then(() => {
      router.push("/customers");
    });
  };
  </script>
  