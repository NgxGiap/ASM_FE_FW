<template>
  <div class="container mt-4">
    <h1>Danh sách sản phẩm</h1>
    <table class="table table-striped">
      <thead class="table-dark">
        <tr>
          <th>Hình ảnh</th>
          <th>Tên sản phẩm</th>
          <th>Mã sản phẩm</th>
          <th>Giá</th>
          <th>Mô tả</th>
          <th>Danh mục</th>
          <th>Tình trạng</th>
          <th>Giảm giá</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>
            <img :src="product.image" alt="Hình sản phẩm" width="50" />
          </td>
          <td>{{ product.name }}</td>
          <td>{{ product.code }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.category }}</td>
          <td>{{ product.condition }}</td>
          <td>{{ product.discount }}%</td>
          <td>
            <router-link :to="'/products/' + product.id" class="btn btn-info btn-sm">
              Xem
            </router-link>
            <router-link
              v-if="isAuthorized"
              :to="'/products/edit/' + product.id"
              class="btn btn-warning btn-sm"
            >
              Sửa
            </router-link>
            <button
              v-if="isAuthorized"
              @click="deleteProduct(product.id)"
              class="btn btn-danger btn-sm"
            >
              Xóa
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <router-link
      v-if="isAuthorized"
      to="/products/add"
      class="btn btn-primary mt-3"
    >
      Thêm sản phẩm
    </router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const products = ref([]);
const role = ref(localStorage.getItem("role"));
const isAuthorized = ref(role.value === "admin" || role.value === "employee");

const fetchProducts = async () => {
  try {
    const response = await axios.get("http://localhost:3000/products");
    products.value = response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách sản phẩm:", error);
  }
};

const deleteProduct = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/products/${id}`);
    fetchProducts(); // Lấy lại danh sách sau khi xóa
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm:", error);
  }
};

onMounted(fetchProducts);
</script>
