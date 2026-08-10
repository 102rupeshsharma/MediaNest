[**@fotoowl/media-react**](../README.md)

***

[@fotoowl/media-react](../globals.md) / MediaProviderProps

# Interface: MediaProviderProps

Defined in: [media-react/src/index.tsx:45](https://github.com/102rupeshsharma/MediaNest/blob/fa3ed149117b674b2958a0900a6f83c1ee86c661/packages/media-react/src/index.tsx#L45)

Props for the [MediaProvider](../variables/MediaProvider.md) component.

## Properties

### children

> **children**: `ReactNode`

Defined in: [media-react/src/index.tsx:51](https://github.com/102rupeshsharma/MediaNest/blob/fa3ed149117b674b2958a0900a6f83c1ee86c661/packages/media-react/src/index.tsx#L51)

The child components that need access to the SDK and React Query contexts.

***

### queryClient?

> `optional` **queryClient?**: `QueryClient`

Defined in: [media-react/src/index.tsx:49](https://github.com/102rupeshsharma/MediaNest/blob/fa3ed149117b674b2958a0900a6f83c1ee86c661/packages/media-react/src/index.tsx#L49)

Optional custom QueryClient for TanStack React Query. If not provided, a default client is used.

***

### sdk

> **sdk**: [`MediaCore`](../classes/MediaCore.md)

Defined in: [media-react/src/index.tsx:47](https://github.com/102rupeshsharma/MediaNest/blob/fa3ed149117b674b2958a0900a6f83c1ee86c661/packages/media-react/src/index.tsx#L47)

The instantiated [MediaCore](../classes/MediaCore.md) SDK instance.
