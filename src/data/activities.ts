export interface Activity {
  id: number;
  name: string;
  description: string;
  category: string;
  duration: string;
  tags: string[];
  createdAt?: string;
  route?: string;
  href?: string;
}

export const activities: Activity[] = [
  {
    id: 0,
    name: '大家來拍照',
    description: '拍照學英文',
    category: '教學',
    duration: '30min~45min',
    tags: ['拍照', '學英文'],
    route: '/what-is-this',
    href: 'https://en.alearn.org.tw/what_is_this',
  },
  {
    id: 1,
    name: '到Subway點餐',
    description: '點餐學英文',
    category: '教學',
    duration: '10min~30min',
    tags: ['點餐', '學英文'],
    route: '/subway-order',
  },
  {
    id: 2,
    name: '寫一個網頁',
    description: '寫一個網頁',
    category: '自學',
    duration: '45min~120min',
    tags: ['寫網頁', '學英文'],
    route: '/write-a-webpage',
    href: 'https://codepen.io/',
  },
  {
    id: 3,
    name: '烤一個蛋糕',
    description: '烤一個蛋糕',
    category: '自學',
    duration: '60min~150min',
    tags: ['烤蛋糕', '學英文'],
    route: '/baking-cake',
  },
];
