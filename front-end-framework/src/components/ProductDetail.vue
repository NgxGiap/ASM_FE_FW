<template>
  <div class="container mt-4">
    <h1>Chi tiết sản phẩm</h1>
    <div v-if="product">
      <ul class="list-group">
        <li class="list-group-item"><strong>Tên sản phẩm:</strong> {{ product.name }}</li>
        <li class="list-group-item"><strong>Mã sản phẩm:</strong> {{ product.code }}</li>
        <li class="list-group-item"><strong>Giá:</strong> {{ product.price }}</li>
        <li class="list-group-item"><strong>Mô tả:</strong> {{ product.description }}</li>
        <li class="list-group-item"><strong>Hình ảnh:</strong> <img :src="product.image" alt="Hình ảnh sản phẩm" width="150"></li>
        <li class="list-group-item"><strong>Trạng thái:</strong> {{ product.available ? "Có sẵn" : "Hết hàng" }}</li>
        <li class="list-group-item"><strong>Danh mục:</strong> {{ product.category }}</li>
        <li class="list-group-item"><strong>Tình trạng:</strong> {{ product.condition }}</li>
        <li class="list-group-item"><strong>Giảm giá:</strong> {{ product.discount }}%</li>
      </ul>
      <router-link to="/products" class="btn btn-secondary mt-3">Quay lại</router-link>
    </div>
    <div v-else>
      <p>Đang tải thông tin sản phẩm...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const product = ref(null);
const route = useRoute();

const fetchProduct = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/products/${route.params.id}`);
    product.value = response.data;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin sản phẩm:", error);
  }
};

onMounted(fetchProduct);
</script>
