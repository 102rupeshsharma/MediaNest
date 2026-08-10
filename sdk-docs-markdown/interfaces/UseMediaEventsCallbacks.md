[**@fotoowl/media-react**](../README.md)

***

[@fotoowl/media-react](../globals.md) / UseMediaEventsCallbacks

# Interface: UseMediaEventsCallbacks

Defined in: [media-react/src/index.tsx:181](https://github.com/102rupeshsharma/MediaNest/blob/fa3ed149117b674b2958a0900a6f83c1ee86c661/packages/media-react/src/index.tsx#L181)

Callback options for the [useMediaEvents](../functions/useMediaEvents.md) hook.

## Properties

### onDownload?

> `optional` **onDownload?**: (`item`) => `void`

Defined in: [media-react/src/index.tsx:185](https://github.com/102rupeshsharma/MediaNest/blob/fa3ed149117b674b2958a0900a6f83c1ee86c661/packages/media-react/src/index.tsx#L185)

Callback triggered when a media item is downloaded.

#### Parameters

##### item

[`MediaItem`](MediaItem.md)

#### Returns

`void`

***

### onView?

> `optional` **onView?**: (`item`) => `void`

Defined in: [media-react/src/index.tsx:183](https://github.com/102rupeshsharma/MediaNest/blob/fa3ed149117b674b2958a0900a6f83c1ee86c661/packages/media-react/src/index.tsx#L183)

Callback triggered when a media item is viewed.

#### Parameters

##### item

[`MediaItem`](MediaItem.md)

#### Returns

`void`
