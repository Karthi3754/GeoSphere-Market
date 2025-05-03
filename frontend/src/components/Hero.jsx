import Lottie from 'react-lottie';
import shoppingBagAnimation from '../assets/animations/shoppingBag.json';

const Hero = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: shoppingBagAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <div className="flex flex-col border border-gray-400 sm:flex-row">
            <div className="flex items-center justify-center w-full bg-black sm:w-1/2">
                <Lottie 
                    options={defaultOptions} 
                    height={500}
                    width={500} 
                />
            </div>
            <div className="flex items-center justify-center w-full py-10 sm:w-1/2 sm:py-0">
                <div className="text-[#414141]">
                    <div className="flex items-center gap-2">
                        <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
                        <p className="text-sm font-medium md:text-base">OUR BEST SELLERS</p>
                    </div>
                    <h1 className="text-3xl leading-relaxed prata-regular sm:py-3n lg:text-5xl">Latest Arrivals</h1>
                    <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold md:text-base">SHOP NOW</p>
                        <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Hero;