<template>
  <div class="_container bg-blue-100 py-[60px] xl:py-20 2xl:py-[120px]">
    <h2 class="text-white">Записаться на консультацию</h2>
    <form action="" class="grid grid-cols-1 xl:grid-cols-2 gap-[30px]">
      <input
        v-for="(item, i) in form"
        :key="i"
        :type="item.type"
        :placeholder="item.placeholder"
        :required="item.require"
        v-model="formData[i]"
        :rows="item.rows"
        class="bg-transparent border-b h-[54px] text-sm 2xl:text-base border-blue-400 text-white"
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

      <button class="btn btn-white" :disabled="isFormInvalid">отправить</button>
    </form>
  </div>
</template>

<script setup>
const form = [
  {
    type: "text",
    placeholder: "Имя*",
    require: true,
  },
  {
    type: "tel",
    placeholder: "Телефон*",
    require: true,
  },
  {
    type: "email",
    placeholder: "E-mail",
    require: false,
  },
];
const selectOptions = [
  { value: "practice1", label: "Таможня " },
  { value: "practice2", label: "Налоги" },
  { value: "practice3", label: "Арбитражные споры" },
  { value: "practice4", label: "На Споры по исполнению госконтрактовлоги" },
  {
    value: "practice4",
    label: "Аудит юридических бизнес-процессов в компании",
  },
];
const formData = ref(Array(form.length).fill(""));
const isFormInvalid = computed(() => {
  for (let i = 0; i < form.length; i++) {
    if (form[i].require && !formData.value[i]) {
      return true;
    }
  }
  return false;
});
</script>
