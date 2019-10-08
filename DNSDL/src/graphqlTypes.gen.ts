export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any,
};

export type AuthResponse = {
   __typename?: 'AuthResponse',
  token: Scalars['String'],
  currentUser: CurrentUser,
};

export type Configuration = {
   __typename?: 'Configuration',
  id: Scalars['ID'],
};

export type CreateSubscriberInput = {
  zoneIds: Array<Scalars['String']>,
};

export type CreateUtilityInput = {
  name: Scalars['String'],
};

export type CreateValueResourceRecordInput = {
  zoneId: Scalars['String'],
  type: ResourceRecordType,
  host: Scalars['String'],
  value: Scalars['String'],
};

export type CurrentUser = {
   __typename?: 'CurrentUser',
  id: Scalars['ID'],
  username: Scalars['String'],
  email: Scalars['String'],
  roles: Array<UserRole>,
};


export type InitialConfigurationInput = {
  initialUser: UserInput,
};

export type LoginInput = {
  username: Scalars['String'],
  password: Scalars['String'],
};

export type Mutation = {
   __typename?: 'Mutation',
  login: AuthResponse,
  register: RegisterResponse,
  resetPasswordReset: Scalars['Boolean'],
  initialConfiguration: Configuration,
  createValueResourceRecord: Scalars['Boolean'],
  createSubscriber: Subscriber,
  createUtility: Utility,
  createZone: Zone,
};


export type MutationLoginArgs = {
  input: LoginInput
};


export type MutationRegisterArgs = {
  input: RegisterInput
};


export type MutationResetPasswordResetArgs = {
  input: RequestPasswordResetInput
};


export type MutationInitialConfigurationArgs = {
  input: InitialConfigurationInput
};


export type MutationCreateValueResourceRecordArgs = {
  input: CreateValueResourceRecordInput
};


export type MutationCreateSubscriberArgs = {
  input: CreateSubscriberInput
};


export type MutationCreateUtilityArgs = {
  input: CreateUtilityInput
};


export type MutationCreateZoneArgs = {
  input: ZoneInput
};

export type Query = {
   __typename?: 'Query',
  currentUser: User,
  hasSetup: Scalars['Boolean'],
  getSubscribedZones: Array<Zone>,
  users: Array<User>,
  utilities: Array<Utility>,
  helloWorld: Scalars['String'],
  zones: Array<Zone>,
  zone: Zone,
};


export type QueryGetSubscribedZonesArgs = {
  subscriberToken: Scalars['String']
};


export type QueryZoneArgs = {
  zoneId: Scalars['String']
};

export type RegisterInput = {
  username: Scalars['String'],
  email: Scalars['String'],
  password: Scalars['String'],
};

export type RegisterResponse = {
   __typename?: 'RegisterResponse',
  success: Scalars['Boolean'],
  token: Scalars['String'],
  currentUser: CurrentUser,
};

export type RequestPasswordResetInput = {
  email: Scalars['String'],
};

export type ResetPasswordInput = {
  token: Scalars['String'],
  password: Scalars['String'],
};

export type ResourceRecord = {
   __typename?: 'ResourceRecord',
  id: Scalars['ID'],
  type: ResourceRecordType,
  host: Scalars['String'],
  /** JSON Stringified data */
  data: Scalars['String'],
};

export enum ResourceRecordType {
  A = 'A',
  Ns = 'NS'
}

export type Subscriber = {
   __typename?: 'Subscriber',
  id: Scalars['ID'],
  subscribedZones: Array<Zone>,
  subscriberToken: Scalars['String'],
};

export type Subscription = {
   __typename?: 'Subscription',
  subscribeToZones: Zone,
};


export type SubscriptionSubscribeToZonesArgs = {
  subscriberToken: Scalars['String']
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  username: Scalars['String'],
};

export type UserInput = {
  username: Scalars['String'],
  email: Scalars['String'],
  password: Scalars['String'],
};

export enum UserRole {
  Guest = 'GUEST',
  User = 'USER',
  Admin = 'ADMIN'
}

export type Utility = {
   __typename?: 'Utility',
  id: Scalars['ID'],
  name: Scalars['String'],
};

export type Zone = {
   __typename?: 'Zone',
  id: Scalars['ID'],
  contact: Scalars['String'],
  updatedDate: Scalars['DateTime'],
  domainName: Scalars['String'],
  resourceRecords: Array<ResourceRecord>,
  accessPermissions: Array<ZonePermissions>,
  subscribers: Array<Subscriber>,
};

export enum ZoneAccessPermissions {
  Read = 'READ',
  Write = 'WRITE',
  Admin = 'ADMIN'
}

export type ZoneInput = {
  domainName: Scalars['String'],
  /** The user requesting the zone */
  zoneOwnerUserId: Scalars['String'],
  ns: Scalars['String'],
  contact: Scalars['String'],
};

export type ZonePermissions = {
   __typename?: 'ZonePermissions',
  id: Scalars['ID'],
  user: User,
  accessPermissions: Array<ZoneAccessPermissions>,
};
export type ResourceRecordFragment = (
  { __typename?: 'ResourceRecord' }
  & Pick<ResourceRecord, 'id' | 'type' | 'host' | 'data'>
);

export type GetSubscribedZonesQueryVariables = {
  subscriberToken: Scalars['String']
};


export type GetSubscribedZonesQuery = (
  { __typename?: 'Query' }
  & { getSubscribedZones: Array<{ __typename?: 'Zone' }
    & ZoneFragment
  > }
);

export type SubscribeToZonesSubscriptionVariables = {
  subscriberToken: Scalars['String']
};


export type SubscribeToZonesSubscription = (
  { __typename?: 'Subscription' }
  & { subscribeToZones: { __typename?: 'Zone' }
    & ZoneFragment
   }
);

export type ZoneFragment = (
  { __typename?: 'Zone' }
  & Pick<Zone, 'domainName' | 'id' | 'updatedDate' | 'contact'>
  & { resourceRecords: Array<{ __typename?: 'ResourceRecord' }
    & ResourceRecordFragment
  > }
);
