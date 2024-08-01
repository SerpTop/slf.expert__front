<template>
  <div
    class="_container flex flex-col gap-4 sm:gap-5 xl:gap-[30px] 2xl:gap-10 bg-blue-100 py-[60px] xl:py-20 2xl:py-[120px]"
  >
    <!-- Заголовок формы -->
    <h2 ref="formTitle" v-show="isFormSent === false" class="text-white">Записаться на консультацию</h2>

    <!-- Форма -->
    <form ref="formElement" v-show="isFormSent === false" action="" class="grid grid-cols-1 xl:grid-cols-2 gap-[30px]">
      <input
        v-for="(item, i) in form"
        :key="i"
        :type="item.type"
        :placeholder="item.placeholder"
        :required="item.require"
        v-model="formData[i]"
        :rows="item.rows"
        class="bg-transparent border-b h-[54px] text-sm 2xl:text-base border-blue-400 text-white"
        :ref="`formInput_${i}`" 
      />

      <select
        v-model="formData[i]"
        class="bg-transparent border-b text-sm 2xl:text-base border-blue-400 text-white"
      >
        <option value="">Выберите практику</option>
        <option
          v-for="(option, index) in selectOptions"
          :key="index"
          :value="option.value"
          class="bg-[#00113A] p-5"
        >
          {{ option.label }}
        </option>
      </select>
      <textarea
        class="bg-transparent border-b text-sm 2xl:text-base border-blue-400 text-white xl:col-span-2"
        rows="4"
      >
Комментарий
      </textarea>
      <label
        for=""
        class="xl:col-span-2 flex items-center justify-center gap-2 relative cursor-pointer"
      >
        <input type="file" class="opacity-0 absolute h-full cursor-pointer" />
        <div
          class="h-11 w-11 bg-blue-500 2xl:w-[54px] 2xl:h-[54px] rounded-full"
        ></div>
        <div class="flex flex-col">
          <span class="text-sm text-blue-300 2xl:text-base"
            >Подгрузить документ</span
          >
          <span class="text-blue-400 text-sm 2xl:text-base"
            >Не более [20 MB]</span
          >
        </div>
      </label>
      <label
        class="flex items-center gap-2 text-sm 2xl:text-base xl:col-span-2 justify-center"
      >
        <input type="checkbox" class="accent-blue-100" />
        <span class="text-white"> Я согласен на обработку</span>
        <a href="" class="text-blue-300"> Персональных данных.</a>
      </label>

      <button class="btn btn-white xl:col-span-2" :disabled="isFormInvalid" @click.prevent="isFormSent = true">
        отправить
      </button>
    </form>

    <!-- Сообщение после отправки формы -->
    <div v-show="isFormSent" class="flex flex-col items-center justify-center gap-5 sm:gap-[30px] 2xl:gap-10 w-full fl-max-w-[360px,904px] mx-auto ">
      <h2 class="text-white text-center">
        Спасибо, данные успешно <br />
        отправлены!
      </h2>
      <span class="text-base 2xl:text-xl text-white text-center"
        >Ваша заявка успешно отправлена, и мы уже приступаем к ее рассмотрению.
        В ближайшее время мы свяжемся с вами, чтобы обсудить ваш вопрос.
        Мы отвечаем на заявки не позднее двух дней — по возможности
        раньше.</span
      >
      <span class="text-base 2xl:text-xl text-white text-center"
        >Если у вас срочный вопрос вы можете связаться с нами прямо сейчас
        по контактам ниже:</span
      >
      <div
        class="grid grid-cols-2 sm:grid-cols-4 w-full gap-[9px] sm:gap-4 xl:gap-6 2xl:gap-8"
      >
        <a
          :href="item.link"
          v-for="(item, i) in links"
          :key="i"
          class="text-white text-sm 2xl:text-base w-full h-11 sm:h-[54px] 2xl:h-[64px] border-white border rounded-full flex items-center justify-center"
        >
        <NuxtImg v-show="item && item.icon" :name="item.icon"/>
          {{ item.title }}
        </a>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const isFormSent = ref(false);
const form = [
  { type: "text", placeholder: "Имя*", require: true },
  { type: "tel", placeholder: "Телефон*", require: true },
  { type: "email", placeholder: "E-mail", require: false }
];
const links = [
  { title: "+8 (831) 414 04 02", link: "" },
  { title: "+7 (903) 601 04 02", link: "" },
  { title: "slf.expert", link: "", icon: "" },
  { title: "slf.expert", link: "", icon: "" }
];
const selectOptions = [
  { value: "practice1", label: "Таможня " },
  { value: "practice2", label: "Налоги" },
  { value: "practice3", label: "Арбитражные споры" },
  { value: "practice4", label: "На Споры по исполнению госконтрактовлоги" },
  { value: "practice4", label: "Аудит юридических бизнес-процессов в компании" }
];
const formData = ref(Array(form.length).fill(""));
const isFormInvalid = computed(() => {
  return form.some((item, i) => item.require && !formData.value[i]);
});

const formTitle = ref(null);
const formElement = ref(null);
const formInputs = form.map((_, i) => ref(null)); // Массив рефов для каждого элемента формы

onMounted(() => {
  // Анимация заголовка формы
  gsap.fromTo(formTitle.value,
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 3,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: formTitle.value,
        start: 'top 80%',
        end: 'top 60%',
        scrub: true,
        markers: false,
      }
    }
  );

  // Анимация элементов формы
  gsap.fromTo(formElement.value,
    { y: 50,opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 3,
      ease: 'power3.out',
      stagger: 0.3, // Задержка между анимацией элементов
      scrollTrigger: {
        trigger: formElement.value,
        start: 'top 70%',
        end: 'top 50%',
        scrub: true,
        markers: false,
      }
    }
  );

  // Анимация каждого элемента формы по очереди
  formInputs.forEach((inputRef, i) => {
    gsap.fromTo(inputRef.value,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        delay: i * 0.3, // Задержка между анимацией элементов
        scrollTrigger: {
          trigger: inputRef.value,
          start: 'top 80%',
          end: 'top 60%',
          scrub: true,
          markers: false,
        }
      }
    );
  });
});
</script>


