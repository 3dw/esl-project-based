<template>
  <q-page class="activity-page">
    <div class="page-container">
      <div class="page-header">
        <h2 class="page-title">{{ activity?.name || '' }}</h2>
        <p class="page-subtitle">選擇不同的學習模板來開始您的學習之旅</p>
      </div>

      <!-- 模板選擇器 -->
      <div v-if="!selectedTemplate" class="template-selector">
        <div class="template-cards">
          <q-card
            v-for="template in availableTemplates"
            :key="template.type"
            class="template-card"
            clickable
            @click="selectTemplate(template)"
          >
            <q-card-section class="text-center">
              <q-icon :name="template.icon" size="48px" :color="template.color" />
              <h4 class="template-name">{{ template.name }}</h4>
              <p class="template-description">{{ template.description }}</p>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <!-- 活動模板渲染區域 -->
      <div v-else class="template-container">
        <div class="template-header">
          <q-btn
            @click="resetTemplate"
            color="grey-6"
            icon="arrow_back"
            outline
            label="返回選擇"
            class="q-mb-md"
          />
        </div>

        <!-- Step-by-Step 模板 -->
        <step-by-step
          v-if="selectedTemplate.type === 'step-by-step'"
          :title="selectedTemplate.title"
          :steps="selectedTemplate.steps"
          @completed="onTemplateCompleted"
          @step-changed="onStepChanged"
          @steps-updated="onStepsUpdated"
        />

        <!-- Dialog 模板 -->
        <dialog-template
          v-if="selectedTemplate.type === 'dialog'"
          :title="selectedTemplate.title"
          :topic="activity?.name || '英語練習'"
          :steps="selectedTemplate.steps"
          @completed="onTemplateCompleted"
          @message-sent="onMessageSent"
          @api-response="onApiResponse"
        />

        <!-- 組合模板 -->
        <div v-if="selectedTemplate.type === 'combined'" class="combined-templates">
          <div
            v-for="(template, index) in selectedTemplate.templates"
            :key="index"
            class="template-section"
          >
            <step-by-step
              v-if="template.type === 'step-by-step'"
              :title="template.title"
              :steps="template.steps"
              @completed="(data) => onCombinedTemplateCompleted(index, data)"
              @step-changed="onStepChanged"
            />

            <dialog-template
              v-if="template.type === 'dialog'"
              :title="template.title"
              :topic="activity?.name || '英語練習'"
              :steps="template.steps"
              @completed="(data) => onCombinedTemplateCompleted(index, data)"
              @message-sent="onMessageSent"
              @api-response="onApiResponse"
            />
          </div>
        </div>
      </div>

      <!-- 學習記錄 -->
      <div v-if="learningRecords.length > 0" class="learning-records">
        <h3>學習記錄</h3>
        <div class="records-list">
          <q-card v-for="(record, index) in learningRecords" :key="index" class="record-card">
            <q-card-section>
              <div class="record-header">
                <h5>{{ record.templateName }}</h5>
                <q-chip :color="record.completed ? 'positive' : 'warning'">
                  {{ record.completed ? '已完成' : '進行中' }}
                </q-chip>
              </div>
              <p class="record-time">{{ formatTime(record.timestamp) }}</p>
              <div v-if="record.data" class="record-data">
                <pre>{{ JSON.stringify(record.data, null, 2) }}</pre>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import StepByStep from '../templates/step-by-step.vue';
import DialogTemplate from '../templates/dialog.vue';
import { activities } from '../data/activities';

const route = useRoute();

interface TemplateOption {
  type: 'step-by-step' | 'dialog';
  name: string;
  description: string;
  icon: string;
  color: string;
  title: string;
  steps: any[];
}

interface LearningRecord {
  templateName: string;
  completed: boolean;
  timestamp: Date;
  data?: any;
}

const activity = activities.find((activity) => activity.id == Number(route.params.id));

const selectedTemplate = ref<any>(null);
const learningRecords = reactive<LearningRecord[]>([]);

const availableTemplates: TemplateOption[] = [
  {
    type: 'step-by-step',
    name: '步驟式學習',
    description: '通過一步步的指導完成學習任務',
    icon: 'list_alt',
    color: 'primary',
    title: '步驟式學習範例',
    steps: [
      {
        title: '準備階段',
        description: '在開始之前，請確保您已經準備好所需的材料和工具。',
        input: true,
        placeholder: '請列出您準備的材料...',
        hint: '例如：筆記本、筆、電腦等',
      },
      {
        title: '學習階段',
        description: '開始學習新的概念和技能。',
        input: true,
        placeholder: '請描述您學到了什麼...',
        hint: '記錄重要的知識點和技能',
      },
      {
        title: '實踐階段',
        description: '將學到的知識應用到實際練習中。',
        input: true,
        placeholder: '請描述您如何應用所學...',
        hint: '具體說明實踐過程和遇到的挑戰',
      },
      {
        title: '總結階段',
        description: '回顧整個學習過程，總結經驗和心得。',
        input: true,
        placeholder: '請寫下您的學習心得...',
        hint: '包括成功的地方和需要改進的地方',
      },
    ],
  },
  {
    type: 'dialog',
    name: '對話式學習',
    description: '通過互動對話的方式進行學習',
    icon: 'chat',
    color: 'secondary',
    title: '對話式學習範例',
    steps: [
      {
        systemMessage:
          '歡迎來到對話式學習！我是您的學習助手。首先，請告訴我您今天想要學習什麼主題？',
        placeholder: '請輸入您想說的話...',
        hint: '可以是任何您感興趣的主題，例如：程式設計、語言學習、烹飪等',
      },
      {
        systemMessage:
          '很好的選擇！現在請告訴我，您對這個主題已經有多少了解？您是完全初學者還是有一些基礎？',
        placeholder: '請輸入您想說的話...',
        hint: '例如：我對這個主題已經有一些了解，我喜歡理論學習，因為我喜歡理解概念，而不是實作練習',
      },
    ],
  },
];

const selectTemplate = (template: TemplateOption) => {
  selectedTemplate.value = template;
};

const resetTemplate = () => {
  selectedTemplate.value = null;
};

const onTemplateCompleted = (data: any) => {
  learningRecords.push({
    templateName: selectedTemplate.value.title,
    completed: true,
    timestamp: new Date(),
    data: data,
  });

  console.log('模板完成:', data);
};

const onStepChanged = (stepIndex: number) => {
  console.log('步驟變更:', stepIndex);
};

const onMessageSent = (messageData: any) => {
  console.log('發送消息:', messageData);
};

const onCombinedTemplateCompleted = (templateIndex: number, data: any) => {
  console.log(`組合模板 ${templateIndex} 完成:`, data);
};

const onStepsUpdated = (updatedSteps: any[]) => {
  console.log('步驟更新:', updatedSteps);
};

const onApiResponse = (response: any, idx: number) => {
  console.log('API 回應:', response);
  // 如果selectedTemplate.value.steps[idx]不存在，則新增
  if (!selectedTemplate.value.steps[idx]) {
    selectedTemplate.value.steps[idx] = {
      systemMessage: response,
      placeholder: '請輸入您想說的話...',
      hint: '例如：我對這個主題已經有一些了解，我喜歡理論學習，因為我喜歡理解概念，而不是實作練習',
    };
  } else {
    // 依照activity的name，修改selectedTemplate.value.steps[idx].systemMessage
    selectedTemplate.value.steps[idx].systemMessage = response;
  }
};

const formatTime = (date: Date) => {
  return date.toLocaleString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

onMounted(() => {
  console.log('ActivityPage mounted');
});
</script>

<style scoped>
.activity-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
}

.page-title {
  color: #1976d2;
  margin: 0 0 10px 0;
  font-size: 2.5rem;
}

.page-subtitle {
  color: #666;
  font-size: 1.1rem;
  margin: 0;
}

.template-selector {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.template-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.template-card {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.template-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.template-name {
  margin: 16px 0 8px 0;
  color: #333;
}

.template-description {
  color: #666;
  margin: 0;
}

.custom-activity-card {
  max-width: 600px;
  margin: 0 auto;
}

.template-container {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.combined-templates {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.template-section {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
}

.learning-records {
  margin-top: 40px;
}

.records-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.record-card {
  background: white;
}

.record-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.record-header h5 {
  margin: 0;
  color: #333;
}

.record-time {
  color: #666;
  font-size: 0.9rem;
  margin: 0 0 12px 0;
}

.record-data {
  background: #f5f5f5;
  padding: 12px;
  border-radius: 4px;
  font-size: 0.85rem;
}

.record-data pre {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
}

@media (max-width: 768px) {
  .page-container {
    padding: 15px;
  }

  .page-title {
    font-size: 2rem;
  }

  .template-cards {
    grid-template-columns: 1fr;
  }

  .combined-templates {
    gap: 20px;
  }

  .template-section {
    padding: 15px;
  }
}
</style>
