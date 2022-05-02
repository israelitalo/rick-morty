import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';

import createEmotionCache from '../utility/createEmotionCache';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" type="image/png" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <meta name="description" content="Application next js integration with rick and morty api" />
          <meta name="author" content="IsraelDev" />
          <meta name="keywords" content="IsraelDev" />

          <link rel="alternate" href="" />
          <meta name="robots" content="index, follow" />

          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
          <meta property="og:url" content="https://rick-morty-rouge.vercel.app/" />
          <meta property="og:title" content="App Rick e Morty" />
          <meta property="og:image" content="../assets/images/rick_little.png" />
          <meta property="og:description" content="Aplicação Next js com integração com API Rick and Morty" />
          <meta name="theme-color" content="#02bacf" />

          <meta property="business:contact_data:country_name" content="Brasil" />
          <meta property="business:contact_data:website" content="https://rick-morty-rouge.vercel.app/" />
          <meta property="business:contact_data:region" content="PE" />
          <meta property="business:contact_data:email" content="israel2012@gmail.com" />
          <meta property="business:contact_data:phone_number" content="81 99530-9618" />


          <meta name="twitter:card" content="summary" />
          <meta name="twitter:description" content="Aplicação Next js com integração com API Rick and Morty" />
          <meta name="twitter:title" content="Next js - API Rick and Morty" />
          <meta name="twitter:image" content="../assets/images/rick_little.png" />


          <meta name="geo.placename" content="Pernambuco" />
          <meta name="geo.region" content="BR" />
          <meta name="description" content="Aplicação Next js com integração com API Rick and Morty" />
          <link rel="canonical" href="https://rick-morty-rouge.vercel.app/" />

          <meta property="og:type" content="website" />
          <meta property="og:locale" content="pt_BR" />
          <meta name="format-detection" content="telephone=no" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  const originalRenderPage = ctx.renderPage;

  // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  /* eslint-disable */
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) => (props) =>
        <App emotionCache={cache} {...props} />,
    });
  /* eslint-enable */

  const initialProps = await Document.getInitialProps(ctx);
  // This is important. It prevents emotion to render invalid HTML.
  // See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      ...emotionStyleTags,
    ],
  };
};
