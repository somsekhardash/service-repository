import { GenericRepository } from "./generic.repository";
import database, { IEventDocument } from "../database";

export class EventRepository extends GenericRepository<IEventDocument> {
  constructor() {
    super(database.eventDB);
  }
}
