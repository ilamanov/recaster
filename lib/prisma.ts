// import "server-only";

// import { PrismaClient } from "@prisma/client";

// // https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined;
// };

// const prisma = globalForPrisma.prisma ?? new PrismaClient();

// export { prisma };

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
