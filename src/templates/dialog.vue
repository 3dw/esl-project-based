<template>
  <div class="dialog-template">
    <div class="template-header">
      <h3 class="template-title">{{ title }}</h3>
      <div v-if="topic" class="template-topic">
        <q-chip color="primary" text-color="white" icon="topic">
          {{ topic }}
        </q-chip>
      </div>
    </div>

    <div class="dialog-container">
      <div class="messages-area" ref="messagesArea">
        <div
          v-for="(message, index) in displayedMessages"
          :key="index"
          class="message"
          :class="{ 'user-message': message.isUser, 'system-message': !message.isUser }"
        >
          <div class="message-avatar">
            <q-icon
              :name="message.isUser ? 'person' : 'psychology'"
              :color="message.isUser ? 'primary' : 'secondary'"
            />
          </div>
          <div class="message-content">
            <div class="message-text">{{ message.text }}</div>
            <!-- <div v-if="message.hint" class="message-hint">
              <q-icon name="info" size="xs" />
              {{ message.hint }}
            </div> -->
          </div>
        </div>

        <div v-if="isTyping" class="message system-message">
          <div class="message-avatar">
            <q-icon name="psychology" color="secondary" />
          </div>
          <div class="message-content">
            <div class="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>

      <div class="input-area">
        <q-input
          v-model="userInput"
          :placeholder="currentPlaceholder"
          outlined
          dense
          class="message-input"
          @keyup.enter="sendMessage"
          :disable="isTyping"
        >
          <template v-slot:append>
            <q-btn
              @click="sendMessage"
              color="primary"
              icon="send"
              flat
              round
              :disable="!userInput.trim() || isTyping"
            />
          </template>
        </q-input>
      </div>

      <!-- <div v-if="currentHint" class="hint-area">
        <q-banner class="bg-blue-1 text-blue-8">
          <template v-slot:avatar>
            <q-icon name="lightbulb" color="blue" />
          </template>
          {{ currentHint }}
        </q-banner>
      </div>-->

      <!-- 錯誤提示 -->
      <div v-if="errorMessage" class="error-area">
        <q-banner class="bg-negative text-white">
          <template v-slot:avatar>
            <q-icon name="error" color="white" />
          </template>
          {{ errorMessage }}
          <template v-slot:action>
            <q-btn flat color="white" label="重試" @click="retryLastMessage" />
          </template>
        </q-banner>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, nextTick, defineProps, defineEmits } from 'vue';
import { api } from 'boot/axios';

// 定義組件名稱以符合 ESLint 規則
defineOptions({
  name: 'DialogTemplate',
});

interface DialogMessage {
  text: string;
  isUser: boolean;
  hint?: string;
}

interface DialogStep {
  systemMessage: string;
  placeholder?: string;
  hint?: string;
  expectedResponse?: string;
}

interface Props {
  title: string;
  topic?: string;
  steps: DialogStep[];
  placeholders?: string[];
  hints?: string[];
  apiEndpoint?: string;
}

const props = defineProps<Props>();
const emit = defineEmits(['completed', 'message-sent', 'api-response']);

const userInput = ref('');
const currentStepIndex = ref(0);
const displayedMessages = reactive<DialogMessage[]>([]);
const isTyping = ref(false);
const userResponses = reactive<string[]>([]);
const messagesArea = ref<HTMLElement>();
const errorMessage = ref('');
const conversationHistory = reactive<string[]>([]);
const lastUserMessage = ref('');

// API 端點設定
const API_ENDPOINT =
  props.apiEndpoint || 'https://esl-backend.alearn13994229.workers.dev/api/v1/dialog';

// 計算當前步驟的提示信息
const currentPlaceholder = computed(() => {
  return props.steps[currentStepIndex.value]?.placeholder || '請輸入您的問題或回應...';
});

// const currentHint = computed(() => {
//   return props.steps[currentStepIndex.value]?.hint;
// });

// 初始化第一個系統消息
if (props.steps.length > 0 && props.steps[0]) {
  displayedMessages.push({
    text: props.steps[0].systemMessage,
    isUser: false,
  });
}

// 調用後端 API
const callDialogAPI = async (prompt: string): Promise<string> => {
  try {
    const requestData = {
      topic: props.topic || '英語練習',
      history: conversationHistory.slice(), // 複製歷史記錄
      prompt: prompt,
    };

    console.log('API Request:', requestData);

    const response = await api.post(API_ENDPOINT, requestData);

    console.log('API Response:', response.data);

    if (response.data && response.data.response) {
      return response.data.response;
    } else {
      throw new Error('Invalid API response format');
    }
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

const sendMessage = async () => {
  if (!userInput.value.trim() || isTyping.value) return;

  const message = userInput.value.trim();
  lastUserMessage.value = message;
  userResponses.push(message);

  // 清除錯誤訊息
  errorMessage.value = '';

  // 添加用戶消息
  displayedMessages.push({
    text: message,
    isUser: true,
  });

  // 添加到對話歷史
  conversationHistory.push(message);

  emit('message-sent', {
    stepIndex: currentStepIndex.value,
    message: message,
    allResponses: [...userResponses],
    topic: props.topic,
  });

  userInput.value = '';

  // 滾動到底部
  await nextTick();
  scrollToBottom();

  // 顯示打字指示器
  isTyping.value = true;

  try {
    // 調用 API 獲取回應
    const aiResponse = await callDialogAPI(message);

    // 添加 AI 回應到對話歷史
    conversationHistory.push(aiResponse);

    // 隱藏打字指示器
    isTyping.value = false;

    // 添加 AI 回應
    displayedMessages.push({
      text: aiResponse,
      isUser: false,
    });

    emit(
      'api-response',
      {
        userMessage: message,
        aiResponse: aiResponse,
        topic: props.topic,
        timestamp: new Date().toISOString(),
      },
      currentStepIndex.value,
    );

    // 檢查是否完成對話
    if (currentStepIndex.value >= props.steps.length - 1) {
      emit('completed', {
        responses: userResponses,
        conversation: conversationHistory,
        topic: props.topic,
      });
    } else {
      currentStepIndex.value++;
    }
  } catch (error) {
    console.error('對話 API 錯誤:', error);
    isTyping.value = false;

    // 顯示錯誤訊息
    if (error instanceof Error) {
      errorMessage.value = `API 錯誤: ${error.message}`;
    } else {
      errorMessage.value = '無法連接到服務器，請檢查網路連接並重試。';
    }
  }

  await nextTick();
  scrollToBottom();
};

// 重試最後一條訊息
const retryLastMessage = async () => {
  if (lastUserMessage.value) {
    errorMessage.value = '';
    userInput.value = lastUserMessage.value;
    await sendMessage();
  }
};

const scrollToBottom = () => {
  if (messagesArea.value) {
    messagesArea.value.scrollTop = messagesArea.value.scrollHeight;
  }
};
</script>

<style scoped>
.dialog-template {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.template-header {
  text-align: center;
  margin-bottom: 20px;
}

.template-title {
  color: #1976d2;
  margin: 0 0 10px 0;
}

.template-topic {
  margin-top: 8px;
}

.dialog-container {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  background: white;
}

.messages-area {
  height: 400px;
  overflow-y: auto;
  padding: 16px;
  background: #fafafa;
}

.message {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  max-width: 80%;
}

.user-message {
  margin-left: auto;
  flex-direction: row-reverse;
}

.user-message .message-content {
  background: #1976d2;
  color: white;
}

.system-message .message-content {
  background: white;
  border: 1px solid #e0e0e0;
}

.message-avatar {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #f5f5f5;
}

.message-content {
  padding: 12px 16px;
  border-radius: 18px;
  max-width: 100%;
}

.message-text {
  line-height: 1.4;
}

.message-hint {
  margin-top: 8px;
  font-size: 0.85em;
  opacity: 0.8;
  display: flex;
  align-items: center;
  gap: 4px;
}

.typing-indicator {
  display: flex;
  gap: 4px;
  padding: 8px 0;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #999;
  animation: typing 1.4s infinite ease-in-out;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%,
  60%,
  100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-10px);
  }
}

.input-area {
  padding: 16px;
  border-top: 1px solid #e0e0e0;
}

.message-input {
  width: 100%;
}

.hint-area {
  padding: 0 16px 16px;
}

.error-area {
  padding: 0 16px 16px;
}

@media (max-width: 600px) {
  .message {
    max-width: 90%;
  }

  .dialog-container {
    margin: 0 -10px;
  }

  .messages-area {
    height: 300px;
  }
}
</style>
