<template>
  <q-page class="q-pa-md">
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
            <q-item-section> 培養實際生活情境中的英語應用能力 </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">活動流程</div>
        <q-timeline color="primary">
          <q-timeline-entry title="熱身活動 (10分鐘)" subtitle="認識Subway菜單詞彙">
            <div>
              <p>學習基本點餐詞彙：</p>
              <ul>
                <li>Bread (麵包)</li>
                <li>Meat (肉類)</li>
                <li>Cheese (起司)</li>
                <li>Vegetables (蔬菜)</li>
                <li>Sauce (醬料)</li>
                <li>Toasting (烤熱)</li>
              </ul>
            </div>
          </q-timeline-entry>

          <q-timeline-entry title="主要活動 (15分鐘)" subtitle="角色扮演點餐">
            <div>
              <p>分組進行點餐練習：</p>
              <ol>
                <li>每組分配角色（顧客、店員）</li>
                <li>使用Subway菜單進行點餐對話</li>
                <li>練習完整的點餐流程</li>
                <li>輪流扮演不同角色</li>
              </ol>
            </div>
          </q-timeline-entry>

          <q-timeline-entry title="情境對話 (10分鐘)" subtitle="實際應用">
            <div>
              <p>常見點餐情境：</p>
              <ul>
                <li>選擇麵包種類</li>
                <li>選擇肉類和起司</li>
                <li>選擇蔬菜和醬料</li>
                <li>確認訂單和付款</li>
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
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SubwayOrderPage',
});
</script>
