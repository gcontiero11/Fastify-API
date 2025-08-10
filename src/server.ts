import Fastify from "fastify";
import routes from "./routes/routes";
import { resetDb } from "./prisma/seed";

export const app = Fastify();

app.register(routes);

function quit(error: Error | unknown) {
  console.error(error);
  process.exit(1);
}

async function start() {
  try {
    await resetDb();
    app.listen({ port: 3000 }, (err, address) => {
      if (err) {
        console.log("Error starting server");
        quit(err);
      }
      console.log(`Server is running on ${address}`);
    });
  } catch (error) {
    console.log("Error resetting database");
    quit(error);
  }
}

start();
