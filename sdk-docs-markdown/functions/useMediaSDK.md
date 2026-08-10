[**@fotoowl/media-react**](../README.md)

***

[@fotoowl/media-react](../globals.md) / useMediaSDK

# Function: useMediaSDK()

> **useMediaSDK**(): [`MediaCore`](../classes/MediaCore.md)

Defined in: [media-react/src/index.tsx:24](https://github.com/102rupeshsharma/MediaNest/blob/fa3ed149117b674b2958a0900a6f83c1ee86c661/packages/media-react/src/index.tsx#L24)

Hook to access the active [MediaCore](../classes/MediaCore.md) SDK instance from the context.
Must be used within a [MediaProvider](../variables/MediaProvider.md).

## Returns

[`MediaCore`](../classes/MediaCore.md)

The active [MediaCore](../classes/MediaCore.md) instance.

## Throws

If called outside of a [MediaProvider](../variables/MediaProvider.md) context.

## Example

```tsx
const sdk = useMediaSDK();
// Use sdk to interact with media services directly
```
