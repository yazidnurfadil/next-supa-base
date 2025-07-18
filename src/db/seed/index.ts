import { seedSuperUser } from "./superUser";
import { seedBusiness } from "./businessAccount";

const seed = async () => {
  try {
    console.log("");
    await seedSuperUser();
    await seedBusiness();

    console.log("[\x1b[32m%s\x1b[0m]", "✓", "Database seeded successfully!");
    process.exit(0);
  } catch (_error) {
    console.log("[\x1b[31m%s\x1b[0m]", "X", "Database seed failed!");
    process.exit(1);
  }
};

await seed();
