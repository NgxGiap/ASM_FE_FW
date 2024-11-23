<template>
  <div class="container mt-4">
    <h1>Thêm sản phẩm</h1>
    <form @submit.prevent="addProduct">
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
        </div>
      </div>
      <div class="mb-3">
      <label for="discount" class="form-label">Giảm giá (%)</label>
      <input v-model="product.discount" type="number" class="form-control" id="discount" min="0" max="100" />
      </div>
      <button type="submit" class="btn btn-primary mt-3">Thêm sản phẩm</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProductAdd",
  data() {
    return {
      product: {
        name: "",
        code: "",
        price: 0,
        description: "",
        image: "",
        available: true,
      },
    };
  },
  methods: {
    addProduct() {
      axios
        .post("http://localhost:3000/products", this.product)
        .then(() => {
          alert("Sản phẩm đã được thêm!");
          this.$router.push("/products");
        })
        .catch((error) => {
          console.error("Không thể thêm sản phẩm:", error);
        });
    },
  },
};
</script>
