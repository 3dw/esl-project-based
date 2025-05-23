<template>
  <q-page class="q-pa-md">
    <div class="text-h4 q-mb-lg">大家來拍照 - 拍照學英文</div>

    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">活動目標</div>
        <q-list>
          <q-item>
            <q-item-section avatar>
              <q-icon name="school" color="primary" />
            </q-item-section>
            <q-item-section> 學習與攝影相關的英文詞彙和表達方式 </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-icon name="school" color="primary" />
            </q-item-section>
            <q-item-section> 練習描述照片的英文句型 </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-icon name="school" color="primary" />
            </q-item-section>
            <q-item-section> 培養觀察力和表達能力 </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">活動流程</div>
        <q-timeline color="primary">
          <q-timeline-entry title="熱身活動 (5分鐘)" subtitle="認識攝影相關詞彙">
            <div>
              <p>學習基本攝影詞彙：</p>
              <ul>
                <li>Take a photo (拍照)</li>
                <li>Camera (相機)</li>
                <li>Smile (微笑)</li>
                <li>Pose (擺姿勢)</li>
                <li>Background (背景)</li>
              </ul>
            </div>
          </q-timeline-entry>

          <q-timeline-entry title="主要活動 (15分鐘)" subtitle="實際拍照練習">
            <div>
              <p>分組進行拍照活動：</p>
              <ol>
                <li>每組選擇一個主題（如：校園風景、同學互動等）</li>
                <li>輪流擔任攝影師和模特兒</li>
                <li>使用英文指導拍照姿勢和角度</li>
                <li>練習描述照片內容</li>
              </ol>
            </div>
          </q-timeline-entry>

          <q-timeline-entry title="分享與回饋 (10分鐘)" subtitle="展示與討論">
            <div>
              <p>小組分享：</p>
              <ul>
                <li>展示拍攝的照片</li>
                <li>用英文描述照片內容</li>
                <li>分享拍照過程中的有趣經歷</li>
                <li>互相給予回饋</li>
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
              <q-item-label>Can you take a photo of me/us?</q-item-label>
              <q-item-label caption>可以幫我/我們拍照嗎？</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>Please smile!</q-item-label>
              <q-item-label caption>請微笑！</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>This photo looks great!</q-item-label>
              <q-item-label caption>這張照片看起來很棒！</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>Let's take another one.</q-item-label>
              <q-item-label caption>我們再拍一張吧。</q-item-label>
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
              <q-icon name="photo_camera" color="secondary" />
            </q-item-section>
            <q-item-section> 創建照片故事：選擇幾張照片，用英文編寫一個小故事 </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-icon name="photo_camera" color="secondary" />
            </q-item-section>
            <q-item-section> 舉辦小型攝影展：展示作品並用英文介紹 </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'WhatIsThisPage',
});
</script>
