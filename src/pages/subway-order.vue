<template>
  <q-page class="q-pa-md">
    <q-tabs v-model="tab" class="text-primary" align="left">
      <q-tab name="desc" label="活動說明" />
      <q-tab name="record" label="學習記錄" />
    </q-tabs>
    <q-separator />
    <div v-show="tab === 'desc'">
      <div class="text-h4 q-mb-lg">到Subway點餐 - 點餐學英文</div>

      <q-card class="q-mb-md">
        <q-card-section>
          <div class="text-h6">活動目標</div>
          <q-list>
            <q-item>
              <q-item-section avatar>
                <q-icon name="restaurant" color="primary" />
              </q-item-section>
              <q-item-section> 學習餐廳點餐相關的英文詞彙和表達方式 </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-icon name="restaurant" color="primary" />
              </q-item-section>
              <q-item-section> 練習在速食餐廳點餐的對話技巧 </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-icon name="restaurant" color="primary" />
              </q-item-section>
              <q-item-section>
                以Subway為例，因為Subway是互動式的，所以可以練習點餐對話
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-icon name="restaurant" color="primary" />
              </q-item-section>
              <q-item-section> 培養實際生活情境中的英語應用能力 </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>

      <q-card class="q-mb-md">
        <q-card-section>
          <div class="text-h6">活動流程</div>
          <q-timeline color="primary">
            <q-timeline-entry title="準備階段 (15分鐘)" subtitle="錄製關鍵用語">
              <div>
                <p>去點餐前，先把關鍵的用語錄音下來：</p>
                <ul>
                  <li>練習基本點餐句型</li>
                  <li>錄製自己的發音</li>
                  <li>熟悉 Subway 菜單詞彙</li>
                  <li>準備可能用到的表達方式</li>
                </ul>
              </div>
            </q-timeline-entry>

            <q-timeline-entry title="練習階段 (10分鐘)" subtitle="聽音核對">
              <div>
                <p>實際聽完自己的錄音，再核對兩次：</p>
                <ol>
                  <li>第一次聽錄音：檢查發音是否清楚</li>
                  <li>第二次聽錄音：確認語調和語速</li>
                  <li>對照標準發音進行修正</li>
                  <li>重新錄製需要改進的部分</li>
                </ol>
              </div>
            </q-timeline-entry>

            <q-timeline-entry title="實戰階段 (20分鐘)" subtitle="現場點餐">
              <div>
                <p>到現場點餐：</p>
                <ul>
                  <li>使用準備好的用語進行點餐</li>
                  <li>注意店員的回應和反應</li>
                  <li>記錄實際使用的效果</li>
                  <li>完成整個點餐流程</li>
                </ul>
              </div>
            </q-timeline-entry>

            <q-timeline-entry title="總結階段 (10分鐘)" subtitle="活動回顧">
              <div>
                <p>活動回顧：</p>
                <ul>
                  <li>分享點餐過程中的經驗</li>
                  <li>討論遇到的困難和解決方法</li>
                  <li>評估錄音練習的效果</li>
                  <li>規劃下次改進的方向</li>
                </ul>
              </div>
            </q-timeline-entry>
          </q-timeline>
        </q-card-section>
      </q-card>

      <q-card class="q-mb-md">
        <q-card-section>
          <div class="text-h6">實用句型</div>
          <q-list bordered separator>
            <q-item>
              <q-item-section>
                <q-item-label>I'd like a 6-inch Italian B.M.T., please.</q-item-label>
                <q-item-label caption>我要一個6吋的義大利B.M.T.。</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>What kind of bread would you like?</q-item-label>
                <q-item-label caption>您想要什麼麵包？</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Would you like it toasted?</q-item-label>
                <q-item-label caption>需要烤熱嗎？</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>What vegetables would you like?</q-item-label>
                <q-item-label caption>您想要什麼蔬菜？</q-item-label>
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
                <q-icon name="menu_book" color="secondary" />
              </q-item-section>
              <q-item-section> 設計自己的Subway菜單：用英文描述喜歡的組合 </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon name="restaurant_menu" color="secondary" />
              </q-item-section>
              <q-item-section> 錄製點餐對話：練習並錄製完整的點餐對話 </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
    <div v-show="tab === 'record'">
      <LearningRecord
        :metadata="{
          title: '到Subway點餐',
          steps: ['認識菜單詞彙', '練習點餐對話', '實際點餐', '分享心得'],
        }"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LearningRecord from 'src/components/LearningRecord.vue';

export default defineComponent({
  name: 'SubwayOrderPage',
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
