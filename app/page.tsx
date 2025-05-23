import TopProducts from '@/components/TopProducts';
import Link from 'next/link'
export default function Home() {
  return (
    <div>
      <section className="h-[718px] heroBackground relative">
        <div className="w-[643px] h-[443px] rounded-[10px] bg-textBackground absolute right-12 bottom-30 p-12">
          <div>
            <span className="font-semibold tracking-[3px]">New Arrival</span>
          </div>
          <div className="text-[52px] leading-[65px] line-clamp-2 font-bold text-primary">
            <p className="w-[70%]">Discover Our New Collection</p>
          </div>
          <div className="text-lg leading-6 font-medium mt-2.5 mb-5">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.</p>
          </div>
          <div className="mt-20">
            <Link href="/shop" className="px-[75px] py-[25px] bg-primary font-bold text-white"> 
              BUY NOW
            </Link>
          </div>
        </div>
      </section>
      <section>
        <section className="flex flex-col items-center">
          <section className="w-[1183px] h-[685px] mt-10">
            <div className="flex flex-col justify-center items-center">
              <p className="font-bold text-[32px] text-titleText">Browse The Range</p>
              <p className="text-xl text-subTitleText">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="flex flex-row gap-5 mt-10">
              <div className="housePartsCard">
                <div className="diningRoomBg h-[480px] w-full">
                  {/* None */}
                </div>
                <div className="text-2xl h-[66px] font-semibold text-subTitleText flex justify-center items-center">
                  <p>Dining</p>
                </div>
              </div>
              <div className="housePartsCard">
                <div className="LivingRoomBg h-[480px] w-full">
                  {/* None */}
                </div>
                <div className="text-2xl h-[66px] font-semibold text-subTitleText flex justify-center items-center">
                  <p>Living</p>
                </div>
              </div>
              <div className="housePartsCard">
                <div className="bedRoomBg h-[480px] w-full">
                  {/* None */}
                </div>
                <div className="text-2xl h-[66px] font-semibold text-subTitleText flex justify-center items-center">
                  <p>Bedroom</p>
                </div>
              </div>
            </div>
          </section>
          <section className="w-[1236px] mt-10">
            <div className="flex justify-center items-center font-bold text-[40px] my-3">
              <p>Our Products</p>
            </div>
            <TopProducts/>
            <div className="flex justify-center items-center">
              <Link href="/shop" className='w-[245px] h-[48px] border-2 border-primary text-primary font-semibold flex justify-center items-center mt-3.5'>
                <span>Show More</span>
              </Link>
            </div>
          </section>
        </section>
      </section>
    </div>
  );
}
