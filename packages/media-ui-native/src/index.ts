export const UI_NATIVE_VERSION = '1.0.0';

export interface UseNativeGridOptions {
  itemsCount: number;
}

export function useNativeGrid({ itemsCount: _itemsCount }: UseNativeGridOptions) {
  return {
    getContainerProps: () => ({
      testID: 'media-native-grid-container',
    }),
    getItemProps: (index: number) => ({
      key: index,
      testID: `media-native-grid-item-${index}`,
    }),
  };
}
