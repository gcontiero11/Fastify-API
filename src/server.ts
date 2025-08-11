import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import {
  validatorCompiler,
  serializerCompiler,
  type ZodTypeProvider,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import routes from "./routes/routes";
import { resetDb } from "./prisma/seed";

export const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
  origin: "*",
});

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Salespace Challenge API",
      description: "API for the Salespace challenge",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

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
