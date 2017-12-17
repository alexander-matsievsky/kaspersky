<template>
  <article>
    <form>
      <label>
        <span>Display</span>
        <select v-model="display">,
          <option value="board">Board View</option>
          <option value="deck">Deck View</option>
          <option value="list">List View</option>
        </select>
      </label>
      <div>
        <label>
          <span>Ordering</span>
          <select v-model="ordering.prop">
            <option value="email">Email</option>
            <option value="name">Name</option>
            <option value="occupation">Occupation</option>
            <option value="phone">Phone</option>
            <option value="username">Username</option>
          </select>
        </label>
        <label>
          <span>ascending</span>
          <input type="checkbox" v-model="ordering.asc">
        </label>
      </div>
      <label>
        <span>Filtering</span>
        <input type="search" v-model="filtering">
        <span v-if="this.search">({{this.search.size}}/{{employees.length}})</span>
      </label>
    </form>
    <ul :data-display="display">
      <li
        :data-even="getOrder(employee.id) % 2 === 0"
        :data-excluded="getExcluded(employee.id)"
        :key="employee.id"
        :style="{order: getOrder(employee.id)}"
        class="employee"
        v-for="employee of employees"
      >
        <img
          :alt="employee.name"
          :src="employee.avatar"
          class="avatar"
          height="128px"
          width="128px"
        >
        <div class="email">{{employee.email}}</div>
        <div class="group">{{employee.group || 'Unmanaged'}}</div>
        <div class="name">{{employee.name}}</div>
        <div class="occupation">{{employee.occupation}}</div>
        <div class="phone">{{employee.phone}}</div>
        <div class="username">{{employee.username}}</div>
      </li>
    </ul>
  </article>
</template>

<script>
  import { employees } from '../../data/employees'
  import { order } from '../../data/order'
  import { search } from '../../data/search'

  export default {
    name: 'EmployeeList',
    created () {
      employees.val.subscribe(val => {
        this.employees = Array.from(val.values())
      })
      order.subscribe(order => {
        this.order = order
      })
      search.val.subscribe(search => {
        this.search = search
        this.$forceUpdate()
      })
      if (this.$route.query.q) {
        search.push(this.$route.query.q)
      }
    },
    watch: {
      filtering (term) {
        search.push(term)
      }
    },
    data () {
      const {q = '', s = 'name'} = this.$route.query
      const {display = 'list'} = this.$route.params
      return {
        display,
        employees: [],
        filtering: q,
        ordering: {
          asc: true,
          prop: s
        }
      }
    },
    methods: {
      getExcluded (id) {
        return this.search ? !this.search.has(id) : false
      },
      getOrder (id) {
        if (!this.order) return 0
        const order = this.order[this.ordering.prop]
        return this.ordering.asc ? order.get(id) : order.size - order.get(id)
      }
    }
  }
</script>

<style scoped lang="postcss">
  ul[data-display=list] {
    display: flex;
    flex-flow: column;
    padding: 1rem;
    width: 100%;
    .employee {
      &[data-even=true] {
        background-color: ghostwhite;
      }
      &[data-excluded=true] {
        display: none;
      }
      display: flex;
      flex-flow: row;
      height: 2rem;
      line-height: 2rem;
      & > div {
        width: 20%;
      }
      .avatar {
        display: none;
      }
      .email {
        order: 3
      }
      .group {
        order: 4
      }
      .name {
        order: 1
      }
      .occupation {
        display: none;
      }
      .phone {
        order: 5
      }
      .username {
        order: 2
      }
    }
  }

  ul[data-display=deck] {
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    .employee {
      &[data-excluded=true] {
        display: none;
      }
      align-items: center;
      border-radius: .1rem;
      box-shadow: 0 0 .1rem gray;
      display: flex;
      flex-flow: column nowrap;
      height: 16rem;
      justify-content: space-between;
      margin: 1rem;
      padding: 1rem;
      width: 12rem;
      background-color: ghostwhite;
      .avatar {
        order: 2
      }
      .email {
        display: none;
      }
      .group {
        order: 3
      }
      .name {
        font-weight: bolder;
        order: 1
      }
      .occupation {
        display: none;
      }
      .phone {
        font-size: small;
        order: 4
      }
      .username {
        display: none;
      }
    }
  }
</style>
