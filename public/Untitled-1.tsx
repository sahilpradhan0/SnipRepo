// Typical ugly copy-paste people post on Twitter
const prisma = new PrismaClient();

async function getPosts(page = 1) {
  const take = 10;
  const skip = (page - 1) * take;
  
  return prisma.post.findMany({
    take,
    skip,
    orderBy: { createdAt: 'desc' }
  });
}