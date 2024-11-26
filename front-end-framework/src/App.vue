<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Quản lý bán hàng</a>
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
          </ul>
        </div>
      </div>
    </nav>

    <!-- Content -->
    <div class="container mt-4">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
/* Thêm một chút style nếu cần */
body {
  font-family: Arial, sans-serif;
}
.navbar-brand {
  font-size: 1.5rem;
}
</style>
