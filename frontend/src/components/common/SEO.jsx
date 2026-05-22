import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords }) => {
  const baseTitle = 'Jasmin Paito | Accounting Professional';
  return (
    <Helmet>
      <title>{title ? `${title} | Jasmin Paito` : baseTitle}</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
    </Helmet>
  );
};

export default SEO;
