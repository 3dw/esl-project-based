<template lang="pug">
q-layout(view="lHh Lpr lFf")
  q-header(elevated)
    q-toolbar(class="bg-background")
      q-btn(
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="toggleLeftDrawer"
      )

      q-toolbar-title
        q-btn(
        flat
        dense
        round
        icon="menu_book"
        aria-label="LinguaTrack"
        icon-right="menu_book"
        :to="'/'"
      )
        span.text-primary LinguaTrack

      div 樣稿(開發中)

  q-drawer(
    v-model="leftDrawerOpen"
    show-if-above
    bordered
  )
    q-list
      q-item(
        :to="'/'"
        v-bind="{ icon: 'home', title: '首頁' }"
      )
        q-item-section(avatar)
          q-icon(name="home")
        q-item-section
          q-item-label 首頁
      q-item-label(header) 活動列表
      q-item(
        v-for="link in linksList"
        :key="link.title"
        v-bind="link"
        :to="`/activities/${link.id}`"
      )
        q-item-section(avatar)
          q-icon(:name="link.icon")
        q-item-section
          q-item-label {{ link.title }}

      q-separator.q-my-md

      q-item(
        clickable
        v-ripple
        href="https://github.com/3dw/esl-project-based"
        target="_blank"
        rel="noopener noreferrer"
      )
        q-item-section(avatar)
          q-icon(name="code")
        q-item-section
          q-item-label 本站原始碼

  q-page-container
    router-view
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { activities } from 'src/data/activities';

export default defineComponent({
  name: 'MainLayout',

  components: {},

  setup() {
    const leftDrawerOpen = ref(false);

    const linksList = activities
      .filter((activity) => activity.showInSidebar)
      .map((activity) => ({
        id: activity.id,
        title: activity.name,
        icon: activity.icon,
      }));

    return {
      linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
