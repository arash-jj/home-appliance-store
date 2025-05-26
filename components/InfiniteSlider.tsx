'use client'
import Image from 'next/image'
import React, {useEffect, useRef} from 'react'

const images = [
  {imageURL: "/custom-furniture/furniture1.png", width: 185, height: 323,},
  {imageURL: "/custom-furniture/furniture2.png", width: 274, height: 382,},
  {imageURL: "/custom-furniture/furniture3.png", width: 451, height: 312,},
  {imageURL: "/custom-furniture/furniture4.png", width: 344, height: 242,},
  {imageURL: "/custom-furniture/furniture5.png", width: 295, height: 392,},
  {imageURL: "/custom-furniture/furniture6.png", width: 290, height: 348,},
  {imageURL: "/custom-furniture/furniture7.png", width: 178, height: 242,},
  {imageURL: "/custom-furniture/furniture8.png", width: 425, height: 433,},
  {imageURL: "/custom-furniture/furniture9.png", width: 258, height: 196,}
]

const InfiniteSlider = () => {
  const sliderRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const slider = sliderRef.current
    if(!slider) return
    let scrollAmount = 0 
    let reqId : number
    
    const scrollSlider = ()=>{
      if(!slider) return
      scrollAmount += 1;
      if (scrollAmount >= slider.scrollWidth / 2) {
        scrollAmount = 0;
      }
      slider.style.transform = `translateX(-${scrollAmount}px)`
      reqId = requestAnimationFrame(scrollSlider)
    };
    reqId = requestAnimationFrame(scrollSlider);
    return () => cancelAnimationFrame(reqId)
  },[])
  
  return (
    <div className="overflow-hidden w-ful py-4">
      <div
        ref={sliderRef}
        className="flex whitespace-nowrap w-max will-change-transform"
        style={{ transition: "none" }}
      >
        {/* according to the design it should be like this */}
        <div className="flex flex-row gap-2.5 justify-center items-center">
          <div className="w-auto h-auto flex flex-col gap-2">
            <div className="flex flex-row gap-2">
              <Image width={images[1].width} height={images[1].height} src={images[1].imageURL} alt="image1"/>
              <Image width={images[2].width} height={images[2].height} src={images[2].imageURL} alt="image2"/>
            </div>
            <div className="flex flex-row gap-2 justify-end">
              <Image width={images[0].width} height={images[0].height} src={images[0].imageURL} alt="image3"/>
              <Image width={images[3].width} height={images[3].height} src={images[3].imageURL} alt="image4"/>
            </div>
          </div>
          <div className="w-auto h-auto">
            <Image width={images[4].width} height={images[4].height} src={images[4].imageURL} alt="image5"/>
          </div>
          <div className="w-auto h-auto flex flex-col gap-2">
            <div className="flex flex-row gap-2">
              <Image width={images[5].width} height={images[5].height} src={images[5].imageURL} alt="image6"/>
              <Image width={images[7].width} height={images[7].height} src={images[7].imageURL} alt="image7"/>
            </div>
            <div className="flex flex-row gap-2">
              <Image width={images[6].width} height={images[6].height} src={images[6].imageURL} alt="image8"/>
              <Image width={images[8].width} height={images[8].height} src={images[8].imageURL} alt="image9"/>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-2.5 justify-center items-center">
          <div className="w-auto h-auto flex flex-col gap-2">
            <div className="flex flex-row gap-2">
              <Image width={images[1].width} height={images[1].height} src={images[1].imageURL} alt="image1"/>
              <Image width={images[2].width} height={images[2].height} src={images[2].imageURL} alt="image2"/>
            </div>
            <div className="flex flex-row gap-2 justify-end">
              <Image width={images[0].width} height={images[0].height} src={images[0].imageURL} alt="image3"/>
              <Image width={images[3].width} height={images[3].height} src={images[3].imageURL} alt="image4"/>
            </div>
          </div>
          <div className="w-auto h-auto">
            <Image width={images[4].width} height={images[4].height} src={images[4].imageURL} alt="image5"/>
          </div>
          <div className="w-auto h-auto flex flex-col gap-2">
            <div className="flex flex-row gap-2">
              <Image width={images[5].width} height={images[5].height} src={images[5].imageURL} alt="image6"/>
              <Image width={images[7].width} height={images[7].height} src={images[7].imageURL} alt="image7"/>
            </div>
            <div className="flex flex-row gap-2">
              <Image width={images[6].width} height={images[6].height} src={images[6].imageURL} alt="image8"/>
              <Image width={images[8].width} height={images[8].height} src={images[8].imageURL} alt="image9"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfiniteSlider