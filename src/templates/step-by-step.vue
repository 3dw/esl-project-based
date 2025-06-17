<template>
  <div class="step-by-step-template">
    <div class="template-header">
      <h3 class="template-title">{{ title }}</h3>
    </div>

    <div class="steps-container">
      <div
        v-for="(step, index) in allSteps"
        :key="index"
        class="step-item"
        :class="{ active: currentStep === index, completed: currentStep > index }"
      >
        <div class="step-number">
          <q-icon
            :name="currentStep > index ? 'check' : (index + 1).toString()"
            :color="currentStep > index ? 'positive' : currentStep === index ? 'primary' : 'grey-6'"
          />
        </div>

        <div class="step-content">
          <h4 class="step-title">{{ step.title }}</h4>
          <p class="step-description">{{ step.description }}</p>

          <div v-if="step.input" class="step-input">
            <q-input
              v-model="userInputs[index]"
              :placeholder="step.placeholder"
              :hint="step.hint"
              outlined
              dense
            />
          </div>

          <div v-if="currentStep === index" class="step-actions">
            <q-btn
              v-if="index > 0"
              @click="previousStep"
              color="grey-6"
              outline
              label="上一步"
              class="q-mr-sm"
            />
            <q-btn
              @click="nextStep"
              color="primary"
              :label="index === allSteps.length - 1 ? '完成' : '下一步'"
              :disable="step.input && !userInputs[index]"
            />
            <q-btn
              @click="addStepAfter(index)"
              color="secondary"
              outline
              icon="add"
              label="新增步驟"
              class="q-ml-sm"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 新增步驟的對話框 -->
    <q-dialog v-model="showAddStepDialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">新增步驟</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input v-model="newStep.title" label="步驟標題" outlined dense class="q-mb-md" />
          <q-input
            v-model="newStep.description"
            label="步驟描述"
            type="textarea"
            outlined
            dense
            class="q-mb-md"
          />
          <q-checkbox v-model="newStep.input" label="需要使用者輸入" />
          <q-input
            v-if="newStep.input"
            v-model="newStep.placeholder"
            label="輸入提示"
            outlined
            dense
            class="q-mt-md"
          />
          <q-input
            v-if="newStep.input"
            v-model="newStep.hint"
            label="提示說明"
            outlined
            dense
            class="q-mt-md"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="取消" color="primary" @click="cancelAddStep" />
          <q-btn flat label="新增" color="primary" @click="confirmAddStep" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, defineProps, defineEmits } from 'vue';

// 定義組件名稱以符合 ESLint 規則
defineOptions({
  name: 'StepByStepTemplate',
});

interface Step {
  title: string;
  description: string;
  input?: boolean;
  placeholder?: string;
  hint?: string;
}

interface Props {
  title: string;
  steps: Step[];
}

const props = defineProps<Props>();
const emit = defineEmits(['completed', 'step-changed', 'steps-updated']);

const currentStep = ref(0);
const userInputs = reactive<Record<number, string>>({});
const customSteps = ref<Step[]>([]);
const showAddStepDialog = ref(false);
const newStep = reactive<Step>({
  title: '',
  description: '',
  input: false,
  placeholder: '',
  hint: '',
});
const addingAfterIndex = ref(-1);

// 合併原始步驟和自定義步驟
const allSteps = computed(() => {
  return [...props.steps, ...customSteps.value];
});

const nextStep = () => {
  if (currentStep.value < allSteps.value.length - 1) {
    currentStep.value++;
    emit('step-changed', currentStep.value);
  } else {
    emit('completed', userInputs);
  }
};

const previousStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--;
    emit('step-changed', currentStep.value);
  }
};

const addStepAfter = (index: number) => {
  addingAfterIndex.value = index;
  // 重置新步驟表單
  newStep.title = '';
  newStep.description = '';
  newStep.input = false;
  newStep.placeholder = '';
  newStep.hint = '';
  showAddStepDialog.value = true;
};

const confirmAddStep = () => {
  if (newStep.title.trim() && newStep.description.trim()) {
    const stepToAdd: Step = {
      title: newStep.title.trim(),
      description: newStep.description.trim(),
    };

    if (newStep.input) {
      stepToAdd.input = true;
      if (newStep.placeholder) {
        stepToAdd.placeholder = newStep.placeholder;
      }
      if (newStep.hint) {
        stepToAdd.hint = newStep.hint;
      }
    }

    // 在指定位置後插入新步驟
    const insertIndex = addingAfterIndex.value + 1;
    customSteps.value.splice(insertIndex, 0, stepToAdd);

    // 更新當前步驟索引
    if (currentStep.value >= insertIndex) {
      currentStep.value++;
    }

    showAddStepDialog.value = false;
    emit('steps-updated', allSteps.value);
  }
};

const cancelAddStep = () => {
  showAddStepDialog.value = false;
};
</script>

<style scoped>
.step-by-step-template {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.template-header {
  text-align: center;
  margin-bottom: 30px;
}

.template-title {
  color: #1976d2;
  margin: 0;
}

.steps-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.step-item {
  display: flex;
  gap: 16px;
  padding: 20px;
  border-radius: 8px;
  border: 2px solid #e0e0e0;
  transition: all 0.3s ease;
}

.step-item.active {
  border-color: #1976d2;
  background-color: #f3f7ff;
}

.step-item.completed {
  border-color: #4caf50;
  background-color: #f1f8e9;
}

.step-number {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #f5f5f5;
  font-weight: bold;
}

.step-content {
  flex: 1;
}

.step-title {
  margin: 0 0 8px 0;
  color: #333;
}

.step-description {
  margin: 0 0 16px 0;
  color: #666;
  line-height: 1.5;
}

.step-input {
  margin-bottom: 16px;
}

.step-actions {
  display: flex;
  gap: 8px;
}

@media (max-width: 600px) {
  .step-item {
    flex-direction: column;
    gap: 12px;
  }

  .step-number {
    align-self: flex-start;
  }
}
</style>
