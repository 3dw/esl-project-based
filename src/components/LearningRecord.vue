<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="text-h6">學習歷程記錄</div>
        <div class="q-mb-md">活動：{{ metadata.title }}</div>
        <q-input v-model="record.name" label="姓名" outlined class="q-mb-sm" />
        <q-input v-model="record.date" label="日期" outlined class="q-mb-sm" type="date" />
        <q-input
          v-model="record.reflection"
          label="學習心得"
          type="textarea"
          outlined
          class="q-mb-sm"
        />
        <q-uploader
          label="上傳學習照片"
          accept="image/*"
          :auto-upload="false"
          :multiple="true"
          @added="onFilesAdded"
          class="q-mb-md"
        />
        <div class="q-mb-md">
          <div
            v-for="(element, index) in images"
            :key="index"
            class="q-mb-md q-pa-sm bg-grey-2 rounded-borders row items-center"
          >
            <img :src="element.url" alt="學習照片" style="max-width: 120px" class="q-mr-md" />
            <q-input
              v-model="element.caption"
              :label="`圖說（第${index + 1}張）`"
              type="textarea"
              outlined
              class="q-mt-xs"
              style="flex: 1"
              :rows="3"
              autogrow
            />
          </div>
        </div>
        <q-btn color="primary" @click="downloadPDF" label="下載PDF" />
      </q-card-section>
    </q-card>
    <!-- 隱藏的PDF內容（實際可見於頁面外，供 html2canvas 渲染） -->
    <div
      class="pdf-content"
      ref="pdfContent"
      style="position: absolute; left: -9999px; top: 0; width: 800px"
    >
      <div class="text-h4">{{ metadata.title }}</div>
      <br />
      <p>姓名：{{ record.name }}</p>
      <p>日期：{{ record.date }}</p>
      <p>學習心得：{{ record.reflection }}</p>
      <div v-for="(item, idx) in images" :key="idx" style="margin-bottom: 16px">
        <img :src="item.url" style="max-width: 300px" />
        <div>圖說：{{ item.caption }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Pica from 'pica';
import heic2any from 'heic2any';

const props = defineProps<{
  metadata: {
    title: string;
    steps?: string[];
    [key: string]: any;
  };
}>();

const record = ref({
  name: '',
  date: '',
  reflection: '',
});

type ImageItem = {
  url: string;
  caption: string;
};

const images = ref<ImageItem[]>([]);

async function processImage(file: File): Promise<string> {
  try {
    // 檢查是否為 HEIC/HEIF 格式
    const isHeic =
      (file.type === '' || file.type === 'image/heic' || file.type === 'image/heif') &&
      (file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif'));

    let processedFile = file;

    // 處理 HEIC/HEIF 格式
    if (isHeic) {
      try {
        const blob = await heic2any({
          blob: file,
          toType: 'image/jpeg',
          quality: 0.95,
        });

        const resultBlob = Array.isArray(blob) ? blob[0] : blob;
        if (!resultBlob) {
          throw new Error('HEIC 轉換結果為空');
        }
        processedFile = new File(
          [resultBlob],
          file.name.replace(/\.(heic|HEIC|heif|HEIF)$/, '.jpg'),
          {
            type: 'image/jpeg',
          },
        );
      } catch (error) {
        const heicError = error as Error;
        if (heicError.message?.includes('already browser readable')) {
          console.log('檔案已經是可讀格式，繼續處理');
        } else {
          console.error('HEIC 轉換錯誤:', heicError);
          throw new Error('HEIC 圖片轉換失敗');
        }
      }
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          // 設定最大尺寸限制
          const MAX_DIMENSION = 1200; // 提高解析度以確保 PDF 品質
          let targetWidth = img.width;
          let targetHeight = img.height;

          // 如果圖片尺寸超過限制，等比例縮小
          if (img.width > MAX_DIMENSION || img.height > MAX_DIMENSION) {
            if (img.width > img.height) {
              targetWidth = MAX_DIMENSION;
              targetHeight = Math.round(img.height * (MAX_DIMENSION / img.width));
            } else {
              targetHeight = MAX_DIMENSION;
              targetWidth = Math.round(img.width * (MAX_DIMENSION / img.height));
            }
          }

          // 建立臨時 canvas
          const tempCanvas = document.createElement('canvas');
          tempCanvas.width = targetWidth;
          tempCanvas.height = targetHeight;
          const tempCtx = tempCanvas.getContext('2d');
          tempCtx?.drawImage(img, 0, 0, targetWidth, targetHeight);

          // 建立目標 canvas
          const targetCanvas = document.createElement('canvas');
          targetCanvas.width = targetWidth;
          targetCanvas.height = targetHeight;

          // 使用 Pica 進行高品質縮放
          const pica = new Pica({
            features: ['js', 'wasm', 'cib'],
          });

          pica
            .resize(tempCanvas, targetCanvas, {
              quality: 3,
              unsharpAmount: 80,
              unsharpRadius: 0.6,
              unsharpThreshold: 2,
            })
            .then(() => {
              // 轉換為 JPEG
              const dataURL = targetCanvas.toDataURL('image/jpeg', 0.95);
              resolve(dataURL);
            })
            .catch((error) => {
              reject(new Error(`圖片縮放失敗: ${error.message}`));
            });
        };
        img.onerror = () => reject(new Error('圖片載入失敗'));
        img.src = event.target?.result as string;
      };
      reader.onerror = () => reject(new Error('檔案讀取失敗'));
      reader.readAsDataURL(processedFile);
    });
  } catch (error) {
    console.error('圖片處理錯誤:', error);
    throw error instanceof Error ? error : new Error('未知的圖片處理錯誤');
  }
}

async function onFilesAdded(files: readonly any[]) {
  try {
    for (const file of Array.from(files)) {
      if (file instanceof File) {
        try {
          const processedImageUrl = await processImage(file);
          images.value.push({
            url: processedImageUrl,
            caption: props.metadata.steps?.[images.value.length] || '',
          });
        } catch (error) {
          console.error('處理圖片失敗:', error);
          alert(`處理圖片 ${file.name} 失敗，請重試`);
        }
      }
    }
  } catch (error) {
    console.error('上傳檔案處理錯誤:', error);
    alert('上傳檔案處理失敗，請重試');
  }
}

const pdfContent = ref<HTMLElement | null>(null);

async function downloadPDF() {
  if (!pdfContent.value) return;

  try {
    // 等待所有圖片載入完成並轉換為 JPEG
    const images = pdfContent.value.getElementsByTagName('img');
    const processedImages = await Promise.all(
      Array.from(images).map(async (img) => {
        return new Promise((resolve, reject) => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('無法創建 canvas context'));
            return;
          }

          // 設定 canvas 尺寸
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;

          // 確保圖片已載入
          if (img.complete) {
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL('image/jpeg', 0.95));
          } else {
            img.onload = () => {
              ctx.drawImage(img, 0, 0);
              resolve(canvas.toDataURL('image/jpeg', 0.95));
            };
            img.onerror = () => reject(new Error('圖片載入失敗'));
          }
        });
      }),
    );

    // 替換所有圖片為處理後的 JPEG
    Array.from(images).forEach((img, index) => {
      const processedImage = processedImages[index];
      if (typeof processedImage === 'string') {
        img.src = processedImage;
      } else {
        throw new Error('圖片處理結果格式錯誤');
      }
    });

    // 等待圖片更新完成
    await new Promise((resolve) => setTimeout(resolve, 100));

    const canvas = await html2canvas(pdfContent.value, {
      scale: 2,
      useCORS: true,
      logging: false,
      imageTimeout: 0,
      allowTaint: true,
      backgroundColor: '#ffffff',
    });

    // 產生圖片資料，並檢查格式
    let imgData = canvas.toDataURL('image/jpeg', 0.95);
    // Debug: 輸出前 100 字元及格式
    console.log('imgData:', imgData.substring(0, 100));
    let imgFormat: 'JPEG' | 'PNG';
    if (/^data:image\/jpeg/i.test(imgData)) {
      imgFormat = 'JPEG';
    } else if (/^data:image\/png/i.test(imgData)) {
      imgFormat = 'PNG';
    } else {
      // fallback to PNG
      imgData = canvas.toDataURL('image/png');
      imgFormat = 'PNG';
    }
    console.log('imgFormat:', imgFormat);

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    // 如果內容超過一頁，自動分頁
    let heightLeft = pdfHeight;
    let position = 0;
    let page = 1;

    pdf.addImage(imgData, imgFormat, 0, position, pdfWidth, pdfHeight);
    heightLeft -= pdf.internal.pageSize.getHeight();

    while (heightLeft > 0) {
      position = -pdf.internal.pageSize.getHeight() * page;
      pdf.addPage();
      pdf.addImage(imgData, imgFormat, 0, position, pdfWidth, pdfHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();
      page++;
    }

    pdf.save(`${props.metadata.title}-學習歷程.pdf`);
  } catch (error) {
    console.error('PDF 生成錯誤:', error);
    alert('PDF 生成失敗，請稍後再試');
  }
}
</script>

<style scoped>
.pdf-content {
  padding: 1rem;
}
</style>
