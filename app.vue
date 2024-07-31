<template>
  <div class="flex flex-col bg-blue-100">
    <LoadingComponent />
    <div  class="content">
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
    };
  },
  mounted() {
    // Здесь нужно связать состояние загрузки с реальным процессом
    setTimeout(() => {
      this.loading = false;
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
