<template>
    <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div class="card p-4 shadow-lg" style="width: 22rem;">
        <h2 class="text-center mb-4">Đăng nhập</h2>
        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label for="username" class="form-label">Tên đăng nhập</label>
            <input
              v-model="username"
              type="text"
              class="form-control"
              id="username"
              placeholder="Nhập tên đăng nhập"
              required
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Mật khẩu</label>
            <input
              v-model="password"
              type="password"
              class="form-control"
              id="password"
              placeholder="Nhập mật khẩu"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary w-100">Đăng nhập</button>
          <p v-if="errorMessage" class="text-danger text-center mt-3">{{ errorMessage }}</p>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  
  const router = useRouter();
  const username = ref('');
  const password = ref('');
  const errorMessage = ref('');
  
  async function handleLogin() {
    try {
      const response = await axios.get('http://localhost:3000/users', {
        params: { username: username.value, password: password.value },
      });
  
      const user = response.data[0];
      if (user) {
        localStorage.setItem('role', user.role);
        router.push(user.role === 'admin' ? '/admin' : '/');
      } else {
        errorMessage.value = 'Tên đăng nhập hoặc mật khẩu không đúng!';
      }
    } catch (error) {
      console.error(error);
      errorMessage.value = 'Có lỗi xảy ra, vui lòng thử lại!';
    }
  }
  </script>
  
  <style scoped>
  body {
    background-color: #f8f9fa;
  }
  .card {
    border-radius: 10px;
  }
  </style>
  