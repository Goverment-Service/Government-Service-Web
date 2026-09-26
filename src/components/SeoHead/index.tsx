import React from 'react';
import Head from '@docusaurus/Head';

const SITE_NAME = 'Government Service Navigator';

type Props = {
  path: string;
  title?: string;
  description?: string;
  image?: string;
};

export default function SeoHead({path, title, description, image}: Props): React.ReactElement {
  // No fixed production domain yet, so canonical URLs follow wherever the site is served.
  const siteUrl = typeof window === 'undefined' ? '' : window.location.origin;
  const url = path === '/' ? siteUrl : `${siteUrl}${path}`;
  const metaTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} - Digital Government Services`;
  const metaDescription =
    description ||
    'Government Service Navigator is a multi-platform system for delivering and managing digital government services - an ASP.NET Core API, a React officer dashboard, a Flutter citizen app, and a four-agent AI pipeline.';
  const metaImage = `${siteUrl}${image ?? '/logo.png'}`;

  return (
    <Head>
      <link rel="canonical" href={url} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
    </Head>
  );
}
