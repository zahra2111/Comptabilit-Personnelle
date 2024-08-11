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
  {
    navCap: 'Gestion Du Budget',
    
  },
  {
    displayName: 'Impression et exportation', 
    iconName: 'currency-euro',
    route: '/impression-exportation-de-rapport-popup',
  },
  {
    displayName: 'Modifier les monatants budgétaires', 
    iconName: 'moneybag',
    route: '/modifier-montants-budgetaire-popup',
  },  {
    displayName: 'Selection des periodes budgétaires', 
    iconName: 'clock-2',
    route: '/selection-periode-budget-popup',
  },
  {
    displayName: 'Gestion des depenses et revenus', 
    iconName: 'report-money',
    route: '/gestion-depenses-revenus-popup',
  },
  {
    navCap: 'Gestion des modèles et des échéances',
  },
 
];
