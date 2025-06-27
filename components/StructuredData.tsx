import Head from 'next/head';

interface StructuredDataProps {
  data: Record<string, any> | Array<Record<string, any>>;
}

const StructuredData = ({ data }: StructuredDataProps) => {
  const jsonLd = Array.isArray(data) ? data : [data];

  return (
    <Head>
      {jsonLd.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema, null, 2)
          }}
        />
      ))}
    </Head>
  );
};

export default StructuredData;