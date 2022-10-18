import loadPosts from "../../lib/load-posts";
import prisma from "../../lib/prisma";


export default async function handler(req, res) {
    try {

      switch (req.method) {

        case "GET": {
          const post = await loadPosts();
          //const post = await prisma.inquiry.findMany(); sends to load-posts.js so i can use it locally as well with getStaticProp
          res.json(post);
          break
        }

        case "POST": {
          return await createInquiry(req, res);
        }

        default: {
          res.setHeader("Allow", ["GET", "POST"])
          res.status(405).send("Method Not Allowed")
        }
      }
    } catch (err) {
      console.error(err.message)

      res.status(500).json({
        statusCode: 500,
        message: err.message,
      })
    }
 }

 async function createInquiry(req, res) {
  const body = req.body;
    try {
      const post = await prisma.inquiry.create({
        data: {
          createdAt: body.createdAt,
          author: body.author,
          header: body.header,
          message: body.message
        }
    })
    return res.status(200).json(post, { success: true })
    } catch (error) {
      console.error('Request error', error)
      res.status(500).json({ error: 'Error creating question', success: false })
    }
  }
  //NOT PART OF CLIENT BUNDLE: NO STATIC PROPS