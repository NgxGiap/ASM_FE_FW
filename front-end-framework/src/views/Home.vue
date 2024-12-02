<template>
    <div class="home">
      <h1>Chào mừng đến với hệ thống quản lý bán hàng</h1>
      <p>Quản lý đơn hàng, sản phẩm và khách hàng một cách dễ dàng.</p>
      <div class="actions">
        <router-link to="/products" class="btn btn-primary">Quản lý Sản phẩm</router-link>
        <router-link to="/orders" class="btn btn-secondary">Quản lý Đơn hàng</router-link>
        <router-link to="/customers" class="btn btn-info">Quản lý Khách hàng</router-link>
        <router-link to="/statistics" class="btn btn-success">Thống kê</router-link>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Kiểm tra vai trò người dùng
  const role = ref(localStorage.getItem('role') || 'guest');
  </script>
  
  <style>
  .home {
    text-align: center;
    margin-top: 50px;
  }
  .actions {
    margin-top: 20px;
  }
  .actions .btn {
    margin: 10px;
  }
  </style>
  