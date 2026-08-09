import { MediaCore } from './index';

async function runTests() {
  let fetchCount = 0;
  const mockPhotoPayload = {
    id: 12345,
    width: 800,
    height: 600,
    url: 'https://pexels.com/photo/12345',
    photographer: 'Jane Doe',
    photographer_url: 'https://pexels.com/@janedoe',
    photographer_id: 99,
    avg_color: '#ffffff',
    src: {
      original: 'https://images.pexels.com/original.jpg',
      large2x: 'https://images.pexels.com/large2x.jpg',
      large: 'https://images.pexels.com/large.jpg',
      medium: 'https://images.pexels.com/medium.jpg',
      small: 'https://images.pexels.com/small.jpg',
      portrait: 'https://images.pexels.com/portrait.jpg',
      landscape: 'https://images.pexels.com/landscape.jpg',
      tiny: 'https://images.pexels.com/tiny.jpg',
    },
    alt: 'Beautiful landscape',
  };

  (global as any).fetch = async (url: string, init: any) => {
    fetchCount++;

    const authHeader = init?.headers?.Authorization;
    if (authHeader !== 'valid-test-key') {
      return {
        ok: false,
        status: 401,
        text: async () => 'Unauthorized',
      } as any;
    }

    if (url.includes('/photos/12345')) {
      return {
        ok: true,
        status: 200,
        json: async () => mockPhotoPayload,
      } as any;
    }

    return {
      ok: true,
      status: 200,
      json: async () => ({
        page: 1,
        per_page: 15,
        photos: [mockPhotoPayload],
        total_results: 1,
      }),
    } as any;
  };

  const sdk = new MediaCore({ cacheTtlMs: 2000 });

  try {
    await sdk.getPhotoById(12345);
    throw new Error('Test 1 failed: Should have thrown error because API Key is not initialized');
  } catch (e: any) {
    if (e.message.includes('API key not initialized')) {
    } else {
      throw e;
    }
  }

  sdk.init('valid-test-key');

  let viewCount = 0;
  let downloadCount = 0;

  const onView = () => {
    viewCount++;
  };

  sdk.on('view', onView);
  sdk.on('download', () => {
    downloadCount++;
  });

  const item = await sdk.getPhotoById(12345);
  sdk.trackView(item);
  sdk.trackDownload(item);

  if (viewCount === 1 && downloadCount === 1) {
  } else {
    throw new Error(
      `Test 2 failed: Event counts incorrect. View=${viewCount}, Download=${downloadCount}`,
    );
  }

  sdk.off('view', onView);
  sdk.trackView(item);
  if (viewCount === 1) {
  } else {
    throw new Error(`Test 2b failed: Off listener still triggered. View=${viewCount}`);
  }

  fetchCount = 0;
  sdk.clearCache();

  await sdk.getCuratedPhotos(1, 5);
  await sdk.getCuratedPhotos(1, 5);

  if (fetchCount === 1) {
  } else {
    throw new Error(`Test 3 failed: Fetch count is ${fetchCount}, expected 1 (caching missed)`);
  }

  fetchCount = 0;
  sdk.clearCache();

  await Promise.all([
    sdk.searchPhotos('nature', 1, 10),
    sdk.searchPhotos('nature', 1, 10),
    sdk.searchPhotos('nature', 1, 10),
  ]);

  if (fetchCount === 1) {
  } else {
    throw new Error(
      `Test 4 failed: Fetch count is ${fetchCount}, expected 1 (de-duplication missed)`,
    );
  }
}

runTests().catch((err) => {
  console.error('Verification tests failed:', err);
  process.exit(1);
});
