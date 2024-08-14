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
    route: '/exporter',
  },
  {
    displayName: 'Modifier les monatants budgétaires', 
    iconName: 'moneybag',
    route: '/modifier',
  },
  {
    displayName: 'Selection des periodes budgétaires', 
    iconName: 'clock-2',
    route: '/selectioner',
  },
  {
    displayName: 'Gestion des depenses et revenus', 
    iconName: 'report-money',
    route: '/gerer',
  },
  {
    navCap: 'Gestion des modèles et des échéances',
  },
  {
    displayName: 'Importer un relevé bancaire ',
    iconName: 'file',
    route: '/relever',
  },
  {
    displayName: 'Ajout d un Modèles ',
    iconName: 'file',
    route: '/modele',
  },
  {
    displayName: 'Echéances ',
    iconName: 'file',
    route: '/echeance',
  },
  {
    displayName: 'Imprimer ',
    iconName: 'file',
    route: '/imprimer',
  },
];
