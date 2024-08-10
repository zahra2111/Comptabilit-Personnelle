import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    displayName: 'OVERVIEW',
    iconName: 'chart-dots-2',
    route: '/dashboard',
  },
  {
    displayName: 'ACCOUNTS',
    iconName: 'book-2',
    route: '/bank-account',
  },
  {
    displayName: 'BUDGETS',
    iconName: 'moneybag',
    route: '/budgets',
  },
 { 
  displayName: 'TRANSACTIONS',
  iconName: 'credit-card-pay',
  children: [
    {
      displayName: 'Consulter',
      iconName: 'search',
      route: '/consultation', // Update the route to match your application
    },
    {
      displayName: 'DEBIT',
      iconName: 'minus',
      route: '/debiter', // Update the route to match your application
    },
    {
      displayName: 'CREDIT',
      iconName: 'plus',
      route: '/crediter',
    },
  ]},
  {
    displayName: 'PREFERENCES',
    iconName: 'ballpen',
    children: [
      {
        displayName: 'CATEGORIES',
        iconName: 'category',
        route: '/category',
      },
      {
        displayName: 'TEMPLATES',
        iconName: 'box-model',
        route: '/budget/expenses',
      },
      {
        displayName: 'TIERS',
        iconName: 'users',
        route: '/budget/expenses',
      },
    ],
  },
  {
    displayName: 'EXPORT',
    iconName: 'pdf',
    route: '/operations/transfer',
  },
];
