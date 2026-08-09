interface CacheEntry<T> {
  data: T;
  expiry: number;
}

export class HttpClient {
  private apiKey: string = '';
  private cache = new Map<string, CacheEntry<unknown>>();
  private inFlight = new Map<string, Promise<unknown>>();
  private cacheTtlMs: number;

  constructor(cacheTtlMs: number = 5 * 60 * 1000) {
    this.cacheTtlMs = cacheTtlMs;
  }

  setApiKey(apiKey: string): void {
    this.apiKey = apiKey;
  }

  getApiKey(): string {
    return this.apiKey;
  }

  async request<T>(url: string, params: Record<string, unknown> = {}): Promise<T> {
    if (!this.apiKey) {
      throw new Error('Pexels API key not initialized. Please call init().');
    }

    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null) {
        queryParams.append(key, String(val));
      }
    });

    const queryString = queryParams.toString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;
    const cacheKey = `GET:${fullUrl}`;

    // 1. Check Cache
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() < cached.expiry) {
      return cached.data as T;
    }

    // 2. Check In-Flight (De-duplication)
    const activePromise = this.inFlight.get(cacheKey);
    if (activePromise) {
      return activePromise as Promise<T>;
    }

    // 3. Request
    const requestPromise = (async (): Promise<T> => {
      try {
        const response = await fetch(fullUrl, {
          headers: {
            Authorization: this.apiKey,
          },
        });

        if (!response.ok) {
          const errText = await response.text().catch(() => 'No details');
          throw new Error(`Pexels API error: Status ${response.status} (${errText})`);
        }

        const data = (await response.json()) as T;

        // Save Cache
        this.cache.set(cacheKey, {
          data,
          expiry: Date.now() + this.cacheTtlMs,
        });

        return data;
      } finally {
        this.inFlight.delete(cacheKey);
      }
    })();

    this.inFlight.set(cacheKey, requestPromise);
    return requestPromise;
  }

  clearCache(): void {
    this.cache.clear();
    this.inFlight.clear();
  }
}
