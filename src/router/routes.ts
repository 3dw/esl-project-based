import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'what-is-this', component: () => import('pages/what-is-this.vue') },
      { path: 'subway-order', component: () => import('pages/subway-order.vue') },
      { path: 'write-a-webpage', component: () => import('pages/write-a-webpage.vue') },
      { path: 'baking-cake', component: () => import('pages/baking-cake.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
