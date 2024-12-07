import db from '@/app/lib/db';

// Fonction pour récupérer les intervenants avec pagination
export async function fetchIntervenants(query: string, page: number, limit: number) {
  const offset = (page - 1) * limit;
  const client = await db.connect();
  try {
    const result = await client.query(
      'SELECT * FROM intervenants WHERE email ILIKE $1 OR firstname ILIKE $1 OR lastname ILIKE $1 ORDER BY lastname, firstname LIMIT $2 OFFSET $3',
      [`%${query}%`, limit, offset]
    );
    return result.rows;
  } catch (err) {
    console.error('Erreur lors de la récupération des intervenants', err);
    throw err;
  } finally {
    client.release();
  }
}

// Fonction pour récupérer un intervenant par son identifiant
export async function fetchIntervenantById(id: string) {
  const client = await db.connect();
  try {
    const result = await client.query('SELECT * FROM intervenants WHERE id = $1', [id]);
    return result.rows[0];
  } catch (err) {
    console.error('Erreur lors de la récupération de l\'intervenant', err);
    throw err;
  } finally {
    client.release();
  }
}

export const validateKey = async (key: string) => {
  const client = await db.connect();
  try {
    const result = await client.query(
      'SELECT * FROM intervenants WHERE key = $1',
      [key]
    );
    if (result.rows.length === 0) {
      return { valid: false, message: 'Clé inconnue' };
    }

    const intervenant = result.rows[0];
    const currentDate = new Date();
    const endDate = new Date(intervenant.enddate);

    if (endDate < currentDate) {
      return { valid: false, message: 'Clé expirée' };
    }

    return { valid: true, intervenant };
  } catch (err) {
    console.error('Erreur lors de la validation de la clé', err);
    throw err;
  } finally {
    client.release();
  }
};