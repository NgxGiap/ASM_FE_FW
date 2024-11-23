<template>
  <div class="container mt-4">
    <h1>Thêm đơn hàng</h1>
    <form @submit.prevent="addOrder">
      <!-- Tên khách hàng -->
      <div class="mb-3">
        <label for="customerName" class="form-label">Khách hàng</label>
        <input v-model="order.customerName" type="text" id="customerName" class="form-control" required />
      </div>

      <!-- Ngày đặt hàng -->
      <div class="mb-3">
        <label for="orderDate" class="form-label">Ngày đặt</label>
        <input v-model="order.orderDate" type="date" id="orderDate" class="form-control" required />
      </div>

      <!-- Danh sách sản phẩm -->
      <div class="mb-3">
        <label class="form-label">Sản phẩm</label>
        <div v-for="(product, index) in order.products" :key="index" class="row mb-2">
          <div class="col-3">
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
            <input v-model="product.discount" type="number" class="form-control" placeholder="Giảm giá (%)" min="0" max="100" />
          </div>
          <div class="col-2">
            <button type="button" class="btn btn-danger" @click="removeProduct(index)">Xóa</button>
          </div>
        </div>
        <button type="button" class="btn btn-secondary mt-2" @click="addProductRow">Thêm sản phẩm</button>
      </div>

      <!-- Tổng tiền -->
      <div class="mb-3">
        <label for="total" class="form-label">Tổng tiền sau giảm giá</label>
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
      <button type="submit" class="btn btn-primary">Thêm</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "OrderAdd",
  data() {
    return {
      order: {
        customerName: "",
        orderDate: "",
        products: [
          { id: "", quantity: 1, price: 0, discount: 0 },
        ],
        total: 0,
        status: "Chờ giao", // Mặc định trạng thái
      },
      products: [], // Danh sách sản phẩm từ API
    };
  },
  created() {
    // Lấy danh sách sản phẩm từ API
    axios.get("http://localhost:3000/products").then((response) => {
      this.products = response.data;
    });
  },
  methods: {
  addProductRow() {
    // Thêm một dòng sản phẩm mới với các giá trị mặc định
    this.order.products.push({ id: "", quantity: 1, price: 0, discount: 0 });
  },
  removeProduct(index) {
    // Xóa dòng sản phẩm
    this.order.products.splice(index, 1);
    this.updateTotal();
  },
  updatePrice(product) {
    // Cập nhật giá và giảm giá khi chọn sản phẩm
    const selectedProduct = this.products.find((p) => p.id === product.id);
    if (selectedProduct) {
      product.price = selectedProduct.price;
      product.discount = selectedProduct.discount || 0; // Lấy discount từ sản phẩm
    } else {
      product.price = 0;
      product.discount = 0;
    }
    this.updateTotal();
  },
  updateTotal() {
    // Tính tổng tiền sau khi áp dụng giảm giá
    this.order.total = this.order.products.reduce((sum, product) => {
      const discountedPrice = product.price - (product.price * product.discount) / 100;
      return sum + product.quantity * discountedPrice;
    }, 0);
  },
  addOrder() {
    // Gửi đơn hàng đến API
    axios
      .post("http://localhost:3000/orders", this.order)
      .then(() => {
        this.$router.push("/orders");
      })
      .catch((error) => {
        console.error("Không thể thêm đơn hàng:", error);
      });
  },
},

};
</script>
