<template>
<div class="container mt-4">
    <h1>Thêm đơn hàng</h1>
    <form @submit.prevent="addOrder">
      <div class="mb-3">
        <label for="customerType" class="form-label">Loại khách hàng</label>
        <select v-model="customerType" id="customerType" class="form-select">
          <option value="existing">Khách hàng</option>
          <option value="new">Khách vãng lai</option>
        </select>
      </div>

      <div v-if="customerType === 'existing'" class="mb-3">
        <label for="customer" class="form-label">Chọn khách hàng</label>
        <select v-model="selectedCustomerId" id="customer" class="form-select" @change="fillCustomerDetails">
          <option value="">-- Chọn khách hàng --</option>
          <option v-for="customer in customers" :key="customer.id" :value="customer.id">
            {{ customer.name }}
          </option>
        </select>
      </div>

      <!-- Tên đơn hàng -->
      <div class="mb-3">
        <label for="orderName" class="form-label">Tên đơn hàng</label>
        <input v-model="order.orderName" type="text" id="orderName" class="form-control" required />
      </div>

      <div v-if="customerType === 'new' || selectedCustomerId" class="mb-3">
        <label for="customerName" class="form-label">Họ tên</label>
        <input v-model="order.customerName" type="text" id="customerName" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="address" class="form-label">Địa chỉ</label>
        <input v-model="order.address" type="text" id="address" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="phone" class="form-label">Số điện thoại</label>
        <input v-model="order.phone" type="text" id="phone" class="form-control" required />
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
            <select v-model="product.id" class="form-select" @change="updateProductDetails(product)">
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
            <input v-model="product.price" type="text" class="form-control" readonly />
          </div>
          <div class="col-2">
            <input v-model="product.discount" type="text" class="form-control" readonly />
          </div>
          <div class="col-2">
            <input v-model="product.unitTotal" type="text" class="form-control" readonly />
          </div>
          <div class="col-1">
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
      <button type="submit" class="btn btn-primary">Thêm</button>
    </form>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

// Biến lưu danh sách sản phẩm từ API
const products = ref([]);
const customerType = ref("existing");
const selectedCustomerId = ref("");
const customers = ref([]);

const fetchCustomers = () => {
  axios.get("http://localhost:3000/customers").then((response) => {
    customers.value = response.data;
  });
};

const fillCustomerDetails = () => {
  const selectedCustomer = customers.value.find((c) => c.id === selectedCustomerId.value);
  if (selectedCustomer) {
    order.value.customerName = selectedCustomer.name;
    order.value.address = selectedCustomer.address;
    order.value.phone = selectedCustomer.phone;
  }
};

// Biến lưu thông tin đơn hàng
const order = ref({
  orderName: "",
  customerName: "",
  address: "",
  phone: "",
  orderDate: "",
  products: [
    { id: "", name: "", quantity: 1, price: 0, discount: 0, unitTotal: 0 },
  ],
  total: 0,
  status: "Chờ giao", // Trạng thái mặc định
});

// Lấy danh sách sản phẩm khi component được mount
onMounted(fetchCustomers);
onMounted(() => {
  axios.get("http://localhost:3000/products").then((response) => {
    products.value = response.data;
  });
});

// Hàm thêm dòng sản phẩm
const addProductRow = () => {
  order.value.products.push({ id: "", name: "", quantity: 1, price: 0, discount: 0, unitTotal: 0 });
};

// Hàm xóa dòng sản phẩm
const removeProduct = (index) => {
  order.value.products.splice(index, 1);
  updateTotal();
};

// Hàm cập nhật thông tin sản phẩm (tên, giá, giảm giá)
const updateProductDetails = (product) => {
  const selectedProduct = products.value.find((p) => p.id === product.id);
  if (selectedProduct) {
    product.name = selectedProduct.name;
    product.price = selectedProduct.price;
    product.discount = selectedProduct.discount;
    product.unitTotal = calculateUnitTotal(product); // Cập nhật tổng tiền cho sản phẩm này
  } else {
    product.name = "";
    product.price = 0;
    product.discount = 0;
    product.unitTotal = 0;
  }
  updateTotal();
};

// Hàm tính tổng tiền của từng sản phẩm
const calculateUnitTotal = (product) => {
  const finalPrice = product.price - (product.price * product.discount) / 100;
  return finalPrice * product.quantity;
};

// Hàm tính tổng tiền đơn hàng
const updateTotal = () => {
  order.value.products.forEach((product) => {
    product.unitTotal = calculateUnitTotal(product);
  });
  order.value.total = order.value.products.reduce((sum, product) => sum + product.unitTotal, 0);
};

// Hàm thêm đơn hàng
const addOrder = () => {
  axios
    .post("http://localhost:3000/orders", order.value)
    .then(() => {
      alert("Thêm đơn hàng thành công!");
      window.location.href = "/orders";
    })
    .catch((error) => {
      console.error("Không thể thêm đơn hàng:", error);
    });
};
</script>
