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
    </div>
  );
}
