import { prisma } from "../../db";
import { getServerSession } from "#auth";
export default defineEventHandler(async (event) => {
  const productId = getRouterParam(event, "id") as any;
  console.log(`Delete /api/products/${productId}`);
  const session = await getServerSession(event);
  try {
    console.log("Find product");
    if (session) {
      await prisma.product.delete({
        where: { id: parseInt(productId) },
      });
      return "PRODUCT_DELETED";
    } else {
      return "NOT_LOGGED_IN";
    }
  } catch (err) {
    console.dir(err);
    return "ERROR";
  }
});
