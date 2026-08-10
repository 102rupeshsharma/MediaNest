import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import {
  MediaProvider,
  useMediaSDK,
  useCuratedPhotos,
  useSearchPhotos,
  useSearchVideos,
  createMediaSDK,
  MediaItem,
} from '@fotoowl/media-react';
import { useMediaGrid, useLightbox, usePagination } from '@fotoowl/media-ui-react';

const sdk = createMediaSDK({ apiKey: (import.meta as any).env.VITE_PEXELS_API_KEY });

function AppContent() {
  return (
    <div className="app-shell">
      <header>
        <h1>MediaNest</h1>
        <nav className="nav-links">
          <Link to="/"> Photos </Link>
          <Link to="/videos">Videos (Reels)</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<PhotosTab />} />
          <Route path="/videos" element={<VideosTab />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  if (!(import.meta as any).env.VITE_PEXELS_API_KEY) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#f87171' }}>
        <h2>Missing PEXELS API KEY</h2>
        <p>Refresh the page to get API Key gets loaded</p>
      </div>
    );
  }

  return (
    <MediaProvider sdk={sdk}>
      <AppContent />
    </MediaProvider>
  );
}

function PhotosTab() {
  const [query, setQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<MediaItem[]>([]);
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    setPage(1);
    setItems([]);
  }, [searchQuery]);

  const isSearch = searchQuery.trim().length > 0;
  const curatedResult = useCuratedPhotos(page, 12);
  const searchResult = useSearchPhotos(searchQuery, page, 15);
  const activeResult = isSearch ? searchResult : curatedResult;
  const { data, isLoading, isError, refetch } = activeResult;

  useEffect(() => {
    if (data?.items) {
      setItems(data.items);
    }
  }, [data]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(query);
  };

  const grid = useMediaGrid({ itemsCount: items.length });
  const pagination = usePagination({
    page,
    hasNextPage: !!data?.hasNextPage,
    onPageChange: (newPage) => {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  });

  return (
    <>
      <div className="search-container">
        <form className="search-form" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search stunning photos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      {isError && (
        <div className="grid-container">
          <div className="error-container">
            <h3>Failed to load photos</h3>
            <p>Please check your internet connection or API Key authorization.</p>
            <button onClick={() => refetch()}>Retry</button>
          </div>
        </div>
      )}

      <div {...grid.getContainerProps()} className="grid-container">
        {items.map((item, idx) => (
          <div
            key={item.id}
            {...grid.getItemProps(idx, {
              onClick: () => setActiveLightboxIndex(idx),
            })}
            className="grid-item"
          >
            <img src={item.previewUrl} alt={item.title} loading="lazy" />
            <div className="grid-item-info">
              <h3>{item.title}</h3>
              <p>by {item.photographer}</p>
            </div>
          </div>
        ))}

        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => (
            <div key={`skeleton-${i}`} className="skeleton" />
          ))}
      </div>

      {!isLoading && items.length > 0 && (
        <div className="pagination-container">
          <button className="pagination-btn" {...pagination.getPrevButtonProps()}>
            &larr; Prev
          </button>
          <span className="pagination-info">Page {page}</span>
          <button className="pagination-btn" {...pagination.getNextButtonProps()}>
            Next &rarr;
          </button>
        </div>
      )}

      {activeLightboxIndex !== null && (
        <LightboxModal
          items={items}
          activeIndex={activeLightboxIndex}
          setActiveIndex={setActiveLightboxIndex}
        />
      )}
    </>
  );
}

interface LightboxModalProps {
  items: MediaItem[];
  activeIndex: number;
  setActiveIndex: (idx: number | null) => void;
}

function LightboxModal({ items, activeIndex, setActiveIndex }: LightboxModalProps) {
  const activeItem = items[activeIndex];
  const mediaSDK = useMediaSDK();

  useEffect(() => {
    if (activeItem) {
      mediaSDK.trackView(activeItem);
    }
  }, [activeItem, mediaSDK]);

  const lightbox = useLightbox({
    isOpen: true,
    onClose: () => setActiveIndex(null),
    onPrev: activeIndex > 0 ? () => setActiveIndex(activeIndex - 1) : undefined,
    onNext: activeIndex < items.length - 1 ? () => setActiveIndex(activeIndex + 1) : undefined,
  });

  const handleDownload = () => {
    if (!activeItem) return;
    mediaSDK.trackDownload(activeItem);
    window.open(activeItem.url, '_blank');
  };

  if (!activeItem) return null;

  return (
    <div {...lightbox.getOverlayProps()} className="lightbox-overlay">
      <div {...lightbox.getContentProps()} className="lightbox-content">
        <button {...lightbox.getCloseButtonProps()} className="lightbox-close">
          &times;
        </button>

        <button
          {...lightbox.getPrevButtonProps()}
          className="lightbox-nav-btn prev"
          aria-label="Previous"
        >
          &#8249;
        </button>

        <div className="lightbox-img-container">
          <img src={activeItem.url} alt={activeItem.title} />
        </div>

        <button
          {...lightbox.getNextButtonProps()}
          className="lightbox-nav-btn next"
          aria-label="Next"
        >
          &#8250;
        </button>

        <div className="lightbox-details">
          <div>
            <h3>{activeItem.title}</h3>
            <p>by {activeItem.photographer}</p>
          </div>
          <button className="download-btn" onClick={handleDownload}>
            Download Original
          </button>
        </div>
      </div>
    </div>
  );
}

function VideosTab() {
  const [query, setQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('nature');
  const [page, setPage] = useState(1);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchQuery(query.trim());
      setPage(1);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  const { data, isLoading, isError, refetch } = useSearchVideos(searchQuery, page, 12);
  const items = data?.items || [];

  const pagination = usePagination({
    page,
    hasNextPage: !!data?.hasNextPage,
    onPageChange: (newPage) => {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  });

  return (
    <>
      <div className="search-container">
        <form className="search-form" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search amazing videos (e.g. nature, ocean)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      {isError && (
        <div className="video-grid-container">
          <div className="error-container">
            <h3>Failed to load videos</h3>
            <p>Please check your internet connection or API Key authorization.</p>
            <button
              onClick={() => refetch()}
              style={{
                background: '#3b82f6',
                border: 'none',
                color: '#fff',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
              }}
            >
              Retry
            </button>
          </div>
        </div>
      )}

      <div className="video-grid-container">
        {items.map((item: MediaItem) => (
          <VideoCard key={item.id} item={item} />
        ))}

        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => (
            <div key={`skeleton-${i}`} className="skeleton" style={{ aspectRatio: '16/9' }} />
          ))}
      </div>

      {!isLoading && items.length > 0 && (
        <div className="pagination-container">
          <button className="pagination-btn" {...pagination.getPrevButtonProps()}>
            &larr; Prev
          </button>
          <span className="pagination-info">Page {page}</span>
          <button className="pagination-btn" {...pagination.getNextButtonProps()}>
            Next &rarr;
          </button>
        </div>
      )}
    </>
  );
}

interface VideoCardProps {
  item: MediaItem;
}

function VideoCard({ item }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaSDK = useMediaSDK();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    mediaSDK.trackView(item);
  }, [item, mediaSDK]);

  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    mediaSDK.trackDownload(item);
    window.open(item.url, '_blank');
  };

  return (
    <div className="video-card">
      <video
        ref={videoRef}
        src={item.url}
        loop
        muted
        playsInline
        onClick={handleTogglePlay}
        poster={item.previewUrl}
      />

      <button
        className={`reel-control-btn ${isPlaying ? 'playing' : ''}`}
        onClick={handleTogglePlay}
        aria-label={isPlaying ? 'Pause video' : 'Play video'}
      >
        {isPlaying ? (
          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      {/* Card Info Overlay */}
      <div className={`grid-item-info ${isPlaying ? 'playing' : ''}`}>
        <h3>{item.title || `Video by ${item.photographer}`}</h3>
        <p>by {item.photographer}</p>
        <button
          onClick={handleDownload}
          style={{
            background: 'rgba(45, 196, 222, 0.99)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#fff',
            padding: '0.25rem 0.5rem',
            borderRadius: '6px',
            fontSize: '0.75rem',
            cursor: 'pointer',
            marginTop: '0.5rem',
            transition: 'all 0.2s',
          }}
        >
          Download
        </button>
      </div>
    </div>
  );
}
