import { prisma } from "../../db";
import { getServerSession } from "#auth";
export default defineEventHandler(async (event) => {
  console.log("GET /api/products");
  const session = await getServerSession(event);
  try {
    console.log("Find products");
    if (session) {
      const productsData = await prisma.product.findMany({
        include: {
          category: true,
        },
      });

      return productsData;
    }
  } catch (err) {
    console.dir(err);
    event.node.res.statusCode = 500;
    return {
      code: "ERROR",
      message: "Error",
    };
  }
});
