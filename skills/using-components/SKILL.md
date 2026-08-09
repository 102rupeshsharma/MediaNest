---
name: 'fotoowl-using-components'
description: 'Rules and design guides for consuming headless UI elements (grids, lightboxes, reels) from @fotoowl/media-ui-react.'
---

# Using Headless Components in React

This guide outlines rules for AI coding assistants to leverage headless hooks from `@fotoowl/media-ui-react` to implement grid pagination, keyboard-accessible modals, and vertical swiper snap panels.

## 1. Grid (useMediaGrid)

Manages gridcell accessibility and intersection observers for infinite loading:

```tsx
import { useMediaGrid } from '@fotoowl/media-ui-react';

const { getContainerProps, getItemProps, loadMoreRef } = useMediaGrid({
  itemsCount: items.length,
  onLoadMore: () => setPage((p) => p + 1),
  hasMore: data?.hasNextPage,
});

return (
  <div {...getContainerProps()} className="my-grid-css">
    {items.map((item, idx) => (
      <div {...getItemProps(idx, { onClick: () => openLightbox(idx) })} className="my-item-css">
        <img src={item.previewUrl} />
      </div>
    ))}
    {hasMore && <div ref={loadMoreRef}>Loading more...</div>}
  </div>
);
```

## 2. Lightbox (useLightbox)

Provides overlay clicks, modal focus trapping, Escape closures, and arrow keys navigations:

```tsx
import { useLightbox } from '@fotoowl/media-ui-react';

const {
  getOverlayProps,
  getContentProps,
  getCloseButtonProps,
  getPrevButtonProps,
  getNextButtonProps,
} = useLightbox({
  isOpen: true,
  onClose: () => setIsOpen(false),
  onPrev: activeIndex > 0 ? () => setActiveIndex(activeIndex - 1) : undefined,
  onNext: activeIndex < items.length - 1 ? () => setActiveIndex(activeIndex + 1) : undefined,
});

return (
  <div {...getOverlayProps()} className="lightbox-overlay">
    <div {...getContentProps()} className="lightbox-dialog">
      <button {...getCloseButtonProps()}>Close</button>
      <button {...getPrevButtonProps()}>Prev</button>
      <img src={activeItem.url} />
      <button {...getNextButtonProps()}>Next</button>
    </div>
  </div>
);
```

## 3. Reels Swiper (useReelSwiper)

Vertical scroll snap alignment and active card detection:

```tsx
import { useReelSwiper } from '@fotoowl/media-ui-react';

const { activeIndex, getContainerProps, getItemProps } = useReelSwiper({
  itemsCount: items.length,
});

return (
  <div {...getContainerProps()} className="reels-snap-container">
    {items.map((item, idx) => (
      <div {...getItemProps(idx)} className="reel-panel">
        <video src={item.url} muted={activeIndex !== idx} autoPlay={activeIndex === idx} />
      </div>
    ))}
  </div>
);
```

## 4. Pagination (usePagination)

Provides prop-getters for headless pagination controls:

```tsx
import { usePagination } from '@fotoowl/media-ui-react';

const { getPrevButtonProps, getNextButtonProps } = usePagination({
  page,
  hasNextPage: !!data?.hasNextPage,
  onPageChange: (newPage) => setPage(newPage),
});

return (
  <div>
    <button {...getPrevButtonProps()}>Prev</button>
    <span>Page {page}</span>
    <button {...getNextButtonProps()}>Next</button>
  </div>
);
```
