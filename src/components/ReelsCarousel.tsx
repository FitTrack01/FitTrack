"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getSafeReels } from '@/lib/actions';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from '@/components/ui/skeleton';
import { Instagram } from 'lucide-react';

export function ReelsCarousel({ reelUrls }: { reelUrls: string[] }) {
  const [safeReels, setSafeReels] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchReels() {
      setIsLoading(true);
      const filteredReels = await getSafeReels(reelUrls);
      setSafeReels(filteredReels);
      setIsLoading(false);
    }
    fetchReels();
  }, [reelUrls]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold">Visual Guides</h3>
        <div className="relative -mx-4 px-4">
            <div className="flex gap-4 overflow-x-auto pb-4">
                <Skeleton className="h-64 w-40 rounded-lg shrink-0" />
                <Skeleton className="h-64 w-40 rounded-lg shrink-0" />
                <Skeleton className="h-64 w-40 rounded-lg shrink-0" />
            </div>
        </div>
      </div>
    );
  }

  if (safeReels.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4">Visual Guides</h3>
      <Carousel opts={{ align: "start", dragFree: true }} className="w-full">
        <CarouselContent className="-ml-2">
          {safeReels.map((url, index) => (
            <CarouselItem key={index} className="pl-2 basis-2/5 md:basis-1/3 lg:basis-1/4">
              <div className="p-1">
                <Link href={url} target="_blank" rel="noopener noreferrer" aria-label={`Watch Instagram reel ${index + 1}`}>
                  <Card className="overflow-hidden group border-2 border-transparent hover:border-primary transition-all duration-300">
                    <CardContent className="flex aspect-[9/16] items-center justify-center p-0 relative">
                       <Image src={`https://picsum.photos/seed/reel${index+1}/270/480`} alt={`Instagram reel for exercise`} fill sizes="(max-width: 768px) 40vw, 33vw" style={{ objectFit: 'cover' }} className="transition-transform duration-300 group-hover:scale-105" data-ai-hint="fitness reel" />
                       <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                         <Instagram className="h-10 w-10 text-white" />
                       </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  );
}
