import { EventRepository } from "../repository/repository";

describe("Event repository", () => {
  let eventRepo: EventRepository = new EventRepository();

  it("should have access to a database connection", () => {
    expect(eventRepo.database).toBeDefined();
  });

  it("should have a method called createEvent", () => {
    expect(eventRepo.create).toBeDefined();
  });
});
