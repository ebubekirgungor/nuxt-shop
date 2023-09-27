import { prisma } from "../../db";
import { getServerSession } from "#auth";
interface IRequestBody {
  title: string;
  category_id: any;
  list_price: any;
  stock_quantity: any;
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
          title,
          category_id: parseInt(category_id),
          list_price: parseInt(list_price),
          stock_quantity: parseInt(stock_quantity),
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
