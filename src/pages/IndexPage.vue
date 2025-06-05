<template>
  <q-page class="q-pa-md">
    <!-- 搜尋欄 -->
    <div class="row q-mb-md">
      <q-input
        v-model="searchQuery"
        dense
        outlined
        placeholder="搜尋活動..."
        class="col-12 col-md-6"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>

    <!-- 活動卡片網格 -->
    <div class="row q-col-gutter-md">
      <div
        v-for="activity in filteredActivities"
        :key="activity.id"
        class="col-12 col-sm-6 col-md-4"
      >
        <q-card class="activity-card">
          <q-card-section>
            <div class="text-h6 q-mb-sm">{{ activity.name }}</div>
            <div class="text-subtitle2 q-mb-sm">{{ activity.description }}</div>
            <div class="text-subtitle2 q-mb-sm">
              <q-icon name="category" size="xs" class="q-mr-xs" />
              {{ activity.category }}
            </div>
            <div class="text-subtitle2 q-mb-sm">
              <q-icon name="schedule" size="xs" class="q-mr-xs" />
              {{ activity.duration }}
            </div>
            <div class="q-gutter-xs">
              <q-chip
                v-for="tag in activity.tags"
                :key="tag"
                size="sm"
                color="primary"
                text-color="white"
                class="q-ma-xs"
              >
                {{ tag }}
              </q-chip>
            </div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              v-if="activity.route"
              flat
              color="primary"
              :to="activity.route"
              label="查看詳情"
            />
            <q-btn
              v-if="activity.href"
              flat
              color="primary"
              :href="activity.href"
              target="_blank"
              rel="noopener noreferrer"
              label="相關網站"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import type { Activity } from 'src/data/activities';
import { activities as staticActivities } from 'src/data/activities';

export default defineComponent({
  name: 'IndexPage',

  components: {},

  setup() {
    const searchQuery = ref('');
    const activities = ref<Activity[]>(staticActivities);

    // 過濾活動列表
    const filteredActivities = computed(() => {
      if (!searchQuery.value) return activities.value;

      const query = searchQuery.value.toLowerCase();
      return activities.value.filter(
        (activity) =>
          activity.name.toLowerCase().includes(query) ||
          activity.description.toLowerCase().includes(query) ||
          activity.category.toLowerCase().includes(query) ||
          activity.tags.some((tag) => tag.toLowerCase().includes(query)),
      );
    });

    return {
      activities,
      searchQuery,
      filteredActivities,
    };
  },
});
</script>

<style lang="scss" scoped>
.activity-card {
  height: 100%;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
}
</style>
