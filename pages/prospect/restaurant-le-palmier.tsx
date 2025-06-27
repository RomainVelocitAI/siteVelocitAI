import { GetStaticProps } from 'next';
import { readFileSync } from 'fs';
import { join } from 'path';
import ProspectLanding from '../../templates/ProspectLanding';

export const getStaticProps: GetStaticProps = async () => {
  try {
    const dataPath = join(process.cwd(), 'data', 'prospects', 'restaurant-le-palmier.json');
    const jsonData = readFileSync(dataPath, 'utf8');
    const prospectData = JSON.parse(jsonData);

    return {
      props: prospectData,
      revalidate: 3600, // Revalide chaque heure
    };
  } catch (error) {
    console.error('Error loading prospect data:', error);
    return {
      notFound: true,
    };
  }
};

export default function RestaurantLePalmierPage(props: any) {
  return <ProspectLanding {...props} />;
}