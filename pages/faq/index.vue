<template>
  <div
    class="2xl:pt-[9.375rem] md:pt-[7.5rem] pt-[6.25rem] bg-gray-400 py-[60px] sm:py-20 xl:py-[120px] 2xl:py-[200px]"
  >
    <div class="_container">
      <NuxtLink
        to="/"
        class="flex gap-2 items-center text-blue-100 text-lg 2xl:text-[1.625rem] mb-5 md:mb-11 2xl:mb-[100px]"
      >
        <IconArrowThin />

        Главная
      </NuxtLink>

      <div class="flex flex-col gap-5 md:gap-6 xl:gap-[30px] 2xl:gap-10">
        <div class="flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
          <h1 class="fl-text-[1.625rem,5.125rem] leading-[120%] font-bold text-blue-100 uppercase">
            Отвечаем на ваши вопросы
          </h1>
        </div>

        <div class="flex flex-col">
          <FaqCard
            v-for="(item, i) in data || []"
            :key="item.slug || i"
            :index="i + 1"
            :date="item.date"
            :category="item.category?.title"
            :category-slug="item.category?.slug"
            :title="item.title"
            :slug="item.slug"
          />
        </div>

        <button class="btn btn-main w-full md:w-[311px] mx-auto">смотреть еще</button>
      </div>
    </div>
  </div>
</template>
<script setup>
  const config = useRuntimeConfig();
  const { isOpen } = useModal();

  // Загружаем список FAQ-элементов с бэкенда
  const { data, pending, error } = await useFetch(`${config.public.strapi.url}/api/faq-items`);

  // Состояние для плавного перехода
  const showLoading = ref(true);

  // Показываем LoadingComponent при первой загрузке
  onMounted(() => {
    // Если данные уже загружены (SSR), показываем LoadingComponent на короткое время
    if (!pending.value && data.value) {
      setTimeout(() => {
        showLoading.value = false;
      }, 800); // 800ms для плавного перехода
    } else {
      // Если данные еще загружаются, ждем их
      watch(pending, (newPending) => {
        if (!newPending) {
          setTimeout(() => {
            showLoading.value = false;
          }, 800);
        }
      });
    }
  });

  // Обработка ошибок
  if (error.value) {
    console.error('Ошибка загрузки данных:', error.value);
  }

  useHead({
    title: 'Юридическая фирма Андрея Сёмина | Таможня, Налоги, Арбитраж',
    meta: [
      {
        name: 'description',
        content:
          'Юридическая фирма, специализирующаяся на таможенных вопросах, арбитражных спорах и налоговом праве. Более 15 лет успешной практики.',
      },
    ],
  });
</script>
