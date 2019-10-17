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

export type Acme = {
   __typename?: 'ACME',
  id: Scalars['ID'],
  name: Scalars['String'],
  domains: Array<AcmeDomain>,
  ACMEToken: Scalars['String'],
};

export type AcmeAccount = {
   __typename?: 'ACMEAccount',
  id: Scalars['ID'],
};

export type AcmeDomain = {
   __typename?: 'ACMEDomain',
  id: Scalars['ID'],
  domains: Array<Scalars['String']>,
};

export type AcmeDomainInput = {
  zoneId: Scalars['String'],
  domains: Array<Scalars['String']>,
};

export type AcmeInput = {
  name: Scalars['String'],
  email: Scalars['String'],
};

export type AcmeUpdateInput = {
  name?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  addDomains?: Maybe<Array<AcmeDomainInput>>,
  removeDomains?: Maybe<Array<Scalars['ID']>>,
};

export type AuthResponse = {
   __typename?: 'AuthResponse',
  token: Scalars['String'],
  currentUser: CurrentUser,
};

export type Certificate = {
   __typename?: 'Certificate',
  id: Scalars['ID'],
  certificate: Scalars['String'],
  privateKey: Scalars['String'],
};

export type Configuration = {
   __typename?: 'Configuration',
  id: Scalars['ID'],
};

export type CreateMxResourceRecordInput = {
  host: Scalars['String'],
  ttl?: Maybe<Scalars['Int']>,
  preference: Scalars['Int'],
  value: Scalars['String'],
};

export type CreateUtilityInput = {
  name: Scalars['String'],
};

export type CreateValueResourceRecordInput = {
  type: ValueRecordType,
  ttl?: Maybe<Scalars['Int']>,
  host: Scalars['String'],
  value: Scalars['String'],
};

export type CurrentUser = {
   __typename?: 'CurrentUser',
  id: Scalars['ID'],
  username: Scalars['String'],
  email: Scalars['String'],
  roles: Array<UserRole>,
  subscribers: Array<Subscriber>,
  zones: Array<Zone>,
  ACMEs: Array<Acme>,
};


export type LoginInput = {
  username: Scalars['String'],
  password: Scalars['String'],
};

export type Mutation = {
   __typename?: 'Mutation',
  createACME: CurrentUser,
  deleteACME: CurrentUser,
  updateACME: Acme,
  addACMEDomain: Acme,
  generateCertificate: Acme,
  login: AuthResponse,
  register: RegisterResponse,
  resetPasswordReset: Scalars['Boolean'],
  initialConfiguration: Configuration,
  createValueResourceRecord: Zone,
  createMXResourceRecord: Zone,
  deleteResourceRecord: Zone,
  updateValueResourceRecord: Zone,
  createSubscriber: CurrentUser,
  updateSubscriber: Subscriber,
  createUtility: Utility,
  createZone: Zone,
};


export type MutationCreateAcmeArgs = {
  input: AcmeInput
};


export type MutationDeleteAcmeArgs = {
  acmeId: Scalars['String']
};


export type MutationUpdateAcmeArgs = {
  input: AcmeUpdateInput,
  acmeId: Scalars['String']
};


export type MutationAddAcmeDomainArgs = {
  input: Array<AcmeDomainInput>,
  acmeId: Scalars['String']
};


export type MutationGenerateCertificateArgs = {
  acmeId: Scalars['String']
};


export type MutationLoginArgs = {
  input: LoginInput
};


export type MutationRegisterArgs = {
  input: UserInput
};


export type MutationResetPasswordResetArgs = {
  input: RequestPasswordResetInput
};


export type MutationInitialConfigurationArgs = {
  user: UserInput
};


export type MutationCreateValueResourceRecordArgs = {
  input: CreateValueResourceRecordInput,
  zoneId: Scalars['ID']
};


export type MutationCreateMxResourceRecordArgs = {
  input: CreateMxResourceRecordInput,
  zoneId: Scalars['ID']
};


export type MutationDeleteResourceRecordArgs = {
  resourceRecordId: Scalars['ID']
};


export type MutationUpdateValueResourceRecordArgs = {
  input: ValueResourceRecordInput,
  resourceRecordId: Scalars['ID']
};


export type MutationCreateSubscriberArgs = {
  input: SubscriberInput
};


export type MutationUpdateSubscriberArgs = {
  input: UpdateSubscriberInput,
  subscriberId: Scalars['ID']
};


export type MutationCreateUtilityArgs = {
  input: CreateUtilityInput
};


export type MutationCreateZoneArgs = {
  input: ZoneInput
};

export enum Permission {
  Read = 'READ',
  Write = 'WRITE',
  Admin = 'ADMIN'
}

export type Query = {
   __typename?: 'Query',
  currentUser?: Maybe<CurrentUser>,
  hasSetup: Scalars['Boolean'],
  subscriber: Subscriber,
  getSubscribedZones: Array<Zone>,
  users: Array<User>,
  user: User,
  utilities: Array<Utility>,
  helloWorld: Scalars['String'],
  zones: Array<Zone>,
  zone: Zone,
};


export type QuerySubscriberArgs = {
  subscriberId: Scalars['ID']
};


export type QueryGetSubscribedZonesArgs = {
  subscriberToken: Scalars['String']
};


export type QueryUserArgs = {
  userId: Scalars['String']
};


export type QueryZoneArgs = {
  zoneId: Scalars['String']
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
  ttl?: Maybe<Scalars['Int']>,
  type: ResourceRecordType,
  host: Scalars['String'],
  /** JSON Stringified data */
  data: Scalars['String'],
};

export type ResourceRecordFilter = {
  host?: Maybe<Scalars['String']>,
  type?: Maybe<ResourceRecordType>,
};

export enum ResourceRecordType {
  A = 'A',
  Ns = 'NS',
  Txt = 'TXT',
  Cname = 'CNAME',
  Dname = 'DNAME',
  Aaaa = 'AAAA',
  Mx = 'MX'
}

export type Subscriber = {
   __typename?: 'Subscriber',
  id: Scalars['ID'],
  name: Scalars['String'],
  subscribedZones: Array<Zone>,
  accessPermissions: Array<SubscriberAccess>,
  subscriberToken: Scalars['String'],
};

export type SubscriberAccess = {
   __typename?: 'SubscriberAccess',
  id: Scalars['ID'],
};

export type SubscriberInput = {
  name: Scalars['String'],
};

export type Subscription = {
   __typename?: 'Subscription',
  certificateEvents: Certificate,
  subscribeToZones: Zone,
};


export type SubscriptionCertificateEventsArgs = {
  ACMEToken: Scalars['String']
};


export type SubscriptionSubscribeToZonesArgs = {
  subscriberToken: Scalars['String']
};

export type UpdateSubscriberInput = {
  updateZoneIds: Array<Scalars['ID']>,
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

export enum ValueRecordType {
  A = 'A',
  Ns = 'NS',
  Cname = 'CNAME',
  Dname = 'DNAME',
  Aaaa = 'AAAA',
  Txt = 'TXT'
}

export type ValueResourceRecordInput = {
  host?: Maybe<Scalars['String']>,
  ttl?: Maybe<Scalars['Float']>,
  value?: Maybe<Scalars['String']>,
};

export type Zone = {
   __typename?: 'Zone',
  id: Scalars['ID'],
  contact: Scalars['String'],
  updatedDate?: Maybe<Scalars['DateTime']>,
  domainName: Scalars['String'],
  resourceRecords: Array<ResourceRecord>,
  accessPermissions: Array<ZonePermissions>,
  subscribers: Array<Subscriber>,
  zoneSettings: ZoneSettings,
};


export type ZoneResourceRecordsArgs = {
  filter?: Maybe<ResourceRecordFilter>
};

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
  accessPermissions: Array<Permission>,
};

export type ZoneSettings = {
   __typename?: 'ZoneSettings',
  id: Scalars['ID'],
};
export type HasSetupQueryVariables = {};


export type HasSetupQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hasSetup'>
);
