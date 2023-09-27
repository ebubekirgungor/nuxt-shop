import { prisma } from "../../db";
import { getServerSession } from "#auth";
interface IRequestBody {
  title: string;
  category_id: number;
  list_price: number;
  stock_quantity: number;
}
export default defineEventHandler(async (event) => {
  const productId = getRouterParam(event, "id") as any;
  console.log(`POST /api/products/${productId}`);
  const { title, category_id, list_price, stock_quantity } =
    await readBody<IRequestBody>(event);
  const session = await getServerSession(event);
  try {
    if (session) {
      await prisma.product.update({
        where: { id: parseInt(productId) },
        data: {
          title: title,
          category_id: category_id,
          list_price: list_price,
          stock_quantity: stock_quantity,
        },
      });
      return "SUCCESS";
    } else {
      return "NOT_LOGGED_IN";
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
