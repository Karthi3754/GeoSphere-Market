import { assets } from "../assets/frontend_assets/assets";
import { NewsLetterBox } from "../components/NewsLetterBox";
import Title from "../components/Title";

const About = () => {
    return (
        <div>
            <div className="pt-8 text-2xl text-center border-t">
                <Title text1={"ABOUT"} text2={"  US"} />
            </div>
            <div className="flex flex-col gap-16 my-10 md:flex-row">
                <img className="w-full md:max-w-[450px]" src={assets.about_img} alt="About Us Image" />
                <div className="flex flex-col justify-center gap-6 text-gray-600 md:w-2/4">
                    <p>Explore unbeatable deals and endless variety at Amazon, your ultimate online shopping destination for everything you need!</p>
                    <p>Amazon aims to empower customers to find everything they need while maintaining a focus on convenience, sustainability, and improving everyday lives.</p>
                    <b className="text-gray-800">Our Mission</b>
                    <p>Amazon mission is to be Earth’s most customer-centric company, where customers can find and discover anything they might want to buy online, while offering the lowest possible prices, the best selection, and the utmost convenience.</p>
                </div>
            </div>
            <div className="py-4 text-xl uppercase">
                <Title text1={"Why "} text2={"CHOOSE US"} />
            </div>
            <div className="flex flex-col mb-20 text-sm md:flex-row">
                <div className="flex flex-col gap-5 px-10 py-8 border md:px-16 sm:py-20">
                    <b>Quality Assurance:</b>
                    <p className="text-gray-600">At Amazon, we ensure the highest standards of quality across every product. With rigorous checks and trusted suppliers, we guarantee that every purchase meets your expectations, delivering reliability and value every time.</p>
                </div>
                <div className="flex flex-col gap-5 px-10 py-8 border md:px-16 sm:py-20">
                    <b>Convenience:</b>
                    <p className="text-gray-600">Amazon makes shopping easier than ever with a user-friendly platform, fast delivery options, and a wide range of products at your fingertips. Whether at home or on the go, find everything you need with just a few clicks.</p>
                </div>
                <div className="flex flex-col gap-5 px-10 py-8 border md:px-16 sm:py-20">
                    <b>Exceptional Customer Service:</b>
                    <p className="text-gray-600">We’re committed to providing unparalleled customer support. From fast resolutions to seamless returns, our team is dedicated to ensuring your shopping experience is smooth, hassle-free, and satisfying.</p>
                </div>
            </div>
            <NewsLetterBox />
        </div>
    );
};
export default About;