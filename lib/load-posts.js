import prisma from "./prisma";

export default async function loadPosts() {
    // Call an external API endpoint to get posts
    const res = await prisma.inquiry.findMany({
        orderBy: {
           createdAt: 'asc',
          },
        });
    return res;
  }

  export async function loadPost(id) {
    // Call an external API endpoint to get posts
    const res = await prisma.inquiry.findUnique({
        where: {id},
        })
    return res;
  }
  