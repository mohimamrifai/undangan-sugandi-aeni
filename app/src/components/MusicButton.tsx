'use client';

type Props = {
  isPlaying: boolean;
  onToggle: () => void;
};

export default function MusicButton({ isPlaying, onToggle }: Props) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isPlaying ? 'Jeda musik' : 'Putar musik'}
      aria-pressed={isPlaying}
      className="fixed bottom-4 right-4 z-40 grid h-12 w-12 place-items-center rounded-full border border-gold/70 bg-[rgba(6,16,46,0.82)] text-gold-soft backdrop-blur-md"
    >
      {isPlaying ? (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
          <path d="M4 9v6h4l5 4V5L8 9H4zm12.5 3a4.5 4.5 0 0 0-2-3.7v7.4a4.5 4.5 0 0 0 2-3.7z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
          <path d="M4 9v6h4l5 4V5L8 9H4zm14.6 3l2.4-2.4-1.4-1.4L17.2 10l-2.4-2.4-1.4 1.4L15.8 12l-2.4 2.4 1.4 1.4 2.4-2.4 2.4 2.4 1.4-1.4z" />
        </svg>
      )}
    </button>
  );
}
