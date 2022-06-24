import { Helmet, HelmetProps } from 'react-helmet';

type Props = Pick<
  HelmetProps,
  | 'async'
  | 'base'
  | 'titleTemplate'
  | 'defaultTitle'
  | 'title'
  | 'defer'
  | 'encodeSpecialCharacters'
> & {
  lang?: string;
  siteName?: string;
  type?: string;
  imageUrl?: string;
  description?: string;
  canonicalUrl?: string;
  googleSiteVerification?: string;
  robots?: string;
};

const Meta = (props: Props) => {
  const { lang = 'en', titleTemplate = '%s' } = props;
  const title = titleTemplate.replace('%s', props.title ?? props.defaultTitle ?? '');

  return (
    <Helmet>
      <html lang={lang} prefix="og: https://ogp.me/ns#" />
      <meta charSet="utf-8" />
      <title>{title}</title>
      {props.description && <meta name="description" content={props.description} />}
      {props.robots && <meta name="robots" content={props.robots} />}
      <meta property="og:title" content={title} />
      <meta property="twitter:title" content={title} />
      <meta property="og:locale" content={lang} />
      {props.siteName && <meta property="og:site_name" content={props.siteName} />}
      {props.type && (
        <>
          <meta property="og:type" content={props.type} />
          <meta property="twitter:card" content={props.type} />
        </>
      )}
      {props.description && (
        <>
          <meta property="og:description" content={props.description} />
          <meta property="twitter:description" content={props.description} />
        </>
      )}
      {props.canonicalUrl && <meta property="og:url" content={props.canonicalUrl} />}
      {props.imageUrl && (
        <>
          <meta property="og:image" content={props.imageUrl} />
          <meta property="twitter:image" content={props.imageUrl} />
        </>
      )}
      {props.canonicalUrl && <link rel="canonical" href={props.canonicalUrl} />}
    </Helmet>
  );
};

export default Meta;
