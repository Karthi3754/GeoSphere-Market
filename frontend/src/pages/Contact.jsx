import { assets } from "../assets/frontend_assets/assets"
import { NewsLetterBox } from "../components/NewsLetterBox"
import Title from "../components/Title"

const Contact = () => {
  return (
    <div>
      <div className="pt-10 text-2xl text-center uppercase border-t">
        <Title text1={"Contact"} text2={"  us"} />
      </div>
      <div className="flex flex-col justify-center gap-10 my-10 md:flex-row mb-28">
        <img className="w-full md:max-w-[480px]" src={assets.contact_img} alt="Contact Image" />
        <div className="flex flex-col items-start justify-center gap-6">
          <p className="text-xl font-semibold text-gray-600">Our Store</p>
          <p className="text-gray-500">
            15, Surma Market <br /> VIP Road, Taltola, Sylhet
          </p>
          <p className="text-gray-500">
            Tel: +919583726238 <br /> Email: Shop360@gmail.com
          </p>
          <p className="text-xl font-semibold text-gray-500">Careers at Forever</p>
          <p className="text-gray-500">Learn more about our teams job openings.</p>
          <button className="px-8 py-4 text-sm transition-all duration-500 border border-black hover:bg-black hover:text-white">
            Explore Jobs
          </button>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  )
}

export default Contact