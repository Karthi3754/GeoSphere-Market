import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        const bestProduct = products.filter((item) => item.bestseller);
        setBestSeller(bestProduct.slice(0, 5));
    }, [products]);

    return (
        <div className="px-4 py-16 bg-gradient-to-b from-white to-gray-50">
            <div className="mx-auto max-w-7xl">
                {/* Header Section */}
                <div className="mb-12 text-center">
                    <div className="relative inline-block">
                        <div className="absolute w-24 h-1 transform -translate-x-1/2 bg-yellow-400 rounded-full -top-6 left-1/2"></div>
                        <Title text1={"BEST "} text2={" SELLERS"} />
                        <div className="absolute w-16 h-1 transform -translate-x-1/2 bg-yellow-400 rounded-full -bottom-6 left-1/2"></div>
                    </div>
                    
                    <p className="max-w-2xl mx-auto mt-8 text-xs leading-relaxed text-gray-600 sm:text-sm md:text-base">
                        Explore unbeatable deals and endless variety at Amazon, your ultimate online shopping destination for everything you need!
                    </p>
                </div>
                
                {/* Products Grid */}
                <div className="relative">
                    {/* Top Decorative Element */}
                    <div className="absolute left-0 w-24 h-24 bg-yellow-400 rounded-full -top-6 opacity-10"></div>
                    <div className="absolute w-12 h-12 bg-yellow-400 rounded-full -top-2 right-8 opacity-10"></div>
                    
                    {/* Product Grid */}
                    <div className="relative z-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                        {bestSeller.map((item, index) => (
                            <div key={index} className="transition-transform duration-300 transform hover:scale-105 hover:z-20">
                                <div className="h-full overflow-hidden bg-white rounded-lg shadow-md">
                                    <div className="relative">
                                        {index === 0 && (
                                            <span className="absolute top-0 left-0 z-10 px-2 py-1 text-xs font-bold text-black bg-yellow-400 rounded-br-lg">#1 Best Seller</span>
                                        )}
                                        <ProductItem
                                            id={item._id}
                                            image={item.image}
                                            name={item.name}
                                            price={item.price}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Bottom Decorative Element */}
                    <div className="absolute w-32 h-32 bg-yellow-400 rounded-full -bottom-12 right-4 opacity-10"></div>
                </div>
                
                {/* View All Button */}
                <div className="mt-12 text-center">
                    <button className="px-8 py-3 font-medium text-white transition-colors duration-300 bg-black rounded shadow-lg hover:bg-gray-800">
                        View All Best Sellers
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BestSeller;