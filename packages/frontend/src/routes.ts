import { RouteDefinition } from '@solidjs/router';
import { lazy } from 'solid-js';

const routes: RouteDefinition[] = [
  {
    path: '/',
    component: lazy(() => import('./App')),
    children: [
      {
        path: '/login',
        component: lazy(() => import('./pages/auth/Login')),
      },
      {
        path: '/register',
        component: lazy(() => import('./pages/auth/Register')),
      },
      {
        path: '/',
        component: lazy(() => import('./pages/BaseLayout')),
        children: [
          {
            path: '/',
            component: lazy(() => import('./pages/dashboard/Dashboard')),
          },
          {
            path: '/budgets',
            component: lazy(() => import('./pages/budgets/Budget')),
          },
          {
            path: '/budgets/:id',
            component: lazy(() => import('./pages/budgets/BudgetDetail')),
          },
        ],
      },
    ],
  },
];

export default routes;
