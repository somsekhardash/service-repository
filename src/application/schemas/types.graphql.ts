import gql from "graphql-tag";


export default gql`
  type Event {
    id: String
    name: String
    description: String
    type: String
    startDate: String
    endDate: String
    frequency: String
    default: Int
    isCompleted: Boolean
    tag: [String]
    notifications: [Notification]
    nextDate: String
  }

  type Notification {
    id: String
    amount: Int
    details: String
    paidDate: String
    nextDate: String
    isCompleted: Boolean
    title: String
    tag: [String]
    eventId: ID
    type: String
  }

  type User {
    display: String
    mobile: Int
  }

  type Query {
    doMigration(id: String): Boolean
    fetchEvents(
      id: String
      type: String
      month: String
      year: String
      title: String
      startDate: String
      frequency: String
      nextDate: String
    ): FetchEventsOutput

    fetchNotifications(
      id: String
      month: String
      year: String
      eventId: String
    ): FetchNotificationsOutput

    getLoggedUser: User
    fetchUsers(id: Int, mobile: Int): FetchUsersOutput
  }

  type Mutation {
    createEvent(input: CreateEventInput): CreateEventOutput
    createNotification(input: CreateNotificationInput): CreateNotificationOutput
    updateEvent(input: UpdateEventInput): CreateEventOutput
    updateNotification(input: UpdateNotificationInput): CreateNotificationOutput
  }

  type FetchEventsOutput {
    success: Boolean
    data: [Event]
  }

  type CreateEventOutput {
    success: Boolean
  }

  type CreateNotificationOutput {
    success: Boolean
  }

  type FetchNotificationsOutput {
    success: Boolean
    data: [Notification]
  }

  type FetchUsersOutput {
    success: Boolean
    data: [User]
  }

  type RegisterUserOutput {
    success: Boolean
  }

  type LoginUserOutput {
    success: Boolean
    accessToken: String
  }

  input CreateEventInput {
    id: String
    name: String
    description: String
    type: String
    startDate: String
    endDate: String
    frequency: String
    default: Int
    isCompleted: Boolean
    tag: [String]
  }

  input CreateNotificationInput {
    id: String
    amount: Int
    details: String
    paidDate: String
    nextDate: String
    isCompleted: Boolean
    title: String
    eventId: String
  }

  input UpdateEventInput {
    data: CreateEventInput
  }

  input UpdateNotificationInput {
    data: CreateNotificationInput
  }

  input RegisterUserInput {
    mobile: Int!
    passWord: String!
    userName: String!
  }

  input RefreshUserInput {
    token: String
  } 
`;
