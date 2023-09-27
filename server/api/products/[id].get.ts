import { prisma } from "../../db";
import { getServerSession } from "#auth";
export default defineEventHandler(async (event) => {
  const productId = getRouterParam(event, "id") as any;
  console.log(`GET /api/products/${productId}`);
  const session = await getServerSession(event);
  try {
    console.log("Find product");
    const productData = await prisma.product.findUnique({
      where: { id: parseInt(productId) },
      include: {
        category: true,
      },
    });
    if (productData) {
      console.log("Product found");
      return {
        id: productData.id,
        title: productData.title,
        category_id: productData.category_id,
        list_price: productData.list_price,
        stock_quantity: productData.stock_quantity,
      };
    } else if (!session) {
      return "NOT_LOGGED_IN";
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
