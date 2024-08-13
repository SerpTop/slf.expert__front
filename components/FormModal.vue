<template>
    <div
      v-if="isFormOpen" 
      class="fixed top-0 right-0 w-full overflow-auto xl:max-w-[696px] 2xl:max-w-[984px] xl:h-screen z-[999] flex flex-col"
    >
      <div class="bg-blue-100 p-4">
        <div
          @click="closeForm"
          class="border border-blue-40 rounded-full ml-auto w-11 h-11 flex items-center justify-center cursor-pointer hover:border-white"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 10L15 15M10 10L5 5M10 10L5 15M10 10L15 5"
              stroke="white"
              stroke-width="1.7"
              stroke-linecap="round"
            />
          </svg>
        </div>
      </div>
      <FormComponent :select-option="selectedOption" modal class="flex-grow" />
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    isFormOpen: {
      type: Boolean,
      default: false
    },
    selectedOption: {
      type: String,
      default: 'Выберите практику'
    }
  });
  
  const emit = defineEmits(['update:isFormOpen']);
  
  function closeForm() {
    emit('update:isFormOpen', false);
  }
  </script>
  