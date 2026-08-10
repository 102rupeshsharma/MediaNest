[**@fotoowl/media-react**](../README.md)

***

[@fotoowl/media-react](../globals.md) / MediaCore

# Class: MediaCore

Defined in: media-core/dist/index.d.ts:5

## Constructors

### Constructor

> **new MediaCore**(`options?`): `MediaCore`

Defined in: media-core/dist/index.d.ts:9

#### Parameters

##### options?

`SDKOptions`

#### Returns

`MediaCore`

## Methods

### clearCache()

> **clearCache**(): `void`

Defined in: media-core/dist/index.d.ts:23

#### Returns

`void`

***

### emit()

> **emit**(`event`, `payload`): `void`

Defined in: media-core/dist/index.d.ts:22

#### Parameters

##### event

`string`

##### payload

`unknown`

#### Returns

`void`

***

### getApiKey()

> **getApiKey**(): `string`

Defined in: media-core/dist/index.d.ts:11

#### Returns

`string`

***

### getCuratedPhotos()

> **getCuratedPhotos**(`page?`, `perPage?`): `Promise`\<`NormalizedResponse`\<[`MediaItem`](../interfaces/MediaItem.md)\>\>

Defined in: media-core/dist/index.d.ts:16

#### Parameters

##### page?

`number`

##### perPage?

`number`

#### Returns

`Promise`\<`NormalizedResponse`\<[`MediaItem`](../interfaces/MediaItem.md)\>\>

***

### getPhotoById()

> **getPhotoById**(`id`): `Promise`\<[`MediaItem`](../interfaces/MediaItem.md)\>

Defined in: media-core/dist/index.d.ts:17

#### Parameters

##### id

`string` \| `number`

#### Returns

`Promise`\<[`MediaItem`](../interfaces/MediaItem.md)\>

***

### getPopularVideos()

> **getPopularVideos**(`page?`, `perPage?`): `Promise`\<`NormalizedResponse`\<[`MediaItem`](../interfaces/MediaItem.md)\>\>

Defined in: media-core/dist/index.d.ts:14

#### Parameters

##### page?

`number`

##### perPage?

`number`

#### Returns

`Promise`\<`NormalizedResponse`\<[`MediaItem`](../interfaces/MediaItem.md)\>\>

***

### getVideoById()

> **getVideoById**(`id`): `Promise`\<[`MediaItem`](../interfaces/MediaItem.md)\>

Defined in: media-core/dist/index.d.ts:15

#### Parameters

##### id

`string` \| `number`

#### Returns

`Promise`\<[`MediaItem`](../interfaces/MediaItem.md)\>

***

### init()

> **init**(`apiKey`): `void`

Defined in: media-core/dist/index.d.ts:10

#### Parameters

##### apiKey

`string`

#### Returns

`void`

***

### off()

> **off**(`event`, `listener`): `void`

Defined in: media-core/dist/index.d.ts:21

#### Parameters

##### event

`"view"` \| `"download"`

##### listener

`Listener`\<[`MediaItem`](../interfaces/MediaItem.md)\>

#### Returns

`void`

***

### on()

> **on**(`event`, `listener`): `void`

Defined in: media-core/dist/index.d.ts:20

#### Parameters

##### event

`"view"` \| `"download"`

##### listener

`Listener`\<[`MediaItem`](../interfaces/MediaItem.md)\>

#### Returns

`void`

***

### searchPhotos()

> **searchPhotos**(`query`, `page?`, `perPage?`): `Promise`\<`NormalizedResponse`\<[`MediaItem`](../interfaces/MediaItem.md)\>\>

Defined in: media-core/dist/index.d.ts:12

#### Parameters

##### query

`string`

##### page?

`number`

##### perPage?

`number`

#### Returns

`Promise`\<`NormalizedResponse`\<[`MediaItem`](../interfaces/MediaItem.md)\>\>

***

### searchVideos()

> **searchVideos**(`query`, `page?`, `perPage?`): `Promise`\<`NormalizedResponse`\<[`MediaItem`](../interfaces/MediaItem.md)\>\>

Defined in: media-core/dist/index.d.ts:13

#### Parameters

##### query

`string`

##### page?

`number`

##### perPage?

`number`

#### Returns

`Promise`\<`NormalizedResponse`\<[`MediaItem`](../interfaces/MediaItem.md)\>\>

***

### trackDownload()

> **trackDownload**(`item`): `void`

Defined in: media-core/dist/index.d.ts:19

#### Parameters

##### item

[`MediaItem`](../interfaces/MediaItem.md)

#### Returns

`void`

***

### trackView()

> **trackView**(`item`): `void`

Defined in: media-core/dist/index.d.ts:18

#### Parameters

##### item

[`MediaItem`](../interfaces/MediaItem.md)

#### Returns

`void`
