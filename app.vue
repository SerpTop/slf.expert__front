<template>
  <div class="flex flex-col">
    <LoadingComponent :is-loading="showLoading" />

    <div
      v-if="!showLoading"
      class="overflow-hidden content"
    >
      <HeaderComponent
        v-if="homepage?.contacts"
        :contacts="homepage.contacts"
      />

      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>

      <FormComponent
        v-if="homepage?.contacts"
        :practices="homepage.practices.practices"
        :contacts="homepage.contacts"
      />

      <FooterComponent
        v-if="homepage?.contacts"
        :data="homepage.contacts"
      />

      <CookiesComponent :contacts="homepage?.contacts" />

      <BackToTopButton />

      <FormModal
        v-if="isOpen('form')"
        :data="homepage?.practices"
        :contacts="homepage?.contacts"
      />
    </div>
  </div>
</template>

<script setup>
  const config = useRuntimeConfig();
  const { isOpen } = useModal();
  const { homepage } = useHomepage();

  // Используем useFetch для правильного состояния загрузки
  const { data, pending, error } = await useFetch(`${config.public.strapi.url}/api/homepage`);
  if (data.value) homepage.value = data.value;

  // Состояние для плавного перехода
  const showLoading = ref(true);

  // Показываем LoadingComponent при первой загрузке
  onMounted(() => {
    // Если данные уже загружены (SSR), показываем LoadingComponent на короткое время
    if (!pending.value && data.value) {
      setTimeout(() => {
        showLoading.value = false;
      }, 1000); // 800ms для плавного перехода
    } else {
      // Если данные еще загружаются, ждем их
      watch(pending, (newPending) => {
        if (!newPending) {
          setTimeout(() => {
            showLoading.value = false;
          }, 1000);
        }
      });
    }
  });

  // Обработка ошибок
  if (error.value) {
    console.error("Ошибка загрузки данных:", error.value);
  }

  useHead({
    title: "Юридическая фирма Андрея Сёмина | Таможня, Налоги, Арбитраж",
    meta: [
      {
        name: "description",
        content:
          "Юридическая фирма, специализирующаяся на таможенных вопросах, арбитражных спорах и налоговом праве. Более 15 лет успешной практики.",
      },
    ],
  });
</script>
