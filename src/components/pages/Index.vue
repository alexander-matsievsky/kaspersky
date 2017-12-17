<template>
  <div class="index">
    <ul>
      <li><a href="/employees/list">Employees, list view</a></li>
      <li><a href="/employees/deck?s=name&q=ceo">Employees, deck view, ordered by name, matching "ceo"</a></li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Index',
    data () {
      return {}
    }
  }
</script>

<style scoped></style>
