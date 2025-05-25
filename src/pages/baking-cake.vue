<template>
  <q-page class="q-pa-md">
    <q-tabs v-model="tab" class="text-primary" align="left">
      <q-tab name="desc" label="活動說明" />
      <q-tab name="record" label="學習記錄" />
    </q-tabs>
    <q-separator />
    <div v-show="tab === 'desc'">
      <div class="text-h4 q-mb-lg">烤一個蛋糕 - 烤蛋糕學英文</div>

      <q-card class="q-mb-md">
        <q-card-section>
          <div class="text-h6">活動目標</div>
          <q-list>
            <q-item>
              <q-item-section avatar>
                <q-icon name="cake" color="primary" />
              </q-item-section>
              <q-item-section> 學習烘焙相關的英文詞彙和表達方式 </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon name="cake" color="primary" />
              </q-item-section>
              <q-item-section> 練習閱讀和理解英文食譜 </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon name="cake" color="primary" />
              </q-item-section>
              <q-item-section> 培養動手能力和英語應用能力 </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>

      <q-card class="q-mb-md">
        <q-card-section>
          <div class="text-h6">活動流程</div>
          <q-timeline color="primary">
            <q-timeline-entry title="熱身活動 (15分鐘)" subtitle="認識烘焙詞彙">
              <div>
                <p>學習基本烘焙詞彙：</p>
                <ul>
                  <li>Ingredients (食材)</li>
                  <li>Measurements (測量)</li>
                  <li>Temperature (溫度)</li>
                  <li>Mix (混合)</li>
                  <li>Bake (烘烤)</li>
                  <li>Frosting (糖霜)</li>
                </ul>
              </div>
            </q-timeline-entry>

            <q-timeline-entry title="主要活動 (90分鐘)" subtitle="製作蛋糕">
              <div>
                <p>製作簡單蛋糕：</p>
                <ol>
                  <li>準備食材和工具</li>
                  <li>閱讀英文食譜</li>
                  <li>按照步驟製作</li>
                  <li>裝飾蛋糕</li>
                  <li>拍照記錄過程</li>
                </ol>
              </div>
            </q-timeline-entry>

            <q-timeline-entry title="分享與品嚐 (15分鐘)" subtitle="成果展示">
              <div>
                <p>分享時刻：</p>
                <ul>
                  <li>展示成品</li>
                  <li>用英文描述製作過程</li>
                  <li>分享製作心得</li>
                  <li>品嚐並給予回饋</li>
                </ul>
              </div>
            </q-timeline-entry>
          </q-timeline>
        </q-card-section>
      </q-card>

      <q-card class="q-mb-md">
        <q-card-section>
          <div class="text-h6">食譜範例</div>
          <q-list bordered separator>
            <q-item>
              <q-item-section>
                <q-item-label>Ingredients (食材)</q-item-label>
                <q-item-label caption>
                  <ul>
                    <li>2 cups all-purpose flour (2杯中筋麵粉)</li>
                    <li>1 cup sugar (1杯糖)</li>
                    <li>1/2 cup butter (1/2杯奶油)</li>
                    <li>2 eggs (2顆蛋)</li>
                    <li>1 cup milk (1杯牛奶)</li>
                    <li>1 tsp baking powder (1茶匙泡打粉)</li>
                  </ul>
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Instructions (步驟)</q-item-label>
                <q-item-label caption>
                  <ol>
                    <li>Preheat oven to 350°F (預熱烤箱至350°F)</li>
                    <li>Mix dry ingredients (混合乾料)</li>
                    <li>Add wet ingredients (加入濕料)</li>
                    <li>Pour into pan (倒入烤模)</li>
                    <li>Bake for 30 minutes (烤30分鐘)</li>
                  </ol>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>

      <q-card>
        <q-card-section>
          <div class="text-h6">延伸活動</div>
          <q-list>
            <q-item>
              <q-item-section avatar>
                <q-icon name="restaurant" color="secondary" />
              </q-item-section>
              <q-item-section> 創建英文食譜部落格：記錄烘焙經驗 </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon name="video_library" color="secondary" />
              </q-item-section>
              <q-item-section> 錄製烘焙教學影片：用英文解說製作過程 </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>

      <q-card class="q-mt-md">
        <q-card-section>
          <div class="text-h6">安全提醒</div>
          <q-list>
            <q-item>
              <q-item-section avatar>
                <q-icon name="warning" color="warning" />
              </q-item-section>
              <q-item-section> 使用烤箱時請注意安全，建議有成人陪同 </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon name="warning" color="warning" />
              </q-item-section>
              <q-item-section> 處理食材前請務必洗手，保持環境清潔 </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
    <div v-show="tab === 'record'">
      <LearningRecord
        :metadata="{
          title: '烤一個蛋糕',
          steps: ['準備食材和工具', '閱讀英文食譜', '製作蛋糕', '裝飾蛋糕', '分享成果'],
        }"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LearningRecord from 'src/components/LearningRecord.vue';

export default defineComponent({
  name: 'BakingCakePage',
  components: {
    LearningRecord,
  },
  data() {
    return {
      tab: 'desc',
    };
  },
});
</script>
