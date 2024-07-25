import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';

const routes = [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('@/views/Dashboard.vue')
      },
      {
        path: 'sales',
        meta: { breadcrumb: 'Sales' },
        children: [
          {
            path: 'orders',
            name: 'sales-orders',
            component: () => import('@/views/SalesOrders.vue'),
            meta: { breadcrumb: 'Orders' },
            children : [
              {
                path: 'new-orders',
                name: 'NewOrders',
                component: () => import('@/views/NewOrder.vue'),
                meta: { breadcrumb: 'New Order' }
              },
            ]
          },
          {
            path: 'invoices',
            name: 'sales-invoices',
            component: () => import('@/views/Invoices.vue'),
            meta: { breadcrumb: 'Invoices' }
          },
          {
            path: 'rejects',
            name: 'sales-rejects',
            component: () => import('@/views/Rejects.vue'),
            meta: { breadcrumb: 'Rejects' }
          },
          {
            path: 'flash-sales',
            name: 'flash-sales',
            component: () => import('@/views/FlashSales.vue'),
            meta: { breadcrumb: 'Flash Sales' }
          },
          {
            path: 'coupons',
            name: 'coupons',
            component: () => import('@/views/Coupons.vue'),
            meta: { breadcrumb: 'Coupons' }
          },
          {
            path: 'customers',
            name: 'customers',
            component: () => import('@/views/Customers.vue'),
            meta: { breadcrumb: 'Customers' }
          },
          {
            path: 'new-customers',
            name: 'NewCustomers',
            component: () => import('@/views/NewCustomer.vue'),
            meta: { breadcrumb: 'New Customer' }
          },
          
          
          // Add more Sales child routes here
        ]
      },
      {
        path: 'uikit/formlayout',
        name: 'formlayout',
        component: () => import('@/views/uikit/FormLayout.vue')
      },
      {
        path: 'uikit/input',
        name: 'input',
        component: () => import('@/views/uikit/Input.vue')
      },
      {
        path: 'uikit/floatlabel',
        name: 'floatlabel',
        component: () => import('@/views/uikit/FloatLabel.vue')
      },
      {
        path: 'uikit/invalidstate',
        name: 'invalidstate',
        component: () => import('@/views/uikit/InvalidState.vue')
      },
      {
        path: 'uikit/button',
        name: 'button',
        component: () => import('@/views/uikit/Button.vue')
      },
      {
        path: 'uikit/table',
        name: 'table',
        component: () => import('@/views/uikit/Table.vue')
      },
      {
        path: 'uikit/list',
        name: 'list',
        component: () => import('@/views/uikit/List.vue')
      },
      {
        path: 'uikit/tree',
        name: 'tree',
        component: () => import('@/views/uikit/Tree.vue')
      },
      {
        path: 'uikit/panel',
        name: 'panel',
        component: () => import('@/views/uikit/Panels.vue')
      },
      {
        path: 'uikit/overlay',
        name: 'overlay',
        component: () => import('@/views/uikit/Overlay.vue')
      },
      {
        path: 'uikit/media',
        name: 'media',
        component: () => import('@/views/uikit/Media.vue')
      },
      {
        path: 'uikit/menu',
        component: () => import('@/views/uikit/Menu.vue'),
        children: [
          {
            path: '',
            component: () => import('@/views/uikit/menu/PersonalDemo.vue')
          },
          {
            path: 'seat',
            component: () => import('@/views/uikit/menu/SeatDemo.vue')
          },
          {
            path: 'payment',
            component: () => import('@/views/uikit/menu/PaymentDemo.vue')
          },
          {
            path: 'confirmation',
            component: () => import('@/views/uikit/menu/ConfirmationDemo.vue')
          }
        ]
      },
      {
        path: 'uikit/message',
        name: 'message',
        component: () => import('@/views/uikit/Messages.vue')
      },
      {
        path: 'uikit/file',
        name: 'file',
        component: () => import('@/views/uikit/File.vue')
      },
      {
        path: 'uikit/charts',
        name: 'charts',
        component: () => import('@/views/uikit/Chart.vue')
      },
      {
        path: 'uikit/misc',
        name: 'misc',
        component: () => import('@/views/uikit/Misc.vue')
      },
      {
        path: 'blocks',
        name: 'blocks',
        component: () => import('@/views/utilities/Blocks.vue')
      },
      {
        path: 'utilities/icons',
        name: 'icons',
        component: () => import('@/views/utilities/Icons.vue')
      },
      {
        path: 'pages/timeline',
        name: 'timeline',
        component: () => import('@/views/pages/Timeline.vue')
      },
      {
        path: 'pages/empty',
        name: 'empty',
        component: () => import('@/views/pages/Empty.vue')
      },
      {
        path: 'pages/crud',
        name: 'crud',
        component: () => import('@/views/pages/Crud.vue')
      },
      {
        path: 'documentation',
        name: 'documentation',
        component: () => import('@/views/utilities/Documentation.vue')
      }
    ]
  },
  {
    path: '/landing',
    name: 'landing',
    component: () => import('@/views/pages/Landing.vue')
  },
  {
    path: '/pages/notfound',
    name: 'notfound',
    component: () => import('@/views/pages/NotFound.vue')
  },
  {
    path: '/auth/login',
    name: 'login',
    component: () => import('@/views/pages/auth/Login.vue')
  },
  {
    path: '/auth/access',
    name: 'accessDenied',
    component: () => import('@/views/pages/auth/Access.vue')
  },
  {
    path: '/auth/error',
    name: 'error',
    component: () => import('@/views/pages/auth/Error.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
