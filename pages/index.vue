<template>
  <div class="flex flex-col">
    <div class="overflow-hidden content">
      <MainBlock
        v-if="data?.hero"
        :data="data.hero"
      />

      <KeyPractices
        v-if="data?.practices"
        :data="data.practices"
      />

      <NumbersComponent
        v-if="data?.numbers"
        :data="data.numbers"
      />

      <CasesBlock
        v-if="data?.cases"
        :data="data.cases"
      />

      <ServiceOrder
        v-if="data?.services"
        :data="data.services"
      />

      <InfoBlock
        v-if="data?.info"
        :data="data.info"
      />

      <OurTeam
        v-if="data?.team"
        :data="data.team"
      />

      <CertificatesBlock
        v-if="data?.documents"
        :data="data.documents"
      />

      <VideoSlider
        v-if="data?.videos"
        :data="data.videos"
      />
    </div>
  </div>
</template>

<script setup>
  const { homepage: data } = useHomepage();

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
