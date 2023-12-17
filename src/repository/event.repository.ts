import { GenericRepository } from "./generic.repository";
import {  Event } from '@prisma/client';

export class EventRepository extends GenericRepository<Event> {
  constructor() {
    super('Event');
  }
}
