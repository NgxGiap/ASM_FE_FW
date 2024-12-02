<template>
  <div class="container">
    <h1 class="mb-4">Thống kê</h1>

    <!-- Biểu đồ doanh thu hàng ngày -->
    <div class="row mb-4">
      <div class="col-md-6">
        <h5>Doanh thu hàng ngày</h5>
        <canvas id="revenueChart"></canvas>
      </div>

      <!-- Biểu đồ đơn hàng theo trạng thái -->
      <div class="col-md-6">
        <h5>Số lượng đơn hàng theo trạng thái</h5>
        <canvas id="orderStatusChart"></canvas>
      </div>
    </div>

    <!-- Sản phẩm bán chạy -->
    <div class="row mb-4">
      <div class="col-md-6">
        <h5>Sản phẩm bán chạy</h5>
        <ul class="list-group">
          <li
            v-for="product in topProducts"
            :key="product.id"
            class="list-group-item d-flex justify-content-between align-items-center"
          >
            {{ product.name }}
            <span class="badge bg-primary rounded-pill">{{ product.quantity }}</span>
          </li>
        </ul>
      </div>

      <!-- Khách hàng mới -->
      <div class="col-md-6">
        <h5>Khách hàng mới</h5>
        <ul class="list-group">
          <li
            v-for="customer in newCustomers"
            :key="customer.id"
            class="list-group-item"
          >
            {{ customer.name }} - {{ customer.phone }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";

const orders = ref([]);
const products = ref([]);
const customers = ref([]);
const topProducts = ref([]);
const newCustomers = ref([]);

const fetchData = async () => {
  const ordersResponse = await fetch("http://localhost:3000/orders");
  orders.value = await ordersResponse.json();

  const productsResponse = await fetch("http://localhost:3000/products");
  products.value = await productsResponse.json();

  const customersResponse = await fetch("http://localhost:3000/customers");
  customers.value = await customersResponse.json();

  calculateTopProducts();
  getNewCustomers();
  drawRevenueChart();
  drawOrderStatusChart();
};

const calculateTopProducts = () => {
  const productSales = {};

  orders.value.forEach((order) => {
    order.products.forEach((product) => {
      if (!productSales[product.id]) {
        productSales[product.id] = {
          name: product.name,
          quantity: 0,
        };
      }
      productSales[product.id].quantity += product.quantity;
    });
  });

  topProducts.value = Object.values(productSales).sort(
    (a, b) => b.quantity - a.quantity
  );
};

const getNewCustomers = () => {
  newCustomers.value = customers.value.slice(-5).reverse();
};

const drawRevenueChart = () => {
  const dailyRevenue = {};

  orders.value.forEach((order) => {
    if (!dailyRevenue[order.orderDate]) {
      dailyRevenue[order.orderDate] = 0;
    }
    dailyRevenue[order.orderDate] += order.total;
  });

  const labels = Object.keys(dailyRevenue);
  const data = Object.values(dailyRevenue);

  new Chart(document.getElementById("revenueChart"), {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Doanh thu (VND)",
          data,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
      },
    },
  });
};

const drawOrderStatusChart = () => {
  const statusCounts = {};

  orders.value.forEach((order) => {
    if (!statusCounts[order.status]) {
      statusCounts[order.status] = 0;
    }
    statusCounts[order.status] += 1;
  });

  const labels = Object.keys(statusCounts);
  const data = Object.values(statusCounts);

  new Chart(document.getElementById("orderStatusChart"), {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Số lượng đơn hàng",
          data,
          backgroundColor: ["#36a2eb", "#ff6384", "#ff9f40", "#4bc0c0"],
          borderColor: ["#36a2eb", "#ff6384", "#ff9f40", "#4bc0c0"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
      },
    },
  });
};

onMounted(fetchData);
</script>

<style>
.container {
  margin-top: 20px;
}
</style>
