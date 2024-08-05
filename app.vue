<template>
  <div class="flex flex-col bg-blue-100">
    <LoadingComponent />
    <div v-if="loading"  class="content">
      <HeaderComponent />
      <MainBlock />
      <KeyPractices />
      <NumbersComponent />
      <CasesBlock />
      <InfoBlock />
      <CertificatesBlock />
      <FormComponent />
      <FooterComponent />
      <CookiesComponent />
      <BackToTopButton />
    </div>
  </div>
</template>

<script>
import { createPinia } from 'pinia';
import { useGlobalStore } from '@/stores/globalStore';
const store = useGlobalStore();
const globalVariable = store.globalVariable;
app.use(createPinia());
export default {
  data() {
    return {
      loading: false,
    };
  },
  mounted() {
    // Здесь нужно связать состояние загрузки с реальным процессом
    setTimeout(() => {
      this.loading = true;
    }, 3000); // 3 секунды для демонстрации
  },
};
</script>

<style>
.content {
  display: none;
}
.content:not([v-cloak]) {
  display: block;
}
</style>
