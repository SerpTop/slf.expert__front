<template>
  <div class="flex flex-col">
    <LoadingComponent />

    <div v-if="loading" class="overflow-hidden content">
      <HeaderComponent v-if="data.contacts" :contacts="data.contacts" />

      <MainBlock v-if="data.hero" :data="data.hero" />

      <KeyPractices v-if="data.practices" :data="data.practices" />

      <NumbersComponent v-if="data.numbers" :data="data.numbers" />

      <CasesBlock v-if="data.cases" :data="data.cases" />

      <InfoBlock v-if="data.info" :data="data.info" />

      <CertificatesBlock v-if="data.documents" :data="data.documents" />

      <FormComponent
        v-if="data.contacts"
        :practices="data.practices.practices"
        :contacts="data.contacts"
      />

      <FooterComponent v-if="data.contacts" :data="data.contacts" />

      <CookiesComponent :contacts="data.contacts" />

      <BackToTopButton />

      <FormModal
        v-if="isOpen('form')"
        :data="data.practices"
        :contacts="data.contacts"
      />
    </div>
  </div>
</template>

<script setup>
const { isOpen } = useModal();

const loading = ref(false);

onMounted(() => {
  setTimeout(() => {
    loading.value = true;
  }, 3000); // 3 секунды для демонстрации
});

const data = await $fetch("http://127.0.0.1:1337/api/homepage");
</script>
