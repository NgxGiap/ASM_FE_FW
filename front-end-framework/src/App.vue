<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">Quản lý bán hàng</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/products" class="nav-link" active-class="active"
                >Sản phẩm</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/orders" class="nav-link" active-class="active"
                >Đơn hàng</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/customers" class="nav-link">Khách hàng</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/statistics" class="nav-link">Thống kê</router-link>
            </li>
          </ul>
        </div>
        <div>
          <button v-if="isAdmin" @click="goToAdmin">Trang quản trị</button>
          <button v-if="isEmployee" @click="goToEmployee">Trang nhân viên</button>
          <button @click="handleAuth">{{ isLoggedIn ? 'Đăng xuất' : 'Đăng nhập' }}</button>
        </div>
      </div>
    </nav>
    <div class="container mt-4">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const role = ref(localStorage.getItem('role'));
const isLoggedIn = computed(() => role.value !== null);
const isAdmin = computed(() => role.value === 'admin');
const isEmployee = computed(() => role.value === 'employee');

function goToAdmin() {
  router.push('/admin');
}

function goToEmployee() {
  router.push('/');
}

function handleAuth() {
  if (isLoggedIn.value) {
    localStorage.removeItem('role');
    role.value = null;
    router.push('/login');
  } else {
    router.push('/login');
  }
}

onMounted(() => {
  role.value = localStorage.getItem('role'); // Đảm bảo trạng thái đồng bộ khi tải lại trang
});
</script>

<style>
body {
  font-family: Arial, sans-serif;
}
.navbar-brand {
  font-size: 1.5rem;
}
</style>
