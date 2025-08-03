import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Vérifier les variables d'environnement
  const config = {
    hasApiKey: !!process.env.AIRTABLE_API_KEY,
    hasBaseId: !!process.env.AIRTABLE_BASE_ID,
    hasTableName: !!process.env.AIRTABLE_TABLE_NAME,
    apiKeyPrefix: process.env.AIRTABLE_API_KEY?.substring(0, 10),
    baseId: process.env.AIRTABLE_BASE_ID,
    tableName: process.env.AIRTABLE_TABLE_NAME,
    tableNameEncoded: encodeURIComponent(process.env.AIRTABLE_TABLE_NAME || ''),
    tableNameCharCodes: process.env.AIRTABLE_TABLE_NAME?.split('').map(c => ({
      char: c,
      code: c.charCodeAt(0)
    }))
  };

  // Tester la connexion Airtable avec différents encodages
  const tests = [];

  // Test 1: Nom original
  if (process.env.AIRTABLE_API_KEY && process.env.AIRTABLE_BASE_ID && process.env.AIRTABLE_TABLE_NAME) {
    try {
      const response1 = await fetch(
        `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${encodeURIComponent(process.env.AIRTABLE_TABLE_NAME)}?maxRecords=1`,
        {
          headers: {
            'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`
          }
        }
      );
      const data1 = await response1.json();
      tests.push({
        test: 'Nom encodé',
        url: `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${encodeURIComponent(process.env.AIRTABLE_TABLE_NAME)}`,
        status: response1.status,
        success: response1.ok,
        data: data1
      });
    } catch (error) {
      tests.push({
        test: 'Nom encodé',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    // Test 2: Table ID direct (essayer sans espace)
    try {
      const tableNameNoSpace = process.env.AIRTABLE_TABLE_NAME.replace(' ', '%20');
      const response2 = await fetch(
        `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${tableNameNoSpace}?maxRecords=1`,
        {
          headers: {
            'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`
          }
        }
      );
      const data2 = await response2.json();
      tests.push({
        test: 'Avec %20 pour espace',
        url: `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${tableNameNoSpace}`,
        status: response2.status,
        success: response2.ok,
        data: data2
      });
    } catch (error) {
      tests.push({
        test: 'Avec %20 pour espace',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    // Test 3: Utiliser l'ID de table au lieu du nom
    // D'abord, récupérer la liste des tables
    try {
      const baseResponse = await fetch(
        `https://api.airtable.com/v0/meta/bases/${process.env.AIRTABLE_BASE_ID}/tables`,
        {
          headers: {
            'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`
          }
        }
      );
      const baseData = await baseResponse.json();
      tests.push({
        test: 'Liste des tables',
        status: baseResponse.status,
        success: baseResponse.ok,
        data: baseData
      });
    } catch (error) {
      tests.push({
        test: 'Liste des tables',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  return res.status(200).json({
    config,
    tests,
    suggestion: 'Si le nom de table contient des caractères spéciaux, utilisez plutôt l\'ID de la table (tbl...) qui est stable et ne change pas.'
  });
}