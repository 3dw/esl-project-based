// 活動範例：

export interface Step {
  title: string;
  description: string;
  input?: boolean;
  placeholder?: string;
  hint?: string;
}

export interface Activity {
  id: number;
  name: string;
  description: string;
  category: string;
  useTemplates: string[]; // 使用模版
  duration: string;
  tags: string[];
  createdAt?: string;
  route?: string;
  href?: string;
  icon?: string;
  showInSidebar?: boolean;
  steps?: Step[];
}

export const activities: Activity[] = [
  {
    id: 0,
    name: '大家來拍照',
    description: '拍照學英文',
    category: '教學',
    useTemplates: ['step-by-step'],
    duration: '30min~45min',
    tags: ['拍照', '學英文'],
    icon: 'photo',
    showInSidebar: true,
    href: 'https://en.alearn.org.tw/what_is_this',
    steps: [
      {
        title: '拍照',
        description: '拍照學英文',
      },
    ],
  },
  {
    id: 1,
    name: '到Subway點餐',
    description: '點餐學英文',
    category: '教學',
    useTemplates: ['dialog'],
    duration: '10min~30min',
    tags: ['點餐', '學英文'],
    icon: 'fastfood',
    showInSidebar: true,
  },
  {
    id: 2,
    name: '做一道菜',
    description: '做一道菜',
    category: '自學',
    useTemplates: ['step-by-step'],
    duration: '60min~150min',
    tags: ['做菜', '學英文'],
    icon: 'cake',
    steps: [
      {
        title: '做一道菜',
        description: '做一道菜',
      },
    ],
    showInSidebar: true,
  },
  {
    id: 3,
    name: '採買食材',
    description: '採買食材',
    category: '自學',
    useTemplates: ['step-by-step', 'dialog'],
    duration: '10min~30min',
    tags: ['採買', '學英文'],
    icon: 'shopping_cart',
    steps: [
      {
        title: '採買食材',
        description: '採買食材',
      },
    ],
    showInSidebar: true,
  },
];
