import Head from 'next/head'

const Meta = (props) => {
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="description" content={props.description} />

      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@chambaz" />
      <meta name="twitter:creator" content="@chambaz" />
    </Head>
  )
}

export default Meta
