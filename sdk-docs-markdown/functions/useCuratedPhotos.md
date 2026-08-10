[**@fotoowl/media-react**](../README.md)

***

[@fotoowl/media-react](../globals.md) / useCuratedPhotos

# Function: useCuratedPhotos()

> **useCuratedPhotos**(`page?`, `perPage?`): `UseQueryResult`\<`NormalizedResponse`\<[`MediaItem`](../interfaces/MediaItem.md)\>, `Error`\>

Defined in: [media-react/src/index.tsx:111](https://github.com/102rupeshsharma/MediaNest/blob/fa3ed149117b674b2958a0900a6f83c1ee86c661/packages/media-react/src/index.tsx#L111)

Hook to fetch a paginated list of curated photos using React Query.

## Parameters

### page?

`number` = `1`

The page number to fetch (defaults to 1).

### perPage?

`number` = `15`

The number of items to fetch per page (defaults to 15).

## Returns

`UseQueryResult`\<`NormalizedResponse`\<[`MediaItem`](../interfaces/MediaItem.md)\>, `Error`\>

A query result object containing the list of curated [MediaItem](../interfaces/MediaItem.md) elements, loading state, and error.

## Example

```tsx
const { data, isLoading, error } = useCuratedPhotos(1, 10);

if (isLoading) return <div>Loading...</div>;
if (error) return <div>Error: {error.message}</div>;
return (
  <div>
    {data?.items.map(photo => (
      <img key={photo.id} src={photo.url} alt={photo.title} />
    ))}
  </div>
);
```
