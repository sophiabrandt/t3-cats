import { PrismaClient } from "@prisma/client";
import { fetch } from "next/dist/compiled/@edge-runtime/primitives/fetch";

const prisma = new PrismaClient();

async function main() {
  await prisma.cat.deleteMany();

  const requests = Array(10)
    .fill("https://aws.random.cat/meow")
    .map((url) => fetch(url));

  Promise.all(requests)
    // map array of responses into an array of response.json() to read their content
    .then((responses) => Promise.all(responses.map((r) => r.json())))
    // insert all responses as imageUrl
    .then((cats) =>
      cats.forEach(
        async (cat) => await prisma.cat.create({ data: { imageUrl: cat.file } })
      )
    );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
