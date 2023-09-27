import { prisma } from "../../db";
import { getServerSession } from "#auth";
export default defineEventHandler(async (event) => {
  console.log("GET /api/users");
  const session = await getServerSession(event);
  try {
    console.log("Find users");
    if (session) {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          username: true,
          email: true,
          name: true,
        },
      });
      return users;
    } else {
      event.node.res.statusCode = 403;
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
