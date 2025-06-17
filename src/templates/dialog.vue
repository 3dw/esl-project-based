<template>
  <div class="dialog-template">
    <div class="template-header">
      <h3 class="template-title">{{ title }}</h3>
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
            <div v-if="message.hint" class="message-hint">
              <q-icon name="info" size="xs" />
              {{ message.hint }}
            </div>
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

      <div v-if="currentHint" class="hint-area">
        <q-banner class="bg-blue-1 text-blue-8">
          <template v-slot:avatar>
            <q-icon name="lightbulb" color="blue" />
          </template>
          {{ currentHint }}
        </q-banner>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, nextTick, defineProps, defineEmits } from 'vue';

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
  steps: DialogStep[];
  placeholders?: string[];
  hints?: string[];
}

const props = defineProps<Props>();
const emit = defineEmits(['completed', 'message-sent']);

const userInput = ref('');
const currentStepIndex = ref(0);
const displayedMessages = reactive<DialogMessage[]>([]);
const isTyping = ref(false);
const userResponses = reactive<string[]>([]);
const messagesArea = ref<HTMLElement>();

// 計算當前步驟的提示信息
const currentPlaceholder = computed(() => {
  return props.steps[currentStepIndex.value]?.placeholder || '請輸入您的回應...';
});

const currentHint = computed(() => {
  return props.steps[currentStepIndex.value]?.hint;
});

// 初始化第一個系統消息
if (props.steps.length > 0 && props.steps[0]) {
  displayedMessages.push({
    text: props.steps[0].systemMessage,
    isUser: false,
  });
}

const sendMessage = async () => {
  if (!userInput.value.trim() || isTyping.value) return;

  const message = userInput.value.trim();
  userResponses.push(message);

  // 添加用戶消息
  displayedMessages.push({
    text: message,
    isUser: true,
  });

  emit('message-sent', {
    stepIndex: currentStepIndex.value,
    message: message,
    allResponses: [...userResponses],
  });

  userInput.value = '';

  // 滾動到底部
  await nextTick();
  scrollToBottom();

  // 移動到下一步
  if (currentStepIndex.value < props.steps.length - 1) {
    currentStepIndex.value++;
    await showTypingIndicator();

    const currentStep = props.steps[currentStepIndex.value];
    if (currentStep) {
      const messageData: DialogMessage = {
        text: currentStep.systemMessage,
        isUser: false,
      };
      if (currentStep.hint) {
        messageData.hint = currentStep.hint;
      }
      displayedMessages.push(messageData);
    }
  } else {
    // 對話完成
    emit('completed', userResponses);
  }

  await nextTick();
  scrollToBottom();
};

const showTypingIndicator = () => {
  return new Promise((resolve) => {
    isTyping.value = true;
    setTimeout(
      () => {
        isTyping.value = false;
        resolve(true);
      },
      1000 + Math.random() * 1000,
    ); // 1-2秒隨機延遲
  });
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
  margin: 0;
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
