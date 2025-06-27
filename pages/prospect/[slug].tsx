import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import ProspectLanding from '../../templates/ProspectLanding';

// Cette fonction est exécutée au moment du build pour générer les chemins statiques
export const getStaticPaths: GetStaticPaths = async () => {
  // Pour les pages générées dynamiquement, retournez un tableau vide
  return {
    paths: [],
    fallback: 'blocking',
  };
};

// Cette fonction est exécutée au moment du build pour chaque chemin
export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as { slug: string };
  
  // Ici, vous pourriez faire un appel API ou une requête à une base de données
  // pour récupérer les données du prospect en fonction du slug
  // Pour l'instant, nous utilisons des données factices
  const prospectData = {
    prospectName: 'Prénom Nom',
    companyName: 'Nom de l\'entreprise',
    email: 'contact@entreprise.com',
    phone: '01 23 45 67 89',
  };

  return {
    props: {
      ...prospectData,
    },
    // Revalider la page après 1 jour (en secondes)
    revalidate: 86400,
  };
};

export default function ProspectPage(props: any) {
  const router = useRouter();
  
  if (router.isFallback) {
    return <div>Chargement...</div>;
  }

  return <ProspectLanding {...props} />;
}
