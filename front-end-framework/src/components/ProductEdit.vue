<template>
  <div class="container mt-4">
    <h1>Chỉnh sửa sản phẩm</h1>
    <form @submit.prevent="updateProduct">
      <!-- Tên sản phẩm -->
      <div class="mb-3">
        <label for="name" class="form-label">Tên sản phẩm</label>
        <input v-model="product.name" type="text" id="name" class="form-control" required />
      </div>

      <!-- Mã sản phẩm -->
      <div class="mb-3">
        <label for="code" class="form-label">Mã sản phẩm</label>
        <input v-model="product.code" type="text" id="code" class="form-control" required />
      </div>

      <!-- Giá -->
      <div class="mb-3">
        <label for="price" class="form-label">Giá</label>
        <input v-model.number="product.price" type="number" id="price" class="form-control" required />
      </div>

      <!-- Hình ảnh -->
      <div class="mb-3">
        <label for="image" class="form-label">Hình ảnh (URL)</label>
        <input v-model="product.image" type="text" id="image" class="form-control" required />
      </div>

      <!-- Mô tả -->
      <div class="mb-3">
        <label for="description" class="form-label">Mô tả</label>
        <textarea v-model="product.description" id="description" class="form-control" rows="3"></textarea>
      </div>

      <!-- Danh mục -->
      <div class="mb-3">
        <label for="category" class="form-label">Loại sản phẩm</label>
        <select v-model="product.category" id="category" class="form-select" required>
          <option value="" disabled>Chọn loại sản phẩm</option>
          <option value="Điện tử">Điện tử</option>
          <option value="Thời trang">Thời trang</option>
          <option value="Đồ gia dụng">Đồ gia dụng</option>
        </select>
      </div>
      <div class="mb-3">
        <label class="form-label">Tình trạng sản phẩm</label>
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
        <input v-model.number="product.discount" type="number" id="discount" class="form-control" />
      </div>

      <!-- Có sẵn -->
      <div class="form-check mb-3">
        <input v-model="product.available" type="checkbox" id="available" class="form-check-input" />
        <label for="available" class="form-check-label">Có sẵn</label>
      </div>

      <!-- Nút lưu -->
      <button type="submit" class="btn btn-primary">Cập nhật</button>
      <button type="button" class="btn btn-secondary ms-2" @click="goBack">Hủy</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

// Route và Router
const route = useRoute();
const router = useRouter();

// Biến lưu thông tin sản phẩm
const product = ref({
  id: "",
  name: "",
  code: "",
  price: 0,
  description: "",
  image: "",
  available: false,
  category: "",
  condition: "Mới",
  discount: 0,
});

// Lấy thông tin sản phẩm từ API khi trang được tải
onMounted(() => {
  const productId = route.params.id;
  axios
    .get(`http://localhost:3000/products/${productId}`)
    .then((response) => {
      product.value = response.data;
    })
    .catch((error) => {
      console.error("Không thể tải sản phẩm:", error);
      router.push("/products"); // Quay lại danh sách sản phẩm nếu lỗi
    });
});

// Hàm cập nhật sản phẩm
const updateProduct = () => {
  axios
    .put(`http://localhost:3000/products/${product.value.id}`, product.value)
    .then(() => {
      router.push("/products");
    })
    .catch((error) => {
      console.error("Không thể cập nhật sản phẩm:", error);
    });
};

// Hàm quay lại
const goBack = () => {
  router.push("/products");
};
</script>
