import { prisma } from "../../db";
import { getServerSession } from "#auth";
interface IRequestBody {
  username: string;
  email: string;
  password: string;
  name: string;
}
export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, "id") as any;
  console.log(`POST /api/users/${userId}`);
  const { username, email, password, name } = await readBody<IRequestBody>(
    event
  );
  const session = await getServerSession(event);
  try {
    if (session) {
      await prisma.user.update({
        where: { id: parseInt(userId) },
        data: {
          username: username,
          email: email,
          password: password,
          name: name,
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
