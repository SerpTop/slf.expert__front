<template>
  <div
    class="2xl:pt-[9.375rem] md:pt-[7.5rem] pt-[6.25rem] bg-gray-400 py-[60px] sm:py-20 xl:py-[120px] 2xl:py-[200px]"
  >
    <div class="_container">
      <NuxtLink
        to="/faq"
        class="flex gap-2 items-center text-blue-100 text-lg 2xl:text-[1.625rem] mb-5 md:mb-11 2xl:mb-[100px]"
      >
        <IconArrowThin />
        Все вопросы
      </NuxtLink>
      <div class="flex flex-col gap-5 md:gap-6 xl:gap-[30px] 2xl:gap-10">
        <h1
          class="text-center fl-text-[1.5rem,4.25rem] leading-[120%] font-bold text-blue-100 uppercase pb-5 md:pb-6 xl:pb-[30px] 2xl:pb-10 border-b border-gray-100"
        >
          Как повышение госпошлин изменило таможенные споры?
        </h1>
        <div class="grid xl:grid-cols-[1fr_2fr_1fr] gap-5 md:gap-6 xl:gap-[30px] 2xl:gap-8">
          <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-1 xl:gap-5">
            <div class="bg-white p-5 2xl:p-[30px] flex flex-col gap-3 xl:gap-4 rounded-[20px]">
              <span
                class="pb-3 text-sm text-gray-500 border-b border-gray-100 xl:pb-4 2xl:text-base"
                >Подробнее</span
              >
              <div class="flex justify-between gap-1 xl:flex-col 2xl:flex-row">
                <span class="text-sm text-black 2xl:text-base">Дата:</span>
                <span class="text-base text-black 2xl:text-xl">01 августа 2025</span>
              </div>
              <div class="flex justify-between gap-1 xl:flex-col 2xl:flex-row">
                <span class="text-sm text-black 2xl:text-base">Категория:</span>
                <span class="text-base text-black 2xl:text-xl">Аудит бизнес-процессов</span>
              </div>
            </div>
            <div class="bg-white p-5 2xl:p-[30px] flex flex-col gap-3 xl:gap-4 rounded-[20px]">
              <span
                class="pb-3 text-sm text-gray-500 border-b border-gray-100 xl:pb-4 2xl:text-base"
                >Автор</span
              >
              <div
                class="flex gap-[10px] items-center xl:flex-col xl:items-start 2xl:flex-row 2xl:items-center"
              >
                <div class="bg-blue-100 h-[46px] w-[46px] rounded-full overflow-hidden">
                  <img
                    src="/images/avatar.png"
                    alt=""
                  />
                </div>
                <div class="flex flex-col gap-1">
                  <span class="text-base text-black 2xl:text-xl">Семин Андрей Сергеевич</span>
                  <span class="text-sm text-gray-500 2xl:text-base">Управляющий партнер</span>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-5 md:gap-6 xl:gap-[30px] 2xl:gap-[32px]">
            <img
              src="/images/faq.jpg"
              alt=""
              class="w-full h-[350px] object-cover rounded-[20px]"
            />
            <p class="text-black text-lg 2xl:text-[1.625rem]">
              Большинство юристов, работающих с судебными спорами, знают: с августа 2024 года в
              России резко выросла государственная пошлина. Это касается и подачи заявлений о
              признании незаконными решений государственных органов. Теперь за каждое обжалуемое
              решение (действие или бездействие) нужно заплатить 50 000 рублей вместо прежних 3 000
              рублей. Прошел почти год, и стало очевидно: нововведение особенно больно ударило по
              компаниям, занимающимся внешнеэкономической деятельностью (ВЭД). Почему и как
              изменились таможенные споры, а также какие варианты решения возникшей ситуации
              доступны — разбираем в статье.
            </p>
          </div>
          <div class="flex flex-col gap-3 xl:gap-4">
            <span
              class="w-full pb-3 text-sm text-gray-500 border-b border-gray-100 xl:pb-4 2xl:text-base"
              >Приложенные материалы:</span
            >
            <div class="flex flex-wrap gap-3 xl:flex-nowrap xl:flex-col xl:gap-4">
              <NuxtLink
                to=""
                class="flex gap-[10px] items-center cursor-pointer"
                v-for="(item, i) in [1, 2, 3]"
                :key="i"
              >
                <div class="bg-blue-100 h-[46px] w-[46px] rounded-full overflow-hidden">
                  <IconFileCircle />
                </div>
                <div class="flex flex-col gap-1">
                  <span class="text-sm text-blue-300 2xl:text-base">Документ 1</span>
                  <span class="text-xs text-blue-400 2xl:text-sm">[20 MB]</span>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
        <button class="mx-auto btn btn-main w-fit">СМОТРЕТЬ СЛЕДУЮЩИЙ ВОПРОС</button>
      </div>
    </div>
  </div>
</template>
<script setup>
  const config = useRuntimeConfig();
  const { isOpen } = useModal();

  // Используем useFetch для правильного состояния загрузки
  const { data, pending, error } = await useFetch(`${config.public.strapi.url}/api/homepage`);

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
