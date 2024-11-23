<template>
  <div class="container mt-4">
    <h1>Chi tiết sản phẩm</h1>
    <div v-if="product">
      <div class="card" style="width: 18rem;">
        <img :src="product.image" class="card-img-top" alt="Hình sản phẩm" />
        <div class="card-body">
          <h5 class="card-title">{{ product.name }}</h5>
          <p class="card-text">
            <strong>Mã sản phẩm:</strong> {{ product.code }}
          </p>
          <p class="card-text">
            <strong>Giá:</strong> {{ product.price.toLocaleString() }} VNĐ
          </p>
          <p class="card-text">
            <strong>Mô tả:</strong> {{ product.description }}
          </p>
          <p class="card-text">
            <strong>Trạng thái:</strong>
            <span :class="product.available ? 'badge bg-success' : 'badge bg-danger'">
              {{ product.available ? 'Còn hàng' : 'Hết hàng' }}
            </span>
          </p>
          <p class="card-text">
            <strong>Loại:</strong> {{ product.category }}
          </p>
          <p class="card-text">
            <strong>Tình trạng:</strong> {{ product.condition }}
          </p>
          <router-link to="/products" class="btn btn-secondary">Quay lại</router-link>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="text-danger">Không tìm thấy sản phẩm.</p>
      <router-link to="/products" class="btn btn-secondary">Quay lại</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProductDetail",
  data() {
    return {
      product: null,
    };
  },
  methods: {
    fetchProduct() {
      const id = this.$route.params.id;
      axios
        .get(`http://localhost:3000/products/${id}`)
        .then((response) => {
          this.product = response.data;
        })
        .catch((error) => {
          console.error("Không thể tải chi tiết sản phẩm:", error);
        });
    },
  },
  mounted() {
    this.fetchProduct();
  },
};
</script>
