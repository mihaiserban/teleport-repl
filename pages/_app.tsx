import App, { Container } from 'next/app'
import Head from 'next/head'
import React from 'react'

const DEFAULT_TITLE = 'teleportHQ REPL'
const DEFAULT_DESCRIPTION = 'teleportHQ REPL'
const DEFAULT_KEYWORDS = 'teleportHQ REPL'

export default class MyApp extends App {
  public static async getInitialProps({ Component, ctx }: any) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  public render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Head>
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-116252748-1"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-116252748-1');`,
            }}
          />
          <base href="/" />

          <title>{DEFAULT_TITLE}</title>
          {/*  <!-- General Meta Tags --> */}
          <meta charSet="utf-8" />
          <meta httpEquiv="Content-type" content="text/html;charset=UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,maximum-scale=1"
          />

          <meta name="description" content={DEFAULT_DESCRIPTION} />
          <meta name="keywords" content={DEFAULT_KEYWORDS} />
          <link rel="icon" href="static/favicon.ico" type="image/ico" />
          <link rel="shortcut icon" href="static/favicon.ico" type="image/x-icon" />
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,700|Source+Code+Pro"
            rel="stylesheet"
          />
          {/*  <!-- End General Meta Tags --> */}

          {/* <!-- Font from google. Used in AppPage component --> */}
          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans"
            rel="stylesheet"
          />
        </Head>
        <Component {...pageProps} />
      </Container>
    )
  }
}
