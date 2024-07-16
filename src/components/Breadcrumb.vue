<!-- Breadcrumb.vue -->
<template>
  <nav aria-label="breadcrumb" class="breadcrumb-nav">
    <ol class="breadcrumb">
      <li v-for="(breadcrumb, index) in breadcrumbs" :key="index" class="breadcrumb-item">
        <router-link v-if="breadcrumb.path" :to="breadcrumb.path">{{ breadcrumb.meta.breadcrumb }}</router-link>
        <span v-else>{{ breadcrumb.meta.breadcrumb }}</span>
        <!-- Add the ">" separator if it's not the last breadcrumb item -->
        <span v-if="index < breadcrumbs.length - 1"> > </span>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  computed: {
    breadcrumbs() {
      let breadcrumbs = [];
      let matched = this.$route.matched;

      matched.forEach((route) => {
        if (route.meta && route.meta.breadcrumb) {
          breadcrumbs.push({
            path: route.path,
            meta: route.meta
          });
        }
      });

      return breadcrumbs;
    }
  }
};
</script>

<style scoped>
.breadcrumb-nav {
    margin-left: 80px;
  /* background-color: #f8f9fa; */
  padding: 0.75rem 1rem;
}

.breadcrumb {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.breadcrumb-item {
  margin-right: 5px;
}

.breadcrumb-item::after {
  content: '/';
  margin-left: 5px;
}

.breadcrumb-item:last-child::after {
  content: '';
}
</style>
