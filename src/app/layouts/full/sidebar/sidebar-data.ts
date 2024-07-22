import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Recherche et consultation',
  },
  {
    displayName: 'Consulter les opérations',
    iconName: 'layout-dashboard',
    route: '/consultation',
  },
  {
    displayName: 'Statistiques',
    iconName: 'chart-dots-2',
    route: '/dashboard',
  },
  {
    navCap: 'Gestion des opérations bancaires',
  },
  {
    displayName: 'Debiter',
    iconName: 'brand-mastercard',
    route: '/debiter', // Update the route to match your application
  },
  {
    displayName: 'Crediter',
    iconName: 'credit-card-pay',
    route: '/crediter',
  },
  {
    displayName: 'Virement',
    iconName: 'zoom-money',
    route: '/virement',
  },
  // {
  //   displayName: 'Menu',
  //   iconName: 'layout-navbar-expand',
  //   route: '/ui-components/menu',
  // },
  // {
  //   displayName: 'Tooltips',
  //   iconName: 'tooltip',
  //   route: '/ui-components/tooltips',
  // },
  // {
  //   navCap: 'Auth',
  // },
  // {
  //   displayName: 'Login',
  //   iconName: 'lock',
  //   route: '/authentication/login',
  // },
  // {
  //   displayName: 'Register',
  //   iconName: 'user-plus',
  //   route: '/authentication/register',
  // },
  {
    navCap: 'Gestion Du Budget',
  },
  {
    displayName: 'Impression et exportation', 
    iconName: 'currency-euro',
    route: '/extra/icons',
  },
  {
    displayName: 'Modifier les monatants budgétaires', 
    iconName: 'moneybag',
    route: '/extra/icons',
  },  {
    displayName: 'Selection des periodes budgétaires', 
    iconName: 'clock-2',
    route: '/extra/icons',
  },
  {
    displayName: 'Gestion des depenses et revenus', 
    iconName: 'report-money',
    route: '/extra/icons',
  },
  {
    navCap: 'Gestion des modèles et des échéances',
  },
  {
    displayName: 'Importer un relevé bancaire ',
    iconName: 'file',
    route: '/extra/icons',
  },
  // {
  //   displayName: 'Sample Page',
  //   iconName: 'aperture',
  //   route: '/extra/sample-page',
  // },
];
