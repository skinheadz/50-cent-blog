import Head from 'next/head';
import Link from 'next/link';
import Date from '../components/date';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import loadPosts from '../lib/load-posts';
import SendPost from '../components/sendpost';

export async function getServerSideProps() {
  const allPostsData = await loadPosts();
  return {
    props: {
      allPostsData: JSON.parse(JSON.stringify(allPostsData))
    },
  };
}

// function handleSubmit(e) {
//   //e.preventDefault();
//   console.log('You clicked submit.');
// }
// const handleSubmit = async (e) => {
//   e.preventDefault()
//   const body = { author, header, message }
//   try {
//     const response = await fetch('/api/inquiry', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(body)
//     })
//     if (response.status !== 200) {
//       console.log('something went wrong')
//       //set an error banner here
//     } else {
//       resetForm()
//       console.log('form submitted successfully !!!')
//       //set a success banner here
//     }
//     //check response, if success is false, dont take them to success page
//   } catch (error) {
//     console.log('there was an error submitting', error)
//   }
// }

// const resetForm = () => {
//   setAuthor('')
//   setHeader('')
//   setMessage('')
// }



export default function Home({allPostsData}) {

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={utilStyles.headingMd}>
        <p><strong>Curtis James Jackson III (born July 6, 1975)</strong>, known professionally as 50 Cent, is an American rapper, actor, and businessman.</p>
        <p>After 50 got arrested, he didn't have enough money to buy his own package, so he had to work for someone else to bag their vials for a weekly wage. 50 made a deal with the other two that worked with him, that he would give them his 100 dollars to split, if they let 50 steal from each vial without telling the guy they were working for. After stealing enough for a package, he went back to his old corner to start selling for himself again.

Man is the definition of a hustler.</p>
      </section>


      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, createdAt, header }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}><a>{header}</a></Link>
              <br />
              <Date dateString={createdAt} />
            </li>
          ))}
        </ul>
      </section>

      <SendPost />
      <section>
      <div class="footer-social-links">
  <a href="https://github.com/skinheadz" title="Github" target="_blank"><i class="fa fa-github"></i></a>
</div>
      </section>
    </Layout>
  );
  }
