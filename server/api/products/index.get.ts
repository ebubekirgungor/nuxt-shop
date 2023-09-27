import { prisma } from "../../db";
export default defineEventHandler(async (event) => {
  console.log("GET /api/products");
  try {
    console.log("Find products");
    const products = await prisma.product.findMany({
      include: {
        category: {
          select: { title: true },
        },
      },
    });
    return products;
  } catch (err) {
    console.dir(err);
    event.node.res.statusCode = 500;
    return {
      code: "ERROR",
      message: "Error",
    };
  }
});
