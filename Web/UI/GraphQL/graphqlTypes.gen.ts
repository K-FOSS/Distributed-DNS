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
  certificates: Array<Certificate>,
  domains: Array<AcmeDomain>,
  contactEmail: Scalars['String'],
  ACMEToken: Scalars['String'],
  acmeUserPermission: Permission,
};

export type AcmeAccount = {
   __typename?: 'ACMEAccount',
  id: Scalars['ID'],
};

export type AcmeDomain = {
   __typename?: 'ACMEDomain',
  id: Scalars['ID'],
  zone: Zone,
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
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
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

export type CreateSrvResourceRecordInput = {
  host: Scalars['String'],
  ttl?: Maybe<Scalars['Int']>,
  service: Scalars['String'],
  protocol: SrvProtocol,
  priority: Scalars['Int'],
  weight: Scalars['Int'],
  port: Scalars['Int'],
  target: Scalars['String'],
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


export type EntityInput = {
  entityType: EntityType,
  entityId: Scalars['ID'],
};

export enum EntityType {
  Tls = 'TLS',
  Zone = 'ZONE'
}

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
  revokeCertificate: Acme,
  login: AuthResponse,
  register: RegisterResponse,
  resetPasswordReset: Scalars['Boolean'],
  initialConfiguration: Configuration,
  createValueResourceRecord: Zone,
  createMXResourceRecord: Zone,
  createSRVResourceRecord: Zone,
  deleteResourceRecord: Zone,
  updateValueResourceRecord: Zone,
  updateMXResourceRecord: Zone,
  updateSRVResourceRecord: Zone,
  createSubscriber: CurrentUser,
  addSubscriberUser: Subscriber,
  removeSubscriberUser: Subscriber,
  addEntityToSubscriber: Subscriber,
  removeEntityFromSubscriber: Subscriber,
  createSubscriberToken: Scalars['String'],
  addZoneUser: Zone,
  removeZoneUser: Zone,
  createZone: Zone,
  deleteZone: CurrentUser,
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


export type MutationRevokeCertificateArgs = {
  certificateId: Scalars['ID']
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


export type MutationCreateSrvResourceRecordArgs = {
  input: CreateSrvResourceRecordInput,
  zoneId: Scalars['ID']
};


export type MutationDeleteResourceRecordArgs = {
  resourceRecordId: Scalars['ID']
};


export type MutationUpdateValueResourceRecordArgs = {
  input: ValueResourceRecordInput,
  resourceRecordId: Scalars['ID']
};


export type MutationUpdateMxResourceRecordArgs = {
  input: MxResourceRecordInput,
  resourceRecordId: Scalars['ID']
};


export type MutationUpdateSrvResourceRecordArgs = {
  input: SrvResourceRecordInput,
  resourceRecordId: Scalars['ID']
};


export type MutationCreateSubscriberArgs = {
  input: SubscriberInput
};


export type MutationAddSubscriberUserArgs = {
  input: UserPermissionInput,
  subscriberId: Scalars['ID']
};


export type MutationRemoveSubscriberUserArgs = {
  userId: Scalars['ID'],
  subscriberId: Scalars['ID']
};


export type MutationAddEntityToSubscriberArgs = {
  newEntities: Array<EntityInput>,
  subscriberId: Scalars['ID']
};


export type MutationRemoveEntityFromSubscriberArgs = {
  entityIds: Array<Scalars['ID']>,
  subscriberId: Scalars['ID']
};


export type MutationCreateSubscriberTokenArgs = {
  subscriberId: Scalars['ID']
};


export type MutationAddZoneUserArgs = {
  input: UserPermissionInput,
  zoneId: Scalars['ID']
};


export type MutationRemoveZoneUserArgs = {
  zoneUserId: Scalars['ID'],
  zoneId: Scalars['ID']
};


export type MutationCreateZoneArgs = {
  input: ZoneInput
};


export type MutationDeleteZoneArgs = {
  zoneId: Scalars['ID']
};

export type MxResourceRecordInput = {
  host?: Maybe<Scalars['String']>,
  ttl?: Maybe<Scalars['Int']>,
  preference?: Maybe<Scalars['Int']>,
  value?: Maybe<Scalars['String']>,
};

export enum Permission {
  Read = 'READ',
  Write = 'WRITE',
  Admin = 'ADMIN'
}

export type Query = {
   __typename?: 'Query',
  ACME: Acme,
  currentUser?: Maybe<CurrentUser>,
  hasSetup: Scalars['Boolean'],
  subscriber: Subscriber,
  getSubscribedEntities: Array<SubscriberEntity>,
  users: Array<User>,
  user: User,
  zones: Array<Zone>,
  zone: Zone,
};


export type QueryAcmeArgs = {
  acmeId: Scalars['String']
};


export type QuerySubscriberArgs = {
  subscriberId: Scalars['ID']
};


export type QueryGetSubscribedEntitiesArgs = {
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
  Mx = 'MX',
  Srv = 'SRV'
}

export enum SrvProtocol {
  Tcp = 'TCP',
  Udp = 'UDP',
  Tls = 'TLS',
  Ldap = 'LDAP',
  Http = 'HTTP',
  Ocsp = 'OCSP'
}

export type SrvResourceRecordInput = {
  host?: Maybe<Scalars['String']>,
  ttl?: Maybe<Scalars['Int']>,
  service?: Maybe<Scalars['String']>,
  protocol?: Maybe<SrvProtocol>,
  priority?: Maybe<Scalars['Int']>,
  weight?: Maybe<Scalars['Int']>,
  port?: Maybe<Scalars['Int']>,
  target?: Maybe<Scalars['String']>,
};

export type Subscriber = {
   __typename?: 'Subscriber',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  name: Scalars['String'],
  accessPermissions: Array<SubscriberAccess>,
  subscriberSettings: SubscriberSettings,
  userAccess: Permission,
  userPermissions: Array<Permission>,
  subscribedEntities: Array<SubscriberEntity>,
};

export type SubscriberAccess = {
   __typename?: 'SubscriberAccess',
  id: Scalars['ID'],
  user: User,
  accessPermissions: Array<Permission>,
};

export type SubscriberEntity = Acme | Zone;

export type SubscriberEventPayload = {
   __typename?: 'SubscriberEventPayload',
  eventType: SubscriberPayloadType,
  id: Scalars['ID'],
  entity: SubscriberEntity,
};

export type SubscriberInput = {
  name: Scalars['String'],
};

export enum SubscriberPayloadType {
  Create = 'CREATE',
  Update = 'UPDATE',
  Delete = 'DELETE'
}

export type SubscriberSettings = {
   __typename?: 'SubscriberSettings',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
};

export type Subscription = {
   __typename?: 'Subscription',
  subscribe: SubscriberEventPayload,
};


export type SubscriptionSubscribeArgs = {
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

export type UserPermissionInput = {
  userId: Scalars['ID'],
  accessPermission: Permission,
};

export enum UserRole {
  Guest = 'GUEST',
  User = 'USER',
  Admin = 'ADMIN'
}

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
  updatedDate: Scalars['DateTime'],
  domainName: Scalars['String'],
  resourceRecords: Array<ResourceRecord>,
  accessPermissions: Array<ZonePermissions>,
  subscribers: Array<Subscriber>,
  zoneSettings: ZoneSettings,
  userPermission: Permission,
  userPermissions: Array<Permission>,
};


export type ZoneResourceRecordsArgs = {
  filter?: Maybe<ResourceRecordFilter>
};

export type ZoneInput = {
  domainName: Scalars['String'],
  /** The user requesting the zone */
  zoneUserIds: Array<Scalars['String']>,
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
  contact: Scalars['String'],
};

export type CurrentUserFragment = (
  { __typename?: 'CurrentUser' }
  & Pick<CurrentUser, 'username' | 'id' | 'roles'>
);

export type CurrentUserQueryVariables = {};


export type CurrentUserQuery = (
  { __typename?: 'Query' }
  & { currentUser: Maybe<(
    { __typename?: 'CurrentUser' }
    & CurrentUserFragment
  )> }
);

export type LoginMutationVariables = {
  input: LoginInput
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'AuthResponse' }
    & Pick<AuthResponse, 'token'>
    & { currentUser: (
      { __typename?: 'CurrentUser' }
      & CurrentUserFragment
    ) }
  ) }
);

export type RegisterMutationVariables = {
  input: UserInput
};


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'RegisterResponse' }
    & Pick<RegisterResponse, 'token'>
    & { currentUser: (
      { __typename?: 'CurrentUser' }
      & CurrentUserFragment
    ) }
  ) }
);

export type UsersQueryVariables = {};


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  )> }
);

export type CreateMxrrMutationVariables = {
  zoneId: Scalars['ID'],
  input: CreateMxResourceRecordInput
};


export type CreateMxrrMutation = (
  { __typename?: 'Mutation' }
  & { createMXResourceRecord: (
    { __typename?: 'Zone' }
    & Pick<Zone, 'id' | 'domainName'>
    & { resourceRecords: Array<(
      { __typename?: 'ResourceRecord' }
      & Pick<ResourceRecord, 'id' | 'host' | 'data' | 'ttl' | 'type'>
    )> }
  ) }
);

export type CreateSrvrrMutationVariables = {
  zoneId: Scalars['ID'],
  input: CreateSrvResourceRecordInput
};


export type CreateSrvrrMutation = (
  { __typename?: 'Mutation' }
  & { createSRVResourceRecord: (
    { __typename?: 'Zone' }
    & Pick<Zone, 'id' | 'domainName'>
    & { resourceRecords: Array<(
      { __typename?: 'ResourceRecord' }
      & Pick<ResourceRecord, 'id' | 'host' | 'data' | 'type' | 'ttl'>
    )> }
  ) }
);

export type CreateValueRrMutationVariables = {
  zoneId: Scalars['ID'],
  input: CreateValueResourceRecordInput
};


export type CreateValueRrMutation = (
  { __typename?: 'Mutation' }
  & { createValueResourceRecord: (
    { __typename?: 'Zone' }
    & Pick<Zone, 'id' | 'domainName'>
    & { resourceRecords: Array<(
      { __typename?: 'ResourceRecord' }
      & Pick<ResourceRecord, 'id' | 'host' | 'data' | 'ttl' | 'type'>
    )> }
  ) }
);

export type DeleteResourceRecordMutationVariables = {
  resourceRecordId: Scalars['ID']
};


export type DeleteResourceRecordMutation = (
  { __typename?: 'Mutation' }
  & { deleteResourceRecord: (
    { __typename?: 'Zone' }
    & Pick<Zone, 'id' | 'domainName'>
    & { resourceRecords: Array<(
      { __typename?: 'ResourceRecord' }
      & Pick<ResourceRecord, 'id' | 'host' | 'ttl' | 'data'>
    )> }
  ) }
);

export type UpdateMxResourceRecordMutationVariables = {
  resourceRecordId: Scalars['ID'],
  input: MxResourceRecordInput
};


export type UpdateMxResourceRecordMutation = (
  { __typename?: 'Mutation' }
  & { updateMXResourceRecord: (
    { __typename?: 'Zone' }
    & Pick<Zone, 'id'>
    & { resourceRecords: Array<(
      { __typename?: 'ResourceRecord' }
      & Pick<ResourceRecord, 'host' | 'id' | 'ttl' | 'data'>
    )> }
  ) }
);

export type UpdateSrvResourceRecordMutationVariables = {
  resourceRecordId: Scalars['ID'],
  input: SrvResourceRecordInput
};


export type UpdateSrvResourceRecordMutation = (
  { __typename?: 'Mutation' }
  & { updateSRVResourceRecord: (
    { __typename?: 'Zone' }
    & Pick<Zone, 'id'>
    & { resourceRecords: Array<(
      { __typename?: 'ResourceRecord' }
      & Pick<ResourceRecord, 'id' | 'ttl' | 'type' | 'host' | 'data'>
    )> }
  ) }
);

export type UpdateResourceRecordMutationVariables = {
  resourceRecordId: Scalars['ID'],
  input: ValueResourceRecordInput
};


export type UpdateResourceRecordMutation = (
  { __typename?: 'Mutation' }
  & { updateValueResourceRecord: (
    { __typename?: 'Zone' }
    & Pick<Zone, 'id'>
    & { resourceRecords: Array<(
      { __typename?: 'ResourceRecord' }
      & Pick<ResourceRecord, 'host' | 'id' | 'ttl' | 'data'>
    )> }
  ) }
);

export type CreateZoneMutationVariables = {
  input: ZoneInput
};


export type CreateZoneMutation = (
  { __typename?: 'Mutation' }
  & { createZone: (
    { __typename?: 'Zone' }
    & Pick<Zone, 'domainName' | 'id'>
  ) }
);

export type AcmeQueryVariables = {
  acmeId: Scalars['String']
};


export type AcmeQuery = (
  { __typename?: 'Query' }
  & { ACME: (
    { __typename?: 'ACME' }
    & Pick<Acme, 'id' | 'name' | 'contactEmail'>
    & { certificates: Array<(
      { __typename?: 'Certificate' }
      & Pick<Certificate, 'id' | 'createdAt' | 'certificate'>
    )>, domains: Array<(
      { __typename?: 'ACMEDomain' }
      & Pick<AcmeDomain, 'id' | 'domains'>
      & { zone: (
        { __typename?: 'Zone' }
        & Pick<Zone, 'id' | 'domainName'>
      ) }
    )> }
  ) }
);

export type AddAcmeDomainMutationVariables = {
  acmeId: Scalars['String'],
  input: Array<AcmeDomainInput>
};


export type AddAcmeDomainMutation = (
  { __typename?: 'Mutation' }
  & { addACMEDomain: (
    { __typename?: 'ACME' }
    & Pick<Acme, 'id' | 'name' | 'contactEmail'>
    & { domains: Array<(
      { __typename?: 'ACMEDomain' }
      & Pick<AcmeDomain, 'id' | 'domains'>
      & { zone: (
        { __typename?: 'Zone' }
        & Pick<Zone, 'id' | 'domainName'>
      ) }
    )> }
  ) }
);

export type GenerateCertificateMutationVariables = {
  acmeId: Scalars['String']
};


export type GenerateCertificateMutation = (
  { __typename?: 'Mutation' }
  & { generateCertificate: (
    { __typename?: 'ACME' }
    & Pick<Acme, 'id' | 'name' | 'contactEmail'>
    & { certificates: Array<(
      { __typename?: 'Certificate' }
      & Pick<Certificate, 'id' | 'createdAt' | 'certificate'>
    )>, domains: Array<(
      { __typename?: 'ACMEDomain' }
      & Pick<AcmeDomain, 'id' | 'domains'>
      & { zone: (
        { __typename?: 'Zone' }
        & Pick<Zone, 'id' | 'domainName'>
      ) }
    )> }
  ) }
);

export type AcmeZonesQueryVariables = {};


export type AcmeZonesQuery = (
  { __typename?: 'Query' }
  & { currentUser: Maybe<(
    { __typename?: 'CurrentUser' }
    & Pick<CurrentUser, 'id'>
    & { zones: Array<(
      { __typename?: 'Zone' }
      & Pick<Zone, 'id' | 'domainName'>
    )> }
  )> }
);

export type AcmEsQueryVariables = {};


export type AcmEsQuery = (
  { __typename?: 'Query' }
  & { currentUser: Maybe<(
    { __typename?: 'CurrentUser' }
    & Pick<CurrentUser, 'id'>
    & { ACMEs: Array<(
      { __typename?: 'ACME' }
      & Pick<Acme, 'id' | 'name' | 'contactEmail'>
      & { domains: Array<(
        { __typename?: 'ACMEDomain' }
        & Pick<AcmeDomain, 'domains'>
      )> }
    )> }
  )> }
);

export type CreateAcmeMutationVariables = {
  input: AcmeInput
};


export type CreateAcmeMutation = (
  { __typename?: 'Mutation' }
  & { createACME: (
    { __typename?: 'CurrentUser' }
    & Pick<CurrentUser, 'id'>
    & { ACMEs: Array<(
      { __typename?: 'ACME' }
      & Pick<Acme, 'id' | 'name' | 'contactEmail'>
    )> }
  ) }
);

export type InitialConfigurationMutationVariables = {
  userInput: UserInput
};


export type InitialConfigurationMutation = (
  { __typename?: 'Mutation' }
  & { initialConfiguration: (
    { __typename?: 'Configuration' }
    & Pick<Configuration, 'id'>
  ) }
);

export type AddEntityToSubscriberMutationVariables = {
  subscriberId: Scalars['ID'],
  newEntities: Array<EntityInput>
};


export type AddEntityToSubscriberMutation = (
  { __typename?: 'Mutation' }
  & { addEntityToSubscriber: (
    { __typename?: 'Subscriber' }
    & Pick<Subscriber, 'id' | 'createdAt' | 'updatedAt' | 'name'>
    & { subscribedEntities: Array<(
      { __typename?: 'ACME' }
      & Pick<Acme, 'id' | 'name'>
    ) | (
      { __typename?: 'Zone' }
      & Pick<Zone, 'id' | 'domainName'>
    )> }
  ) }
);

export type NewEntityQueryVariables = {};


export type NewEntityQuery = (
  { __typename?: 'Query' }
  & { currentUser: Maybe<(
    { __typename?: 'CurrentUser' }
    & Pick<CurrentUser, 'id' | 'username'>
    & { zones: Array<(
      { __typename?: 'Zone' }
      & Pick<Zone, 'id' | 'domainName'>
    )>, ACMEs: Array<(
      { __typename?: 'ACME' }
      & Pick<Acme, 'id' | 'name'>
    )> }
  )> }
);

export type RemoveEntityFromSubscriberMutationVariables = {
  subscriberId: Scalars['ID'],
  entityIds: Array<Scalars['ID']>
};


export type RemoveEntityFromSubscriberMutation = (
  { __typename?: 'Mutation' }
  & { removeEntityFromSubscriber: (
    { __typename?: 'Subscriber' }
    & Pick<Subscriber, 'id' | 'createdAt' | 'updatedAt' | 'name'>
    & { subscribedEntities: Array<(
      { __typename?: 'ACME' }
      & Pick<Acme, 'id' | 'name'>
    ) | (
      { __typename?: 'Zone' }
      & Pick<Zone, 'id' | 'domainName'>
    )> }
  ) }
);

export type SubscriberQueryVariables = {
  subscriberId: Scalars['ID']
};


export type SubscriberQuery = (
  { __typename?: 'Query' }
  & { subscriber: (
    { __typename?: 'Subscriber' }
    & Pick<Subscriber, 'id' | 'createdAt' | 'updatedAt' | 'name' | 'userPermissions'>
    & { subscribedEntities: Array<(
      { __typename?: 'ACME' }
      & Pick<Acme, 'id' | 'name'>
    ) | (
      { __typename?: 'Zone' }
      & Pick<Zone, 'id' | 'domainName'>
    )> }
  ) }
);

export type AddSubscriberUserMutationVariables = {
  subscriberId: Scalars['ID'],
  input: UserPermissionInput
};


export type AddSubscriberUserMutation = (
  { __typename?: 'Mutation' }
  & { addSubscriberUser: (
    { __typename?: 'Subscriber' }
    & Pick<Subscriber, 'id' | 'name' | 'updatedAt'>
    & { subscriberSettings: (
      { __typename?: 'SubscriberSettings' }
      & Pick<SubscriberSettings, 'id'>
    ), accessPermissions: Array<(
      { __typename?: 'SubscriberAccess' }
      & Pick<SubscriberAccess, 'id' | 'accessPermissions'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username'>
      ) }
    )> }
  ) }
);

export type RemoveSubscriberUserMutationVariables = {
  subscriberId: Scalars['ID'],
  userId: Scalars['ID']
};


export type RemoveSubscriberUserMutation = (
  { __typename?: 'Mutation' }
  & { removeSubscriberUser: (
    { __typename?: 'Subscriber' }
    & Pick<Subscriber, 'id' | 'name' | 'updatedAt'>
    & { subscriberSettings: (
      { __typename?: 'SubscriberSettings' }
      & Pick<SubscriberSettings, 'id'>
    ), accessPermissions: Array<(
      { __typename?: 'SubscriberAccess' }
      & Pick<SubscriberAccess, 'id' | 'accessPermissions'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username'>
      ) }
    )> }
  ) }
);

export type SubscriberSettingsQueryVariables = {
  subscriberId: Scalars['ID']
};


export type SubscriberSettingsQuery = (
  { __typename?: 'Query' }
  & { subscriber: (
    { __typename?: 'Subscriber' }
    & Pick<Subscriber, 'id' | 'name' | 'updatedAt'>
    & { subscriberSettings: (
      { __typename?: 'SubscriberSettings' }
      & Pick<SubscriberSettings, 'id'>
    ), accessPermissions: Array<(
      { __typename?: 'SubscriberAccess' }
      & Pick<SubscriberAccess, 'id' | 'accessPermissions'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username'>
      ) }
    )> }
  ) }
);

export type CreateSubscriberMutationVariables = {
  input: SubscriberInput
};


export type CreateSubscriberMutation = (
  { __typename?: 'Mutation' }
  & { createSubscriber: (
    { __typename?: 'CurrentUser' }
    & Pick<CurrentUser, 'id' | 'username'>
    & { subscribers: Array<(
      { __typename?: 'Subscriber' }
      & Pick<Subscriber, 'id' | 'name' | 'userAccess' | 'userPermissions'>
    )> }
  ) }
);

export type SubscribersQueryVariables = {};


export type SubscribersQuery = (
  { __typename?: 'Query' }
  & { currentUser: Maybe<(
    { __typename?: 'CurrentUser' }
    & Pick<CurrentUser, 'id' | 'username'>
    & { subscribers: Array<(
      { __typename?: 'Subscriber' }
      & Pick<Subscriber, 'id' | 'name' | 'userAccess' | 'userPermissions'>
    )> }
  )> }
);

export type ZoneQueryVariables = {
  zoneId: Scalars['String']
};


export type ZoneQuery = (
  { __typename?: 'Query' }
  & { zone: (
    { __typename?: 'Zone' }
    & Pick<Zone, 'id' | 'domainName' | 'userPermissions'>
    & { resourceRecords: Array<(
      { __typename?: 'ResourceRecord' }
      & Pick<ResourceRecord, 'id' | 'ttl' | 'host' | 'data' | 'type'>
    )>, zoneSettings: (
      { __typename?: 'ZoneSettings' }
      & Pick<ZoneSettings, 'id' | 'contact'>
    ) }
  ) }
);

export type AddZoneUserMutationVariables = {
  zoneId: Scalars['ID'],
  input: UserPermissionInput
};


export type AddZoneUserMutation = (
  { __typename?: 'Mutation' }
  & { addZoneUser: (
    { __typename?: 'Zone' }
    & Pick<Zone, 'id'>
    & { accessPermissions: Array<(
      { __typename?: 'ZonePermissions' }
      & Pick<ZonePermissions, 'id' | 'accessPermissions'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username'>
      ) }
    )> }
  ) }
);

export type RemoveZoneUserMutationVariables = {
  zoneId: Scalars['ID'],
  zoneUserId: Scalars['ID']
};


export type RemoveZoneUserMutation = (
  { __typename?: 'Mutation' }
  & { removeZoneUser: (
    { __typename?: 'Zone' }
    & Pick<Zone, 'id'>
    & { accessPermissions: Array<(
      { __typename?: 'ZonePermissions' }
      & Pick<ZonePermissions, 'id' | 'accessPermissions'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username'>
      ) }
    )> }
  ) }
);

export type ZoneSettingsQueryVariables = {
  zoneId: Scalars['String']
};


export type ZoneSettingsQuery = (
  { __typename?: 'Query' }
  & { zone: (
    { __typename?: 'Zone' }
    & Pick<Zone, 'id' | 'domainName'>
    & { accessPermissions: Array<(
      { __typename?: 'ZonePermissions' }
      & Pick<ZonePermissions, 'id' | 'accessPermissions'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'username'>
      ) }
    )>, zoneSettings: (
      { __typename?: 'ZoneSettings' }
      & Pick<ZoneSettings, 'id' | 'contact'>
    ) }
  ) }
);

export type DeleteZoneMutationVariables = {
  zoneId: Scalars['ID']
};


export type DeleteZoneMutation = (
  { __typename?: 'Mutation' }
  & { deleteZone: (
    { __typename?: 'CurrentUser' }
    & Pick<CurrentUser, 'id' | 'username'>
    & { zones: Array<(
      { __typename?: 'Zone' }
      & Pick<Zone, 'id' | 'domainName' | 'userPermissions'>
    )> }
  ) }
);

export type ZonesPageQueryVariables = {};


export type ZonesPageQuery = (
  { __typename?: 'Query' }
  & { currentUser: Maybe<(
    { __typename?: 'CurrentUser' }
    & Pick<CurrentUser, 'id' | 'username'>
    & { zones: Array<(
      { __typename?: 'Zone' }
      & Pick<Zone, 'id' | 'domainName' | 'userPermissions'>
    )> }
  )> }
);
