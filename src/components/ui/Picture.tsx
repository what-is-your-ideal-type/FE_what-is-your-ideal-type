import React from "react";
import styled from "styled-components";

const Image = styled.img`
  width: 100%;
  height: auto;
  max-width: 512px;
  max-height: 512px;
  border-radius: 12px;
`;

interface PictureProps {
  imageUrl: string;
  altText: string;
}

const Picture = ({ imageUrl, altText }: PictureProps) => {
  return (
    <picture>
      <source
        srcSet={`${imageUrl}.webp 320w,
                  ${imageUrl}.webp 480w,
                  ${imageUrl}.webp 800w,
                  ${imageUrl}.webp 1024w`}
        sizes="(max-width: 320px) 280px, 
                (max-width: 480px) 440px, 
                (max-width: 600px) 500px, 
                (max-width: 800px) 760px, 
                1024px"
        type="image/webp"
      />
      <Image src={`${imageUrl}.jpg`} alt={altText} loading="lazy" />
    </picture>
  );
};

export default Picture;
