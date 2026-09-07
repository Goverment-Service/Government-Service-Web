import React from 'react';
import Head from '@docusaurus/Head';

const SITE_URL = 'https://openschool.lk';

type Props = {
  path: string;
  title?: string;
  description?: string;
  image?: string;
};

export default function SeoHead({path, title, description, image}: Props): React.ReactElement {
  const url = path === '/' ? SITE_URL : `${SITE_URL}${path}`;
  const metaTitle = title ? `${title} | OpenSchool` : 'OpenSchool - Open Source School Management for Sri Lankan Schools';
  const metaDescription =
    description ||
    'OpenSchool is a free, open-source, self-hosted school management system built for Sri Lankan schools - covering academic years, students, guardians, attendance, timetables, and more.';
  const metaImage = image ? `${SITE_URL}${image}` : `${SITE_URL}/img/brand/og-cover.png`;

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

