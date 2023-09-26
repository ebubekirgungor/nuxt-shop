import { prisma } from "../../db";
import { getServerSession } from "#auth";
export default defineEventHandler(async (event) => {
  console.log("GET /api/users");
  const session = await getServerSession(event);
  try {
    console.log("Find users");
    if (session) {
      const usersData = await prisma.user.findMany();

      return usersData;
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
