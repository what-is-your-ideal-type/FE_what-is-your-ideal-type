import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface PictureProps {
  imageUrl: string;
  altText: string;
  className?: string;
}

const Picture = ({ imageUrl, altText, className }: PictureProps) => {
  const classes = twMerge(
    clsx('w-full h-auto max-w-lg max-h-lg rounded-xl'),
    className,
  );

  return (
    <picture>
      <source
        srcSet={`${imageUrl}.webp 320w,
                  ${imageUrl}.webp 480w,
                  ${imageUrl}.webp 800w,
                  ${imageUrl}.webp 1024w`}
        sizes='(max-width: 320px) 280px, 
                (max-width: 480px) 440px, 
                (max-width: 600px) 500px, 
                (max-width: 800px) 760px, 
                1024px'
        type='image/webp'
      />
      <img
        className={classes}
        src={`${imageUrl}.jpg`}
        alt={altText}
        loading='lazy'
      />
    </picture>
  );
};

export default Picture;
