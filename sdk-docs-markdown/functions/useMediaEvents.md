[**@fotoowl/media-react**](../README.md)

***

[@fotoowl/media-react](../globals.md) / useMediaEvents

# Function: useMediaEvents()

> **useMediaEvents**(`callbacks?`): `void`

Defined in: [media-react/src/index.tsx:202](https://github.com/102rupeshsharma/MediaNest/blob/fa3ed149117b674b2958a0900a6f83c1ee86c661/packages/media-react/src/index.tsx#L202)

Hook to subscribe to SDK-level media events such as 'view' and 'download'.
Handles clean subscription and unsubscription on mount/unmount and when dependencies change.

## Parameters

### callbacks?

[`UseMediaEventsCallbacks`](../interfaces/UseMediaEventsCallbacks.md) = `{}`

The callbacks to execute when events are triggered. See [UseMediaEventsCallbacks](../interfaces/UseMediaEventsCallbacks.md).

## Returns

`void`

## Example

```tsx
useMediaEvents({
  onView: (item) => console.log('Item viewed:', item.id),
  onDownload: (item) => console.log('Item downloaded:', item.id),
});
```
