import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateEventInput = {
  default?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  frequency?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  isCompleted?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  tag?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type CreateEventOutput = {
  __typename?: 'CreateEventOutput';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type CreateNotificationInput = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  createdDate?: InputMaybe<Scalars['String']['input']>;
  details?: InputMaybe<Scalars['String']['input']>;
  eventId?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  isCompleted?: InputMaybe<Scalars['Boolean']['input']>;
  nextDate?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CreateNotificationOutput = {
  __typename?: 'CreateNotificationOutput';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type Event = {
  __typename?: 'Event';
  default?: Maybe<Scalars['Int']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  endDate?: Maybe<Scalars['String']['output']>;
  frequency?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  isCompleted?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  nextDate?: Maybe<Scalars['String']['output']>;
  notifications?: Maybe<Array<Maybe<Notification>>>;
  startDate?: Maybe<Scalars['String']['output']>;
  tag?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  type?: Maybe<Scalars['String']['output']>;
};

export type FetchEventsOutput = {
  __typename?: 'FetchEventsOutput';
  data?: Maybe<Array<Maybe<Event>>>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type FetchNotificationsOutput = {
  __typename?: 'FetchNotificationsOutput';
  data?: Maybe<Array<Maybe<Notification>>>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type FetchUsersOutput = {
  __typename?: 'FetchUsersOutput';
  data?: Maybe<Array<Maybe<User>>>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type LoginUserOutput = {
  __typename?: 'LoginUserOutput';
  accessToken?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createEvent?: Maybe<CreateEventOutput>;
  createNotification?: Maybe<CreateNotificationOutput>;
  updateEvent?: Maybe<CreateEventOutput>;
  updateNotification?: Maybe<CreateNotificationOutput>;
};


export type MutationCreateEventArgs = {
  input?: InputMaybe<CreateEventInput>;
};


export type MutationCreateNotificationArgs = {
  input?: InputMaybe<CreateNotificationInput>;
};


export type MutationUpdateEventArgs = {
  input?: InputMaybe<UpdateEventInput>;
};


export type MutationUpdateNotificationArgs = {
  input?: InputMaybe<UpdateNotificationInput>;
};

export type Notification = {
  __typename?: 'Notification';
  amount?: Maybe<Scalars['Int']['output']>;
  details?: Maybe<Scalars['String']['output']>;
  eventId?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  isCompleted?: Maybe<Scalars['Boolean']['output']>;
  nextDate?: Maybe<Scalars['String']['output']>;
  paidDate?: Maybe<Scalars['String']['output']>;
  tag?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  title?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  doMigration?: Maybe<Scalars['Boolean']['output']>;
  fetchEvents?: Maybe<FetchEventsOutput>;
  fetchNotifications?: Maybe<FetchNotificationsOutput>;
  fetchUsers?: Maybe<FetchUsersOutput>;
  getLoggedUser?: Maybe<User>;
};


export type QueryDoMigrationArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFetchEventsArgs = {
  frequency?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  month?: InputMaybe<Scalars['String']['input']>;
  nextDate?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  year?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFetchNotificationsArgs = {
  eventId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  month?: InputMaybe<Scalars['String']['input']>;
  year?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFetchUsersArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
  mobile?: InputMaybe<Scalars['Int']['input']>;
};

export type RefreshUserInput = {
  token?: InputMaybe<Scalars['String']['input']>;
};

export type RegisterUserInput = {
  mobile: Scalars['Int']['input'];
  passWord: Scalars['String']['input'];
  userName: Scalars['String']['input'];
};

export type RegisterUserOutput = {
  __typename?: 'RegisterUserOutput';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type UpdateEventInput = {
  data?: InputMaybe<CreateEventInput>;
};

export type UpdateNotificationInput = {
  data?: InputMaybe<CreateNotificationInput>;
};

export type User = {
  __typename?: 'User';
  display?: Maybe<Scalars['String']['output']>;
  mobile?: Maybe<Scalars['Int']['output']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateEventInput: CreateEventInput;
  CreateEventOutput: ResolverTypeWrapper<CreateEventOutput>;
  CreateNotificationInput: CreateNotificationInput;
  CreateNotificationOutput: ResolverTypeWrapper<CreateNotificationOutput>;
  Event: ResolverTypeWrapper<Event>;
  FetchEventsOutput: ResolverTypeWrapper<FetchEventsOutput>;
  FetchNotificationsOutput: ResolverTypeWrapper<FetchNotificationsOutput>;
  FetchUsersOutput: ResolverTypeWrapper<FetchUsersOutput>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  LoginUserOutput: ResolverTypeWrapper<LoginUserOutput>;
  Mutation: ResolverTypeWrapper<{}>;
  Notification: ResolverTypeWrapper<Notification>;
  Query: ResolverTypeWrapper<{}>;
  RefreshUserInput: RefreshUserInput;
  RegisterUserInput: RegisterUserInput;
  RegisterUserOutput: ResolverTypeWrapper<RegisterUserOutput>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UpdateEventInput: UpdateEventInput;
  UpdateNotificationInput: UpdateNotificationInput;
  User: ResolverTypeWrapper<User>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  CreateEventInput: CreateEventInput;
  CreateEventOutput: CreateEventOutput;
  CreateNotificationInput: CreateNotificationInput;
  CreateNotificationOutput: CreateNotificationOutput;
  Event: Event;
  FetchEventsOutput: FetchEventsOutput;
  FetchNotificationsOutput: FetchNotificationsOutput;
  FetchUsersOutput: FetchUsersOutput;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  LoginUserOutput: LoginUserOutput;
  Mutation: {};
  Notification: Notification;
  Query: {};
  RefreshUserInput: RefreshUserInput;
  RegisterUserInput: RegisterUserInput;
  RegisterUserOutput: RegisterUserOutput;
  String: Scalars['String']['output'];
  UpdateEventInput: UpdateEventInput;
  UpdateNotificationInput: UpdateNotificationInput;
  User: User;
}>;

export type CreateEventOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateEventOutput'] = ResolversParentTypes['CreateEventOutput']> = ResolversObject<{
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CreateNotificationOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateNotificationOutput'] = ResolversParentTypes['CreateNotificationOutput']> = ResolversObject<{
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EventResolvers<ContextType = any, ParentType extends ResolversParentTypes['Event'] = ResolversParentTypes['Event']> = ResolversObject<{
  default?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  endDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  frequency?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isCompleted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nextDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  notifications?: Resolver<Maybe<Array<Maybe<ResolversTypes['Notification']>>>, ParentType, ContextType>;
  startDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tag?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FetchEventsOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['FetchEventsOutput'] = ResolversParentTypes['FetchEventsOutput']> = ResolversObject<{
  data?: Resolver<Maybe<Array<Maybe<ResolversTypes['Event']>>>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FetchNotificationsOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['FetchNotificationsOutput'] = ResolversParentTypes['FetchNotificationsOutput']> = ResolversObject<{
  data?: Resolver<Maybe<Array<Maybe<ResolversTypes['Notification']>>>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type FetchUsersOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['FetchUsersOutput'] = ResolversParentTypes['FetchUsersOutput']> = ResolversObject<{
  data?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LoginUserOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginUserOutput'] = ResolversParentTypes['LoginUserOutput']> = ResolversObject<{
  accessToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createEvent?: Resolver<Maybe<ResolversTypes['CreateEventOutput']>, ParentType, ContextType, Partial<MutationCreateEventArgs>>;
  createNotification?: Resolver<Maybe<ResolversTypes['CreateNotificationOutput']>, ParentType, ContextType, Partial<MutationCreateNotificationArgs>>;
  updateEvent?: Resolver<Maybe<ResolversTypes['CreateEventOutput']>, ParentType, ContextType, Partial<MutationUpdateEventArgs>>;
  updateNotification?: Resolver<Maybe<ResolversTypes['CreateNotificationOutput']>, ParentType, ContextType, Partial<MutationUpdateNotificationArgs>>;
}>;

export type NotificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Notification'] = ResolversParentTypes['Notification']> = ResolversObject<{
  amount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  details?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  eventId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isCompleted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  nextDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  paidDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tag?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  doMigration?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, Partial<QueryDoMigrationArgs>>;
  fetchEvents?: Resolver<Maybe<ResolversTypes['FetchEventsOutput']>, ParentType, ContextType, Partial<QueryFetchEventsArgs>>;
  fetchNotifications?: Resolver<Maybe<ResolversTypes['FetchNotificationsOutput']>, ParentType, ContextType, Partial<QueryFetchNotificationsArgs>>;
  fetchUsers?: Resolver<Maybe<ResolversTypes['FetchUsersOutput']>, ParentType, ContextType, Partial<QueryFetchUsersArgs>>;
  getLoggedUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
}>;

export type RegisterUserOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['RegisterUserOutput'] = ResolversParentTypes['RegisterUserOutput']> = ResolversObject<{
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  display?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  mobile?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  CreateEventOutput?: CreateEventOutputResolvers<ContextType>;
  CreateNotificationOutput?: CreateNotificationOutputResolvers<ContextType>;
  Event?: EventResolvers<ContextType>;
  FetchEventsOutput?: FetchEventsOutputResolvers<ContextType>;
  FetchNotificationsOutput?: FetchNotificationsOutputResolvers<ContextType>;
  FetchUsersOutput?: FetchUsersOutputResolvers<ContextType>;
  LoginUserOutput?: LoginUserOutputResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Notification?: NotificationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RegisterUserOutput?: RegisterUserOutputResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;

