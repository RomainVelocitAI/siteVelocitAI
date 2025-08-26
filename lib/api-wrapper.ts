/**
 * Wrapper API avec gestion des timeouts et retry logic
 * Pour éviter les erreurs 500 après inactivité prolongée
 */

interface FetchOptions extends RequestInit {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Fetch avec timeout et retry logic
 */
export async function fetchWithTimeout(
  url: string,
  options: FetchOptions = {}
): Promise<Response> {
  const {
    timeout = 5000,
    retries = 3,
    retryDelay = 1000,
    ...fetchOptions
  } = options;

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      // Créer un AbortController pour le timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Si la réponse est OK, la retourner
      if (response.ok) {
        return response;
      }

      // Si erreur 500, retenter après un délai
      if (response.status >= 500 && attempt < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, retryDelay * (attempt + 1)));
        continue;
      }

      // Pour les autres erreurs, throw
      throw new ApiError(
        `API request failed: ${response.statusText}`,
        response.status
      );

    } catch (error: any) {
      // Si c'est le dernier essai, propager l'erreur
      if (attempt === retries - 1) {
        if (error.name === 'AbortError') {
          throw new ApiError('Request timeout', 408, 'TIMEOUT');
        }
        throw error;
      }

      // Attendre avant de retenter
      await new Promise(resolve => 
        setTimeout(resolve, retryDelay * (attempt + 1))
      );
    }
  }

  throw new ApiError('Max retries reached', 503, 'MAX_RETRIES');
}

/**
 * Wrapper pour les appels Airtable
 */
export async function fetchAirtable(
  endpoint: string,
  options: FetchOptions = {}
): Promise<any> {
  const baseUrl = process.env.AIRTABLE_BASE_URL || 'https://api.airtable.com/v0';
  const apiKey = process.env.AIRTABLE_API_KEY;

  if (!apiKey) {
    console.warn('Airtable API key not configured');
    return null;
  }

  try {
    const response = await fetchWithTimeout(
      `${baseUrl}/${endpoint}`,
      {
        ...options,
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          ...options.headers,
        },
        timeout: 10000, // 10 secondes pour Airtable
        retries: 3,
      }
    );

    return await response.json();
  } catch (error) {
    console.error('Airtable API error:', error);
    // Retourner des données par défaut en cas d'erreur
    return null;
  }
}

/**
 * Cache simple en mémoire pour éviter les appels répétés
 */
class SimpleCache {
  private cache = new Map<string, { data: any; expires: number }>();

  set(key: string, data: any, ttl: number = 60000) {
    this.cache.set(key, {
      data,
      expires: Date.now() + ttl,
    });
  }

  get(key: string): any | null {
    const item = this.cache.get(key);
    
    if (!item) return null;
    
    if (Date.now() > item.expires) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data;
  }

  clear() {
    this.cache.clear();
  }
}

export const apiCache = new SimpleCache();

/**
 * Fetch avec cache
 */
export async function fetchWithCache(
  key: string,
  fetcher: () => Promise<any>,
  ttl: number = 60000
): Promise<any> {
  // Vérifier le cache
  const cached = apiCache.get(key);
  if (cached !== null) {
    return cached;
  }

  // Faire l'appel API
  const data = await fetcher();
  
  // Mettre en cache si les données sont valides
  if (data !== null && data !== undefined) {
    apiCache.set(key, data, ttl);
  }
  
  return data;
}