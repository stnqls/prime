import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1.6,user-scalable=no"
        />
        <Head>
          <meta charSet="utf-8" />

          <title>프라임 인베스트먼트</title>
          <meta
            name="description"
            content="프라임에서 누구나 쉽고 안전하게, 새로운 투자를 경험해보세요"
          />
          {/* <meta
            name="description"
            content="프라임에서 검증된 전문가와 함께 투자해보세요."
          /> */}

          <link
            rel="shortcut icon"
            href="/images/favicons/apple-icon-180x180.png"
          />
          <link
            rel="apple-touch-icon"
            href="/images/favicons/apple-icon-180x180.png"
          />
          <link
            rel="shortcut icon"
            href="/images/favicons/favicon.ico"
            type="image/x-icon"
          />
          <link
            rel="icon"
            href="/images/favicons/favicon.ico"
            type="image/x-icon"
          />

          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="theme-color" content="#000000" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-title"
            content="프라임 인베스트먼트"
          />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="msapplication-navbutton-color" content="#000000" />
          <meta name="msapplication-TileColor" content="#000000" />
          <meta name="msapplication-config" content="browserconfig.xml" />
          <meta name="application-name" content="프라임 인베스트먼트" />
          <meta name="msapplication-tooltip" content="Tooltip Text" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="full-screen" content="yes" />
          <meta name="browsermode" content="application" />

          <meta name="nightmode" content="enable/disable" />
          <meta name="layoutmode" content="fitscreen/standard" />
          <meta name="imagemode" content="force" />
          <meta name="screen-orientation" content="portrait" />
          <meta name="theme-color" content="#000000" />
          <meta name="msapplication-navbutton-color" content="#000000" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="#000000"
          />
          <link href="/images/favicons/manifest.json" rel="manifest" />

          <link rel="canonical" href="https://primeinvestment.kr" />
          <meta property="og:type" content="website" />
          <meta property="fb:app_id" content="643839059141513" />

          <meta property="al:ios:url" content="applinks://docs" />
          <meta property="al:ios:app_store_id" content="12345" />
          <meta property="al:ios:app_name" content="App Links" />
          <meta property="al:android:url" content="applinks://docs" />
          <meta property="al:android:app_name" content="App Links" />
          <meta property="al:android:package" content="org.applinks" />
          <meta
            property="al:web:url"
            content="http://applinks.org/documentation"
          />

          <meta property="og:site_name" content="primeinvestment" />
          <meta property="og:title" content="프라임 인베스트먼트" />
          <meta
            property="og:description"
            content="프라임에서 검증된 전문가와 함께 투자해보세요."
          />
          <meta
            property="og:image"
            content="/images/prime_seo.png"
            key="ogimage"
          />
          <meta property="og:image" content="/images/prime_seo.png" />

          <meta property="og:url" content="https://primeinvestment.kr" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta property="twitter:domain" content="primeinvestment.kr" />
          <meta property="twitter:url" content="https://primeinvestment.kr" />
          <meta name="twitter:title" content="프라임 인베스트먼트" />
          <meta
            name="twitter:description"
            content="프라임에서 검증된 전문가와 함께 투자해보세요."
          />
          <meta name="twitter:image" content="/images/prime_seo.png"></meta>
        </Head>
        <body>
          <Main />
          <div id="myportal" />
          <NextScript />
        </body>
      </Html>
    );
  }
}
