[**@fotoowl/media-react**](../README.md)

***

[@fotoowl/media-react](../globals.md) / MediaProvider

# Variable: MediaProvider

> `const` **MediaProvider**: `React.FC`\<[`MediaProviderProps`](../interfaces/MediaProviderProps.md)\>

Defined in: [media-react/src/index.tsx:77](https://github.com/102rupeshsharma/MediaNest/blob/fa3ed149117b674b2958a0900a6f83c1ee86c661/packages/media-react/src/index.tsx#L77)

Context provider that makes the [MediaCore](../classes/MediaCore.md) SDK instance and QueryClient
available to all child components. All React hooks in this library must be used
within this provider.

## Param

**props**

Component properties (see [MediaProviderProps](../interfaces/MediaProviderProps.md))

## Returns

A JSX element wrapping children with SDK and QueryClient contexts.

## Example

```tsx
import { createMediaSDK, MediaProvider } from '@fotoowl/media-react';

const sdk = createMediaSDK({ apiKey: 'YOUR_API_KEY' });

function App() {
  return (
    <MediaProvider sdk={sdk}>
      <MyComponent />
    </MediaProvider>
  );
}
```
