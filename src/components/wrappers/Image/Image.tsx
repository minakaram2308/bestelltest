import NextImage, { type ImageProps } from 'next/image';
import { useState } from 'react';

interface Props extends ImageProps {
  src: string | null | undefined;
  alt: string;
  width?: number;
  height?: number;
}

export const Image = ({ src, alt, width, height, ...rest }: Props) => {
  const [error, setError] = useState(false);

  const onError = () => {
    setError(true);
  };

  if (!src || error) {
    return (
      <NextImage
        src='https://placehold.co/400'
        alt={alt}
        width={width}
        height={height}
        {...rest}
      />
    );
  }

  return (
    <NextImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      onError={onError}
      {...rest}
    />
  );
};
