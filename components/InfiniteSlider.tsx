'use client'
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'

const images = [
  { imageURL: "/custom-furniture/furniture1.png", width: 185, height: 323 },
  { imageURL: "/custom-furniture/furniture2.png", width: 274, height: 382 },
  { imageURL: "/custom-furniture/furniture3.png", width: 451, height: 312 },
  { imageURL: "/custom-furniture/furniture4.png", width: 344, height: 242 },
  { imageURL: "/custom-furniture/furniture5.png", width: 295, height: 392 },
  { imageURL: "/custom-furniture/furniture6.png", width: 290, height: 348 },
  { imageURL: "/custom-furniture/furniture7.png", width: 178, height: 242 },
  { imageURL: "/custom-furniture/furniture8.png", width: 425, height: 433 },
  { imageURL: "/custom-furniture/furniture9.png", width: 258, height: 196 }
]

const sliderGroups = [
  [
    [
      { idx: 1, alt: 'image1' },
      { idx: 2, alt: 'image2' }
    ],
    [
      { idx: 0, alt: 'image3' },
      { idx: 3, alt: 'image4' }
    ]
  ],
  [
    [
      { idx: 5, alt: 'image6' },
      { idx: 7, alt: 'image7' }
    ],
    [
      { idx: 6, alt: 'image8' },
      { idx: 8, alt: 'image9' }
    ]
  ]
]

const InfiniteSlider = () => {
  const sliderRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return
    let scrollAmount = 0
    let reqId: number
    const scrollSlider = () => {
      if (!slider) return
      scrollAmount += 1
      if (scrollAmount >= slider.scrollWidth / 2) {
        scrollAmount = 0
      }
      slider.style.transform = `translateX(-${scrollAmount}px)`
      reqId = requestAnimationFrame(scrollSlider)
    }
    reqId = requestAnimationFrame(scrollSlider)
    return () => cancelAnimationFrame(reqId)
  }, [])
  const renderSliderContent = () => (
    <div className="flex flex-row gap-2.5 justify-center items-center">
      <div className="w-auto h-auto flex flex-col gap-2">
        {sliderGroups[0].map((row, i) => (
          <div
            key={i}
            className={`flex flex-row gap-2${i === 1 ? ' justify-end' : ''}`}
          >
            {row.map(({ idx, alt }) => (
              <Image
                key={alt}
                width={images[idx].width}
                height={images[idx].height}
                src={images[idx].imageURL}
                alt={alt}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="w-auto h-auto">
        <Image
          width={images[4].width}
          height={images[4].height}
          src={images[4].imageURL}
          alt="image5"
        />
      </div>
      <div className="w-auto h-auto flex flex-col gap-2">
        {sliderGroups[1].map((row, i) => (
          <div className="flex flex-row gap-2" key={i}>
            {row.map(({ idx, alt }) => (
              <Image
                key={alt}
                width={images[idx].width}
                height={images[idx].height}
                src={images[idx].imageURL}
                alt={alt}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
  return (
    <div className="overflow-hidden w-full h-[600px] mb-8">
      <div
        ref={sliderRef}
        className="flex whitespace-nowrap w-max will-change-transform h-full"
        style={{ transition: "none" }}
      >
        {renderSliderContent()}
        {renderSliderContent()}
      </div>
    </div>
  )
}

export default InfiniteSlider