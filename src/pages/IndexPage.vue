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

interface Activity {
  id: number;
  name: string;
  description: string;
  category: string;
  duration: string;
  tags: string[];
  createdAt?: string;
  route?: string;
  href?: string;
}

export default defineComponent({
  name: 'IndexPage',

  components: {},

  setup() {
    const searchQuery = ref('');
    const activities = ref<Activity[]>([
      {
        id: 0,
        name: '大家來拍照',
        description: '拍照學英文',
        category: '教學',
        duration: '10min~30min',
        tags: ['拍照', '學英文'],
        route: '/what-is-this',
      },
      {
        id: 1,
        name: '寫一個網頁',
        description: '寫一個網頁',
        category: '自學',
        duration: '10min~30min',
        tags: ['寫網頁', '學英文'],
        href: 'https://codepen.io/',
      },
      {
        id: 2,
        name: '烤一個蛋糕',
        description: '烤一個蛋糕',
        category: '自學',
        duration: '10min~30min',
        tags: ['烤蛋糕', '學英文'],
        route: '/baking-cake',
      },
    ]);

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
