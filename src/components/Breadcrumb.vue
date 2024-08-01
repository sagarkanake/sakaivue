<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
              <i class="pi pi-box pr-2"></i>

      <li v-for="(crumb, index) in breadcrumbs" :key="index" class="breadcrumb-item" :class="{ 'active': index === breadcrumbs.length - 1 }">
        <router-link v-if="index !== breadcrumbs.length - 1" :to="crumb.path">{{ crumb.meta.breadcrumb }}</router-link>
        <span v-else>{{ crumb.meta.breadcrumb }}</span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const breadcrumbs = computed(() => {
  const pathArray = route.path.split('/').filter(p => p);
  const breadcrumbArray = [];
  
  pathArray.reduce((prev, curr) => {
    const path = `${prev}/${curr}`;
    const routeMatch = route.matched.find(r => r.path === path);
    if (routeMatch && routeMatch.meta.breadcrumb) {
      breadcrumbArray.push({ path, meta: routeMatch.meta });
    }
    return path;
  }, '');

  return breadcrumbArray;
});
</script>

<style scoped>
.breadcrumb {
  margin-left: 0px;
}


.breadcrumb-item {
  display: inline-block;
}

.breadcrumb-item + .breadcrumb-item::before {
  display: inline-block;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
  /* color: #6c757d; */
  content: ">";
}

.breadcrumb-item > router-link {
  color: #007bff;
  text-decoration: none;
}

.breadcrumb-item > router-link:hover {
  text-decoration: underline;
}

.breadcrumb-item.active > span {
  color: #6c757d;
}
</style>
