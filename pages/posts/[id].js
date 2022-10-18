import Head from 'next/head';
import Layout from "../../components/layout";
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import {loadPost} from '../../lib/load-posts';



export async function getServerSideProps({ params }) {
    const allPost = await loadPost(Number(params.id));
    const postData = JSON.parse(JSON.stringify(allPost));
    return {
        props: {postData}
    };
}

// export async function getStaticPaths() {
//     const allPosts = await loadPosts(); //all posts pulled array, need paths as strings with id prefix and params
//     const newPaths = [];
//     for (let post of allPosts) {
//         newPaths.push({ params: { id: JSON.stringify(post.id) } });
//     }
//     // const map = Array.prototype.map;
//     // const newPaths = map.call(allPosts, eachId => {return { params: {id: `${eachId.id}`}}}) MAP IS 16X SLOWER THAN FOR LOOP
//     return {
//         paths: newPaths,
//         fallback: false,
//     };
// }

export default function Post({ postData }) {

   return (<Layout>
    <Head>
        <title>{postData.header}</title>
    </Head>
    <article>
        <h1 className={utilStyles.headingXl}>{postData.header}</h1>
        <br />
        <div className={utilStyles.lightText}>
          <Date dateString={postData.createdAt} />
        </div>
        <br />
        <div dangerouslySetInnerHTML={{ __html: postData.message }} />
        <p className={utilStyles.lightText}>sent by: {postData.author}</p>
    </article>
   </Layout>
   )
}