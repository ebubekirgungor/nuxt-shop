import { prisma } from "../../db";
import { getServerSession } from "#auth";
export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, "id") as any;
  console.log(`GET /api/users/${userId}`);
  const session = await getServerSession(event);
  try {
    console.log("Find user");
    const userData = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });
    if (userData) {
      console.log("User found");
      return {
        id: userData.id,
        username: userData.username,
        email: userData.email,
        name: userData.name,
      };
    } else if (!session) {
      return "NOT_LOGGED_IN";
    } else {
      console.log("User not found");
      event.node.res.statusCode = 404;
      return {
        code: "USER_NOT_FOUND",
        message: `User with id ${userId} doesn't exists.`,
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
