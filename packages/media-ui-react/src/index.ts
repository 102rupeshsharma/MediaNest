import React, { useRef, useEffect, useCallback, useState } from 'react';

export interface UseMediaGridOptions {
  itemsCount: number;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

export function useMediaGrid({ itemsCount, onLoadMore, hasMore = false }: UseMediaGridOptions) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const loadMoreRef = useCallback(
    (node: HTMLElement | null) => {
      if (!onLoadMore || !hasMore) return;

      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          onLoadMore();
        }
      });

      if (node) {
        observerRef.current.observe(node);
      }
    },
    [onLoadMore, hasMore],
  );

  const getContainerProps = () => ({
    role: 'grid',
    'aria-rowcount': itemsCount,
  });

  const getItemProps = (index: number, options?: { onClick?: () => void }) => ({
    role: 'gridcell',
    tabIndex: 0,
    'data-index': index,
    onClick: (e: React.MouseEvent) => {
      e.stopPropagation();
      if (options?.onClick) options.onClick();
    },
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        if (options?.onClick) options.onClick();
      }
    },
  });

  const getLoadMoreProps = () => ({
    role: 'button',
    tabIndex: 0,
    disabled: !hasMore,
    onClick: () => {
      if (onLoadMore && hasMore) onLoadMore();
    },
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (onLoadMore && hasMore) onLoadMore();
      }
    },
  });

  return {
    getContainerProps,
    getItemProps,
    getLoadMoreProps,
    loadMoreRef,
  };
}

export interface UseLightboxOptions {
  isOpen: boolean;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export function useLightbox({ isOpen, onClose, onPrev, onNext }: UseLightboxOptions) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedRef.current = document.activeElement as HTMLElement;

    if (contentRef.current) {
      contentRef.current.focus();
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'ArrowLeft' && onPrev) {
        onPrev();
        return;
      }

      if (e.key === 'ArrowRight' && onNext) {
        onNext();
        return;
      }

      if (e.key === 'Tab' && contentRef.current) {
        const focusableElements = contentRef.current.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        );

        if (focusableElements.length === 0) {
          e.preventDefault();
          return;
        }

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (
            document.activeElement === firstElement ||
            document.activeElement === contentRef.current
          ) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      if (previouslyFocusedRef.current) {
        previouslyFocusedRef.current.focus();
      }
    };
  }, [isOpen, onClose, onPrev, onNext]);

  const getOverlayProps = () => ({
    onClick: (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
  });

  const getContentProps = () => ({
    ref: contentRef,
    role: 'dialog',
    'aria-modal': 'true' as const,
    tabIndex: -1,
  });

  const getCloseButtonProps = () => ({
    role: 'button',
    'aria-label': 'Close modal',
    onClick: () => onClose(),
  });

  const getPrevButtonProps = () => ({
    role: 'button',
    'aria-label': 'Previous item',
    disabled: !onPrev,
    onClick: () => {
      if (onPrev) onPrev();
    },
  });

  const getNextButtonProps = () => ({
    role: 'button',
    'aria-label': 'Next item',
    disabled: !onNext,
    onClick: () => {
      if (onNext) onNext();
    },
  });

  return {
    getOverlayProps,
    getContentProps,
    getCloseButtonProps,
    getPrevButtonProps,
    getNextButtonProps,
    contentRef,
  };
}

export interface UseReelSwiperOptions {
  itemsCount: number;
  onActiveIndexChange?: (index: number) => void;
}

export function useReelSwiper({ itemsCount, onActiveIndexChange }: UseReelSwiperOptions) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const { scrollTop, clientHeight } = container;

    if (clientHeight === 0) return;

    const index = Math.round(scrollTop / clientHeight);

    if (index >= 0 && index < itemsCount && index !== activeIndex) {
      setActiveIndex(index);
      if (onActiveIndexChange) {
        onActiveIndexChange(index);
      }
    }
  };

  const getContainerProps = () => ({
    ref: containerRef,
    onScroll: handleScroll,
    style: {
      overflowY: 'scroll' as const,
      scrollSnapType: 'y mandatory' as const,
      height: '100%',
      width: '100%',
    },
  });

  const getItemProps = (index: number) => ({
    key: index,
    style: {
      scrollSnapAlign: 'start' as const,
      scrollSnapStop: 'always' as const,
      height: '100%',
      width: '100%',
    },
  });

  return {
    activeIndex,
    getContainerProps,
    getItemProps,
    containerRef,
  };
}

// ==========================================
// 4. PAGINATION HOOK (usePagination)
// ==========================================

export interface UsePaginationOptions {
  page: number;
  hasNextPage: boolean;
  onPageChange: (newPage: number) => void;
}

export function usePagination({ page, hasNextPage, onPageChange }: UsePaginationOptions) {
  const getPrevButtonProps = () => ({
    role: 'button',
    disabled: page === 1,
    onClick: () => {
      if (page > 1) {
        onPageChange(page - 1);
      }
    },
  });

  const getNextButtonProps = () => ({
    role: 'button',
    disabled: !hasNextPage,
    onClick: () => {
      if (hasNextPage) {
        onPageChange(page + 1);
      }
    },
  });

  return {
    getPrevButtonProps,
    getNextButtonProps,
  };
}
