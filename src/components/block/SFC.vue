<template>
  <div id="car">
    <h1>Car</h1>
    <table>
      <tr>
        <th>多选操作</th>
        <th @click="sortByName">Name</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Total</th>
      </tr>
      <tr v-for="item in list" :key="item.id">
        <td>
          <input type="checkbox" v-model="item.isChecked">
        </td>
        <td>{{item.name}}</td>
        <td><input type="text" v-model="item.qty"></td>
        <td>{{item.price}}</td>
        <td>{{item.qty * item.price}}</td>
      </tr>
      <tr>
        <td colspan="4">Total</td>
        <td>{{total}}</td>
      </tr>
    </table>

    <button class="delete-btn" @click="deleteChecked">删除选中的商品</button>
  </div>
</template>

<script>
export default {
  name: "SFC",
  data() {
    return {
      list: [
        { id: 1, name: "Chicken Wing", category: "Food", qty: 3, price: 10 },
        { id: 2, name: "Pizza", category: "Food", qty: 1, price: 50 },
        { id: 3, name: "Hamburger", category: "Food", qty: 1, price: 12 },
        { id: 4, name: "Coca Cola", category: "Drink", qty: 2, price: 5 },
        { id: 5, name: "Orange Juice", category: "Drink", qty: 1, price: 15 },
        { id: 6, name: "Potato Chips", category: "Snack", qty: 1, price: 8 },
      ],
    }
  },
  computed: {
    total() {
      let sum = 0
      this.list.forEach((item) => {
        sum += item.qty * item.price
      })
      return sum
    }
  },
  methods: {
    sortByName() {
      this.list.sort((a, b) => {
        if (a.name > b.name) {
          return 1
        } else if (a.name < b.name) {
          return -1
        } else {
          return 0
        }
      })
    },
    deleteChecked() {
      this.list = this.list.filter((item) => {
        return item.isChecked !== true
      })
    }
  }
}
</script>

<style>
#car {
  margin-top: 100px;
  background-color: white;
}

#car table,
#car table td,
#car table th {
  border: 1px solid black;
  border-spacing: 0;
}

#car table td,
#car table th {
  padding: 5px 20px;
}

.delete-btn {
  border-radius: 5px;
  border: 1px solid red;
  background-color: white;
  padding: 5px 20px;
  margin-top: 10px;
  cursor: pointer;
  color: red;
  transition: 0.3s;
}

.delete-btn:hover {
  background-color: red;
  color: white;
}

#car table td input {
  outline: none;
  padding: 5px;
  border: none;
}
</style>