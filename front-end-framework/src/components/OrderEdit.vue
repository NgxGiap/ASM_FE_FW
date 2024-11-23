<template>
  <div class="container mt-4">
    <h1>Chỉnh sửa đơn hàng</h1>
    <form @submit.prevent="updateOrder">
      <!-- Tên khách hàng -->
      <div class="mb-3">
        <label for="customerName" class="form-label">Khách hàng</label>
        <input v-model="order.customerName" type="text" id="customerName" class="form-control" required />
      </div>

      <!-- Ngày đặt -->
      <div class="mb-3">
        <label for="orderDate" class="form-label">Ngày đặt</label>
        <input v-model="order.orderDate" type="date" id="orderDate" class="form-control" required />
      </div>

      <!-- Danh sách sản phẩm -->
      <div class="mb-3">
        <label class="form-label">Sản phẩm</label>
        <div v-for="(product, index) in order.products" :key="index" class="row mb-2">
          <div class="col-4">
            <select v-model="product.id" class="form-select" @change="updatePrice(product)">
              <option value="" disabled>Chọn sản phẩm</option>
              <option v-for="prod in products" :key="prod.id" :value="prod.id">
                {{ prod.name }}
              </option>
            </select>
          </div>
          <div class="col-2">
            <input
              v-model.number="product.quantity"
              type="number"
              class="form-control"
              placeholder="Số lượng"
              min="1"
              @input="updateTotal"
            />
          </div>
          <div class="col-2">
            <input v-model="product.price" type="text" class="form-control" placeholder="Đơn giá" readonly />
          </div>
          <div class="col-2">
            <input v-model="product.discount" type="text" class="form-control" placeholder="Giảm giá (%)" readonly />
          </div>
          <div class="col-2">
            <button type="button" class="btn btn-danger" @click="removeProduct(index)">Xóa</button>
          </div>
        </div>
        <button type="button" class="btn btn-secondary mt-2" @click="addProductRow">Thêm sản phẩm</button>
      </div>

      <!-- Tổng tiền -->
      <div class="mb-3">
        <label for="total" class="form-label">Tổng tiền</label>
        <input v-model="order.total" type="text" id="total" class="form-control" readonly />
      </div>

      <!-- Trạng thái -->
      <div class="mb-3">
        <label for="status" class="form-label">Trạng thái</label>
        <select v-model="order.status" id="status" class="form-select" required>
          <option value="Đã giao">Đã giao</option>
          <option value="Chờ giao">Chờ giao</option>
        </select>
      </div>

      <!-- Submit button -->
      <button type="submit" class="btn btn-primary">Cập nhật</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "OrderEdit",
  data() {
    return {
      order: {
        customerName: "",
        orderDate: "",
        products: [],
        total: 0,
        status: "Chờ giao",
      },
      products: [],
    };
  },
  created() {
    const orderId = this.$route.params.id;
    axios.get(`http://localhost:3000/orders/${orderId}`).then((response) => {
      this.order = response.data;
    });
    axios.get("http://localhost:3000/products").then((response) => {
      this.products = response.data;
    });
  },
  methods: {
    addProductRow() {
      this.order.products.push({ id: "", quantity: 1, price: 0, discount: 0 });
    },
    removeProduct(index) {
      this.order.products.splice(index, 1);
      this.updateTotal();
    },
    updatePrice(product) {
      const selectedProduct = this.products.find((p) => p.id === product.id);
      if (selectedProduct) {
        product.price = selectedProduct.price;
        product.discount = selectedProduct.discount || 0;
      } else {
        product.price = 0;
        product.discount = 0;
      }
      this.updateTotal();
    },
    updateTotal() {
      this.order.total = this.order.products.reduce((sum, product) => {
        const discountedPrice = product.price - (product.price * product.discount) / 100;
        return sum + product.quantity * discountedPrice;
      }, 0);
    },
    updateOrder() {
      axios
        .put(`http://localhost:3000/orders/${this.order.id}`, this.order)
        .then(() => {
          this.$router.push("/orders");
        })
        .catch((error) => {
          console.error("Không thể cập nhật đơn hàng:", error);
        });
    },
  },
};
</script>
