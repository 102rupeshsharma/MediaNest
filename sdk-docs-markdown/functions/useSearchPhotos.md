[**@fotoowl/media-react**](../README.md)

***

[@fotoowl/media-react](../globals.md) / useSearchPhotos

# Function: useSearchPhotos()

> **useSearchPhotos**(`query`, `page?`, `perPage?`): `UseQueryResult`\<`NormalizedResponse`\<[`MediaItem`](../interfaces/MediaItem.md)\>, `Error`\>

Defined in: [media-react/src/index.tsx:136](https://github.com/102rupeshsharma/MediaNest/blob/fa3ed149117b674b2958a0900a6f83c1ee86c661/packages/media-react/src/index.tsx#L136)

Hook to search for photos by query string using React Query.
The query is disabled if the query string is empty or only whitespace.

## Parameters

### query

`string`

The search query string.

### page?

`number` = `1`

The page number to fetch (defaults to 1).

### perPage?

`number` = `15`

The number of items to fetch per page (defaults to 15).

## Returns

`UseQueryResult`\<`NormalizedResponse`\<[`MediaItem`](../interfaces/MediaItem.md)\>, `Error`\>

A query result object containing search results of [MediaItem](../interfaces/MediaItem.md) elements.

## Example

```tsx
const { data, isLoading } = useSearchPhotos('nature', 1, 10);
```
