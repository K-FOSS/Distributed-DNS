// Web/UI/Components/Router/Routes.tsx
import { UserRole } from 'UI/GraphQL/graphqlTypes.gen';

export interface Route {
  to: string;
  label: string;
  roles?: UserRole[];
  children?: Route[];
  hideUI?: boolean;
  hidden?: boolean;
}

export const Routes: Route[] = [
  { label: 'Home', to: '/' },
  { label: 'Setup', to: '/Setup', hideUI: true, hidden: true },
  { label: 'Zones', to: '/Zones', roles: [UserRole.User] },
  { label: 'ACMEs', to: '/ACMEs', roles: [UserRole.User] },
  { label: 'Subscribers', to: '/Subscribers', roles: [UserRole.User] },
  { label: 'Login', to: '/Login', roles: [UserRole.Guest] },
  { label: 'Register', to: '/Register', roles: [UserRole.Guest] },
  {
    label: 'Admin',
    to: '/Admin',
    roles: [UserRole.Admin],
    children: [
      {
        label: 'Test',
        to: '/Admin/Test',
        roles: [UserRole.Admin],
      },
    ],
  },
];
