<template>
    <div class="admin">
      <h1>Quản trị hệ thống</h1>
      <p>Chào mừng bạn, quản trị viên!</p>
      <router-link to="/">Quay lại trang chính</router-link>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Kiểm tra quyền truy cập admin
  const isAdmin = ref(localStorage.getItem('role') === 'admin');
  if (!isAdmin.value) {
    window.location.href = '/login';
  }
  </script>
  
  <style>
  .admin {
    padding: 20px;
  }
  </style>
  