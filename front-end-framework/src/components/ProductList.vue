<template>
  <div class="container mt-4">
    <h1>Danh sách sản phẩm</h1>
    <router-link to="/products/add" class="btn btn-primary mb-3">Thêm sản phẩm</router-link>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Hình ảnh</th>
          <th>Tên sản phẩm</th>
          <th>Mã</th>
          <th>Giá</th>
          <th>Mô tả</th>
          <th>Trạng thái</th>
          <th>Loại</th>
          <th>Trạng thái</th>
          <th>Giảm giá (%)</th>
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
          <td>{{ product.price.toLocaleString() }} VNĐ</td>
          <td>{{ product.description }}</td>
          <td>
            <span :class="product.available ? 'badge bg-success' : 'badge bg-danger'">
              {{ product.available ? 'Còn hàng' : 'Hết hàng' }}
            </span>
          </td>
          <td>{{ product.category }}</td>
          <td>{{ product.condition }}</td>
          <td>{{ product.discount }}</td>
          <td>
            <router-link
              :to="`/products/${product.id}`"
              class="btn btn-info btn-sm me-1"
            >
              Xem chi tiết
            </router-link>
            <router-link
              :to="`/products/edit/${product.id}`"
              class="btn btn-warning btn-sm me-1"
            >
              Sửa
            </router-link>
            <button @click="deleteProduct(product.id)" class="btn btn-danger btn-sm">
              Xóa
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProductList",
  data() {
    return {
      products: [],
    };
  },
  methods: {
    fetchProducts() {
      axios
        .get("http://localhost:3000/products")
        .then((response) => {
          this.products = response.data;
        })
        .catch((error) => {
          console.error("Không thể tải sản phẩm:", error);
        });
    },
    deleteProduct(id) {
      if (confirm("Bạn có chắc muốn xóa sản phẩm này không?")) {
        axios
          .delete(`http://localhost:3000/products/${id}`)
          .then(() => {
            this.fetchProducts();
          })
          .catch((error) => {
            console.error("Không thể xóa sản phẩm:", error);
          });
      }
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>
