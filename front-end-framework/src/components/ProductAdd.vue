<template>
  <div class="container mt-4">
    <h1>Thêm sản phẩm</h1>
    <form @submit.prevent="addProduct">
      <!-- Tên sản phẩm -->
      <div class="mb-3">
        <label for="name" class="form-label">Tên sản phẩm</label>
        <input v-model="product.name" type="text" class="form-control" id="name" required />
      </div>

      <!-- Mã sản phẩm -->
      <div class="mb-3">
        <label for="code" class="form-label">Mã sản phẩm</label>
        <input v-model="product.code" type="text" class="form-control" id="code" required />
      </div>

      <!-- Giá -->
      <div class="mb-3">
        <label for="price" class="form-label">Giá</label>
        <input v-model="product.price" type="number" class="form-control" id="price" required />
      </div>

      <!-- Mô tả -->
      <div class="mb-3">
        <label for="description" class="form-label">Mô tả</label>
        <textarea v-model="product.description" class="form-control" id="description" required></textarea>
      </div>

      <!-- Hình ảnh -->
      <div class="mb-3">
        <label for="image" class="form-label">Hình ảnh</label>
        <input v-model="product.image" type="text" class="form-control" id="image" required />
      </div>

      <!-- Trạng thái có sẵn -->
      <div class="form-check mb-3">
        <input v-model="product.available" type="checkbox" class="form-check-input" id="available" />
        <label class="form-check-label" for="available">Có sẵn</label>
      </div>

      <!-- Danh mục -->
      <div class="mb-3">
        <label for="category" class="form-label">Danh mục</label>
        <select v-model="product.category" id="category" class="form-select" required>
          <option value="" disabled>Chọn loại sản phẩm</option>
          <option value="Điện tử">Điện tử</option>
          <option value="Thời trang">Thời trang</option>
          <option value="Đồ gia dụng">Đồ gia dụng</option>
        </select>
      </div>
      <div class="mb-3">
        <label class="form-label">Tình trạng</label>
        <div>
          <div class="form-check">
            <input
              v-model="product.condition"
              type="radio"
              class="form-check-input"
              id="new"
              value="Mới"
            />
            <label for="new" class="form-check-label">Mới</label>
          </div>
          <div class="form-check">
            <input
              v-model="product.condition"
              type="radio"
              class="form-check-input"
              id="used"
              value="Đã qua sử dụng"
            />
            <label for="used" class="form-check-label">Đã qua sử dụng</label>
          </div>
        </div>
      </div>

      <!-- Giảm giá -->
      <div class="mb-3">
        <label for="discount" class="form-label">Giảm giá (%)</label>
        <input v-model="product.discount" type="number" class="form-control" id="discount" required min="0" max="100" />
      </div>

      <!-- Nút thêm sản phẩm -->
      <button type="submit" class="btn btn-primary">Thêm sản phẩm</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

// Khai báo dữ liệu cho sản phẩm
const product = ref({
  name: "",
  code: "",
  price: 0,
  description: "",
  image: "",
  available: false,
  category: "",
  condition: "",
  discount: 0,
});

// Hàm thêm sản phẩm vào db
const addProduct = async () => {
  try {
    // Gửi dữ liệu sản phẩm lên API
    await axios.post("http://localhost:3000/products", product.value);
    // Chuyển đến trang danh sách sản phẩm sau khi thêm
    window.location.href = "/products";
  } catch (error) {
    console.error("Không thể thêm sản phẩm:", error);
  }
};
</script>
