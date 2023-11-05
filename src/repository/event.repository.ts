import { GenericRepository } from "./generic.repository";
import database, { IEvent } from "../database";

export class EventRepository extends GenericRepository<IEvent> {
  constructor() {
    super(database.eventDB);
  }
}
