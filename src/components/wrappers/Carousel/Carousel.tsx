'use client'

import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { type ReactNode, useCallback, useEffect, useState } from 'react'
import { type BoxProps, HStack, engine } from 'styled-system/jsx'

import { NextButton, PrevButton } from './CarouselNavButtons'

interface Props extends BoxProps {
  children: ReactNode
  options?: EmblaOptionsType
  withScrollSnaps?: boolean
  withNavButtons?: boolean
}

export const Carousel = ({
  children,
  options,
  withScrollSnaps,
  withNavButtons,
  ...rest
}: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  )

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList())
  }, [])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi.on('reInit', onInit)
    emblaApi.on('reInit', onSelect)
    emblaApi.on('select', onSelect)
  }, [emblaApi, onInit, onSelect])

  return (
    <engine.div
      ref={emblaRef}
      width='full'
      position='relative'
      overflowX='hidden'
      {...rest}
    >
      <engine.div display='flex' height='full'>
        {children}
      </engine.div>

      {withNavButtons && (
        <HStack
          position='absolute'
          paddingX={4}
          top='50%'
          width='full'
          justify='space-between'
        >
          <PrevButton onClick={scrollPrev} disabled={prevBtnDisabled} />
          <NextButton onClick={scrollNext} disabled={nextBtnDisabled} />
        </HStack>
      )}

      {withScrollSnaps && (
        <HStack justify='center' py={4}>
          {scrollSnaps.map((_, index) => (
            <engine.button
              key={`dot-${index + 1}`}
              onClick={() => scrollTo(index)}
              cursor='pointer'
              paddingX={index === selectedIndex ? 4 : 1}
              paddingY={1}
              borderRadius='full'
              backgroundColor={
                index === selectedIndex ? 'primary' : 'disabled-background'
              }
              transition='all 300ms ease-in-out'
            />
          ))}
        </HStack>
      )}
    </engine.div>
  )
}
