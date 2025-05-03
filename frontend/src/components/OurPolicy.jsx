import { assets } from "../assets/frontend_assets/assets";

const OurPolicy = () => {
    return (
        <div className="flex flex-col justify-around gap-12 py-20 text-xs text-center text-gray-700 sm:flex-row sm:gap-2 sm:text-sm md:text-base">
            <div>
                <img src={assets.exchange_icon} alt="exchange_icon" className="w-12 m-auto mb-5" />
                <p className="font-semibold">Easy Exchange Policy</p>
                <p className="text-gray-400">We offer hassle free exchange policy</p>
            </div>
            <div>
                <img src={assets.quality_icon} alt="quality_icon" className="w-12 m-auto mb-5" />
                <p className="font-semibold">7 Days Return Policy</p>
                <p className="text-gray-400">We provide 7 days free return policy</p>
            </div>
            <div>
                <img src={assets.support_img} alt="support_img" className="w-12 m-auto mb-5" />
                <p className="font-semibold">Best Customer Support</p>
                <p className="text-gray-400">We offer 24/7 Customer Support</p>
            </div>
        </div>
    );
}

export default OurPolicy;