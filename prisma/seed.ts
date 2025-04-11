import { PrismaClient } from "@prisma/client";
import users from "./data/test.users.json";
import events from "./data/test.events.json";
import notifications from "./data/test.notifications.json";

const prisma = new PrismaClient();

async function main() {
  await prisma.notification.deleteMany({});
  await prisma.event.deleteMany({});
  await prisma.user.deleteMany({});

  for (const user of users) {
    await prisma.user.create({ data: user as any });
  }

  for (const event of events) {
    await prisma.event.create({ data: event as any });
  }

  for (const notification of notifications) {
    await prisma.notification.create({ data: notification as any });
  }
}

main()
  .then(() => console.log("Seeded successfully"))
  .catch(console.error)
  .finally(() => prisma.$disconnect());
