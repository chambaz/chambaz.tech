import Head from 'next/head'

const Meta = (props) => {
  return (
    <Head>
      <title>{props.title}</title>
      <meta property="og:title" content={props.title} />
    </Head>
  )
}

export default Meta
