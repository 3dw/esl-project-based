<template>
  <q-page class="q-pa-md">
    <div class="text-h4 q-mb-lg">寫一個網頁 - 寫網頁學英文</div>

    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">活動目標</div>
        <q-list>
          <q-item>
            <q-item-section avatar>
              <q-icon name="code" color="primary" />
            </q-item-section>
            <q-item-section> 學習網頁開發相關的英文詞彙和術語 </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-icon name="code" color="primary" />
            </q-item-section>
            <q-item-section> 練習閱讀和理解英文技術文檔 </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-icon name="code" color="primary" />
            </q-item-section>
            <q-item-section> 培養程式設計思維和英文表達能力 </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">活動流程</div>
        <q-timeline color="primary">
          <q-timeline-entry title="熱身活動 (15分鐘)" subtitle="認識網頁開發詞彙">
            <div>
              <p>學習基本網頁開發詞彙：</p>
              <ul>
                <li>HTML (超文本標記語言)</li>
                <li>CSS (層疊樣式表)</li>
                <li>JavaScript (網頁程式語言)</li>
                <li>Element (元素)</li>
                <li>Style (樣式)</li>
                <li>Function (函數)</li>
              </ul>
            </div>
          </q-timeline-entry>

          <q-timeline-entry title="主要活動 (60分鐘)" subtitle="實作簡單網頁">
            <div>
              <p>使用 CodePen 創建網頁：</p>
              <ol>
                <li>註冊 CodePen 帳號</li>
                <li>創建新的 Pen 專案</li>
                <li>使用 HTML 建立基本結構</li>
                <li>使用 CSS 設計樣式</li>
                <li>使用 JavaScript 添加互動效果</li>
              </ol>
            </div>
          </q-timeline-entry>

          <q-timeline-entry title="分享與討論 (15分鐘)" subtitle="展示作品">
            <div>
              <p>作品分享：</p>
              <ul>
                <li>展示完成的網頁</li>
                <li>用英文解釋程式碼</li>
                <li>分享學習心得</li>
                <li>討論遇到的問題和解決方法</li>
              </ul>
            </div>
          </q-timeline-entry>
        </q-timeline>
      </q-card-section>
    </q-card>

    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">實用程式碼範例</div>
        <q-list bordered separator>
          <q-item>
            <q-item-section>
              <q-item-label>HTML 基本結構</q-item-label>
              <q-item-label caption>
                <pre class="bg-grey-2 q-pa-sm rounded-borders">
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
  &lt;title&gt;My First Webpage&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;h1&gt;Hello World!&lt;/h1&gt;
&lt;/body&gt;
&lt;/html&gt;</pre
                >
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>CSS 樣式</q-item-label>
              <q-item-label caption>
                <pre class="bg-grey-2 q-pa-sm rounded-borders">
body {
  background-color: #f0f0f0;
  font-family: Arial, sans-serif;
}
h1 {
  color: #333;
  text-align: center;
}</pre
                >
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
              <q-icon name="code" color="secondary" />
            </q-item-section>
            <q-item-section> 創建個人作品集：用英文撰寫專案說明 </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-icon name="code" color="secondary" />
            </q-item-section>
            <q-item-section> 參與開源專案：閱讀和貢獻英文技術文檔 </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <q-card class="q-mt-md">
      <q-card-section>
        <div class="text-h6">相關資源</div>
        <q-list>
          <q-item clickable v-ripple :href="'https://codepen.io/'" target="_blank">
            <q-item-section avatar>
              <q-icon name="link" color="primary" />
            </q-item-section>
            <q-item-section> CodePen - 線上網頁編輯器 </q-item-section>
          </q-item>
          <q-item clickable v-ripple href="https://www.w3schools.com/" target="_blank">
            <q-item-section avatar>
              <q-icon name="link" color="primary" />
            </q-item-section>
            <q-item-section> W3Schools - 網頁開發學習資源 </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'WriteAWebpagePage',
});
</script>

<style lang="scss" scoped>
pre {
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
