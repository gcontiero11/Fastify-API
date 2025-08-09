import Fastify from "fastify";
import routes from "./routes/routes";

export const app = Fastify();

app.register(routes);

app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is running on ${address}`);
});
