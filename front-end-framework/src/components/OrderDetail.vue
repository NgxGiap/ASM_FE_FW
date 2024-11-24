<template>
  <div class="container mt-4">
    <h1>Chi tiết đơn hàng</h1>
    <div v-if="order">
      <p><strong>Tên đơn hàng:</strong> {{ order.orderName }}</p>
      <p><strong>Khách hàng:</strong> {{ order.customerName }}</p>
      <p><strong>Địa chỉ:</strong> {{ order.address }}</p>
      <p><strong>Số điện thoại:</strong> {{ order.phone }}</p>
      <p><strong>Ngày đặt:</strong> {{ order.orderDate }}</p>
      <p><strong>Trạng thái:</strong> {{ order.status }}</p>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>#</th>
          <th>Tên sản phẩm</th>
          <th>Giá sản phẩm</th>
          <th>Giảm giá (%)</th>
          <th>Số lượng</th>
          <th>Thành tiền</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in order.products" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ product.name }}</td>
          <td>{{ formatCurrency(product.price) }}</td>
          <td>{{ product.discount }}%</td>
          <td>{{ product.quantity }}</td>
          <td>{{ formatCurrency(calculateUnitTotal(product)) }}</td>
        </tr>
        <tr>
          <td colspan="5" class="text-end fw-bold">Tổng tiền:</td>
          <td class="fw-bold">{{ formatCurrency(total) }}</td>
        </tr>
      </tbody>
    </table>
</div>
    <button class="btn btn-secondary mt-3" @click="goBack">Quay lại</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

// Route và Router
const route = useRoute();
const router = useRouter();

// Biến lưu thông tin đơn hàng
const order = ref({
  id: "",
  customerName: "",
  orderDate: "",
  products: [],
  total: 0,
  status: "",
});

// Biến lưu danh sách sản phẩm từ API
const products = ref([]);

// Tổng tiền
const total = ref(0);

// Lấy dữ liệu đơn hàng và danh sách sản phẩm
onMounted(async () => {
  const orderId = route.params.id;

  // Lấy thông tin đơn hàng từ API
  const orderResponse = await axios.get(`http://localhost:3000/orders/${orderId}`);
  const fetchedOrder = orderResponse.data;

  // Lấy danh sách sản phẩm từ API
  const productsResponse = await axios.get("http://localhost:3000/products");
  products.value = productsResponse.data;

  // Đồng bộ dữ liệu sản phẩm trong đơn hàng với thông tin chi tiết từ danh sách sản phẩm
  order.value = {
    ...fetchedOrder,
    products: fetchedOrder.products.map((product) => {
      const matchedProduct = products.value.find((p) => p.id === product.id) || {};
      return {
        ...product,
        name: matchedProduct.name || "",
        price: matchedProduct.price || 0,
        discount: matchedProduct.discount || 0,
      };
    }),
  };

  // Tính tổng tiền
  calculateTotal();
});

// Hàm định dạng tiền tệ
const formatCurrency = (value) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};

// Hàm tính thành tiền của một sản phẩm (sau khi giảm giá)
const calculateUnitTotal = (product) => {
  const discountedPrice = product.price - (product.price * product.discount) / 100;
  return discountedPrice * product.quantity;
};

// Hàm tính tổng tiền của toàn bộ đơn hàng
const calculateTotal = () => {
  total.value = order.value.products.reduce((sum, product) => {
    return sum + calculateUnitTotal(product);
  }, 0);
};

// Hàm quay lại trang danh sách đơn hàng
const goBack = () => {
  router.push("/orders");
};
</script>
