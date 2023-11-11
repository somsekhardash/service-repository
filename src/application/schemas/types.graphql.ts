import gql from "graphql-tag";

export default gql`
  type Event {
    id: Int
    name: String
    type: String
    description: String
    startDate: String
    endDate: String
    frequency: String
    default: Int
    notifications: [Notification]
  }

  type Notification {
    id: Int
    amount: Int
    details: String
    paidDate: String
    nextDate: String
    type: String
    isCompleted: Boolean
    title: String
    eventid: ID
  }

  type User {
    id: Int
    display: String
    role: String
  }

  type Query {
    fetchEvents(
      id: Int
      type: String
      month: String
      year: String
      title: String
      startDate: String
      frequency: String
    ): FetchEventsOutput

    fetchNotifications(
      id: Int
      month: String
      year: String
    ): FetchNotificationsOutput

    fetchUsers(id: Int, mobile: Int): FetchUsersOutput
  }

  type Mutation {
    createEvent(input: CreateEventInput): CreateEventOutput
    createNotification(input: CreateNotificationInput): CreateNotificationOutput
    updateEvent(input: UpdateEventInput): CreateEventOutput
    registerUser(input: RegisterUserInput): RegisterUserOutput
    loginUser(input: RegisterUserInput): LoginUserOutput
    refreshUser(tokenInput: RefreshUserInput): LoginUserOutput
  }

  type FetchEventsOutput {
    success: Boolean
    data: [Event]
  }

  type CreateEventOutput {
    id: Int
    title: String
    type: String
    amount: Int
    startDate: String
    endDate: String
    frequency: String
  }

  type CreateNotificationOutput {
    id: Int
    amount: Int
    details: String
    createdDate: String
    nextDate: String
    isCompleted: Boolean
    title: String
    eventid: ID
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
    id: Int
    title: String
    type: String
    amount: Int
    startDate: String
    endDate: String
    frequency: String
  }

  input CreateNotificationInput {
    id: Int
    amount: Int
    details: String
    createdDate: String
    nextDate: String
    isCompleted: Boolean
    title: String
    eventid: Int
  }

  input UpdateEventInput {
    data: CreateEventInput
    findI: CreateEventInput
  }

  input RegisterUserInput {
    mobile: Int
    passWord: String
  }

  input RefreshUserInput {
    token: String
  }
`;
