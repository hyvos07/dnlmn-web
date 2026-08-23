"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useRef, useState } from "react";

type ProfileImageCarouselProps = {
  images: string[];
  alt?: string;
};

export default function ProfileImageCarousel({
  images,
  alt = "Profile picture",
}: ProfileImageCarouselProps) {
  const autoplay = useRef(
    Autoplay({ delay: 7000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: "start", loop: false },
    [autoplay.current]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const updateSelectedIndex = useCallback(() => {
    if (emblaApi) {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    }
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    updateSelectedIndex();
    emblaApi.on("select", updateSelectedIndex);
    emblaApi.on("reInit", updateSelectedIndex);
    return () => {
      emblaApi.off("select", updateSelectedIndex);
      emblaApi.off("reInit", updateSelectedIndex);
    };
  }, [emblaApi, updateSelectedIndex]);

  if (images.length === 0) return null;

  return (
    // IMPORTANT: no `h-full` here. Leaving height as `auto` lets this flex
    // item participate correctly in the parent's `lg:items-stretch`, and
    // lets its stretched height count as "definite" for descendants below.
    // `min-h` is just a defensive floor in case this is ever used outside
    // a stretching flex parent.
    <div className="relative w-80 lg:w-[360px] max-lg:hidden min-h-[320px] overflow-hidden rounded-xl">
      <div ref={emblaRef} className="absolute inset-0 overflow-hidden">
        <div className="flex h-full touch-pan-y">
          {images.map((image, index) => (
            <div className="relative h-full min-w-0 flex-[0_0_100%]" key={image}>
              <Image
                src={image}
                alt={images.length > 1 ? `${alt} ${index + 1}` : alt}
                fill
                sizes="(max-width: 1024px) 320px, 360px"
                className="object-cover object-center"
                draggable={false}
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {selectedIndex > 0 && (
        <button
          type="button"
          aria-label="Previous profile image"
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/45 p-1.5 text-white transition-colors hover:bg-black/65"
          onClick={() => emblaApi?.scrollPrev()}
        >
          <ChevronLeft aria-hidden="true" size={20} />
        </button>
      )}

      {selectedIndex < images.length - 1 && (
        <button
          type="button"
          aria-label="Next profile image"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/45 p-1.5 text-white transition-colors hover:bg-black/65"
          onClick={() => emblaApi?.scrollNext()}
        >
          <ChevronRight aria-hidden="true" size={20} />
        </button>
      )}

      {/* Bottom scrim, Instagram/TikTok-style, so dots read on any photo */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/70 to-transparent" />

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
        {images.map((image, index) => {
          const isActive = selectedIndex === index;
          return (
            <button
              type="button"
              key={image}
              aria-label={`Go to profile image ${index + 1}`}
              aria-current={isActive ? "true" : undefined}
              className={`h-2 rounded-full bg-white shadow-sm transition-all ${
                isActive ? "w-5 opacity-100" : "w-2 opacity-70 hover:opacity-100"
              }`}
              onClick={() => emblaApi?.scrollTo(index)}
            />
          );
        })}
      </div>
    </div>
  );
}