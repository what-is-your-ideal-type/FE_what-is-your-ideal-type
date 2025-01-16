import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardContentProps {
  imageUrl: string;
  altText: string;
  isImageLoaded: boolean;
  onLoad: () => void;
  className?: string;
}

export const CardContent = ({
  imageUrl,
  altText,
  isImageLoaded,
  onLoad,
  className,
}: CardContentProps) => {
  const contentClasses = twMerge(
    clsx('relative w-full pt-[100%] mb-3', className),
  );

  return (
    <div className={contentClasses}>
      {!isImageLoaded && (
        <div className='absolute top-0 left-0 w-full h-full bg-white rounded-lg' />
      )}
      <img
        src={imageUrl}
        alt={altText}
        className={clsx(
          'absolute top-0 left-0 w-full h-full object-cover rounded-lg',
          isImageLoaded ? 'block' : 'hidden',
        )}
        onLoad={onLoad}
      />
    </div>
  );
};
