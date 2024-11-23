<template>
  <div class="container mt-4">
    <h1>Sửa sản phẩm</h1>
    <form @submit.prevent="updateProduct">
      <div class="mb-3">
        <label class="form-label">Tên sản phẩm</label>
        <input v-model="product.name" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Mã sản phẩm</label>
        <input v-model="product.code" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Giá</label>
        <input v-model.number="product.price" type="number" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Mô tả</label>
        <textarea v-model="product.description" class="form-control" rows="3"></textarea>
      </div>
      <div class="mb-3">
        <label class="form-label">Hình ảnh</label>
        <input v-model="product.image" type="url" class="form-control" />
      </div>
      <div class="form-check">
        <input v-model="product.available" type="checkbox" class="form-check-input" />
        <label class="form-check-label">Còn hàng</label>
      </div>
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
          <div class="mb-3">
          <label for="discount" class="form-label">Giảm giá (%)</label>
          <input v-model="product.discount" type="number" class="form-control" id="discount" min="0" max="100" />
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-success mt-3">Cập nhật sản phẩm</button>
    </form>
    <br>
    <router-link to="/products" class="btn btn-secondary">Quay lại</router-link>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProductEdit",
  data() {
    return {
      product: {},
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
          console.error("Không thể tải sản phẩm:", error);
        });
    },
    updateProduct() {
      axios
        .put(`http://localhost:3000/products/${this.product.id}`, this.product)
        .then(() => {
          alert("Sản phẩm đã được cập nhật!");
          this.$router.push("/products");
        })
        .catch((error) => {
          console.error("Không thể cập nhật sản phẩm:", error);
        });
    },
  },
  mounted() {
    this.fetchProduct();
  },
};
</script>
