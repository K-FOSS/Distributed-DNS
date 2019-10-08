// Web/UI/Components/Router/generateList.tsx
import React from 'react';
import { Route } from './Routes';
import { Link } from 'react-router-dom';
import { LabelListItem } from '../Styles/List/ListItems/LabelListItem';
import { UserRole } from 'UI/GraphQL/graphqlTypes.gen';
import { ParentListItem } from '../Styles/List/ListItems/ParentListItem';

export function generateList(
  routes: Route[],
  userRoles = [UserRole.Guest],
): React.ReactElement[] {
  return routes
    .filter(({ roles, hidden }) =>
      roles ? roles.every((role) => userRoles.includes(role)) : true && !hidden,
    )
    .map(({ children, to, label }) =>
      children ? (
        <ParentListItem key={to} label={{ primary: label }}>
          <LabelListItem
            key={to}
            component={Link}
            to={to}
            label={{ primary: label }}
          />
          {generateList(children, userRoles)}
        </ParentListItem>
      ) : (
        <LabelListItem
          key={to}
          component={Link}
          to={to}
          label={{ primary: label }}
        />
      ),
    );
}
