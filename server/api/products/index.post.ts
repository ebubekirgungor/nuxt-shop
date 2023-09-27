import { prisma } from "../../db";
import { getServerSession } from "#auth";
interface IRequestBody {
  title: string;
  category_id: number;
  list_price: number;
  stock_quantity: number;
}
export default defineEventHandler(async (event) => {
  console.log("POST /api/products");
  const { title, category_id, list_price, stock_quantity } =
    await readBody<IRequestBody>(event);
  const session = await getServerSession(event);
  try {
    if (!session) {
      event.node.res.statusCode = 403;
      return "NOT_LOGGED_IN";
    } else {
      console.log("Create product");
      await prisma.product.create({
        data: {
          title,
          category_id,
          list_price,
          stock_quantity,
        },
      });
      event.node.res.statusCode = 200;
      return "SUCCESS";
    }
  } catch (err) {
    console.dir(err);
    event.node.res.statusCode = 500;
    return "ERROR";
  }
});
