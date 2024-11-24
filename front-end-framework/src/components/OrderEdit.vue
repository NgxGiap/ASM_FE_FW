<template>
  <div class="container mt-4">
    <h1>Chỉnh sửa đơn hàng</h1>
    <form @submit.prevent="updateOrder">
      <!-- Tên đơn hàng -->
      <div class="mb-3">
        <label for="orderName" class="form-label">Tên đơn hàng</label>
        <input v-model="order.orderName" type="text" id="orderName" class="form-control" required />
      </div>

      <!-- Tên khách hàng -->
      <div class="mb-3">
        <label for="customerName" class="form-label">Khách hàng</label>
        <input v-model="order.customerName" type="text" id="customerName" class="form-control" required />
      </div>

      <!-- Địa chỉ -->
      <div class="mb-3">
        <label for="address" class="form-label">Địa chỉ</label>
        <input v-model="order.address" type="text" id="address" class="form-control" required />
      </div>
      
      <!-- Số điện thoại -->
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
            <input v-model="product.unitTotal" type="text" class="form-control" readonly />
          </div>
          <div class="col-2">
            <input v-model="product.price" type="text" class="form-control" readonly />
          </div>
          <div class="col-2">
            <input v-model="product.discount" type="text" class="form-control" readonly />
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
      <button type="submit" class="btn btn-primary">Lưu</button>
    </form>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

// Router và Route để lấy thông tin ID từ URL
const route = useRoute();
const router = useRouter();

// Biến lưu danh sách sản phẩm từ API
const products = ref([]);

// Biến lưu thông tin đơn hàng
const order = ref({
  id: "",
  orderName: "",
  customerName: "",
  orderDate: "",
  products: [
    { id: "", name: "", quantity: 1, price: 0, discount: 0, unitTotal: 0 },
  ],
  total: 0,
  status: "Chờ giao",
});

// Lấy danh sách sản phẩm và chi tiết đơn hàng
onMounted(async () => {
  // Lấy danh sách sản phẩm
  const productsResponse = await axios.get("http://localhost:3000/products");
  products.value = productsResponse.data;

  // Lấy thông tin đơn hàng từ ID
  const orderId = route.params.id;
  const orderResponse = await axios.get(`http://localhost:3000/orders/${orderId}`);
  const fetchedOrder = orderResponse.data;

  // Gán dữ liệu cho đơn hàng
  order.value = {
    ...fetchedOrder,
    products: fetchedOrder.products.map((product) => {
      const matchedProduct = products.value.find((p) => p.id === product.id) || {};
      return {
        ...product,
        name: matchedProduct.name || "",
        price: matchedProduct.price || 0,
        discount: matchedProduct.discount || 0,
        unitTotal: calculateUnitTotal(product), // Tính tổng tiền cho sản phẩm
      };
    }),
  };

  updateTotal(); // Tính tổng tiền cho đơn hàng
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
    product.unitTotal = calculateUnitTotal(product); // Tính tổng tiền cho sản phẩm
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

// Hàm tính tổng tiền cho đơn hàng
const updateTotal = () => {
  order.value.products.forEach((product) => {
    product.unitTotal = calculateUnitTotal(product);
  });
  order.value.total = order.value.products.reduce((sum, product) => sum + product.unitTotal, 0);
};

// Hàm cập nhật đơn hàng
const updateOrder = () => {
  axios
    .put(`http://localhost:3000/orders/${order.value.id}`, order.value)
    .then(() => {
      alert("Cập nhật đơn hàng thành công!");
      router.push("/orders");
    })
    .catch((error) => {
      console.error("Không thể cập nhật đơn hàng:", error);
    });
};
</script>
