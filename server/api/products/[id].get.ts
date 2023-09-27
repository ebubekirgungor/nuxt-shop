import { prisma } from "../../db";
export default defineEventHandler(async (event) => {
  const productId = getRouterParam(event, "id") as any;
  console.log(`GET /api/products/${productId}`);
  try {
    console.log("Find product");
    const product = await prisma.product.findUnique({
      where: { id: parseInt(productId) },
      include: {
        category: {
          select: { title: true },
        },
      },
    });
    if (product) {
      console.log("Product found");
      return product;
    } else {
      console.log("Product not found");
      event.node.res.statusCode = 404;
      return {
        code: "PRODUCT_NOT_FOUND",
        message: `Product with id ${productId} doesn't exists.`,
      };
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
