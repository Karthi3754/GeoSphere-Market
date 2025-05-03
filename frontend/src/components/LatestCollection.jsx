import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
    const { products } = useContext(ShopContext);
    const [latestProduct, setLatestProduct] = useState([]);

    useEffect(() => {
        setLatestProduct(products.slice(0, 10));
    }, [products]);

    return (
        <div className="my-10">
            <div className="py-8 text-3xl text-center">
                <Title text1={'LATEST'} text2={' COLLECTION'} />
                <p className="w-3/4 m-auto text-xs text-gray-600 sm:text-sm md:text-base">
                    Explore unbeatable deals and endless variety at Amazon, your ultimate online shopping destination for everything you need!
                </p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6">
                {latestProduct.map((item, index) => (
                    <ProductItem
                        key={index}
                        id={item._id}
                        image={item.image}
                        name={item.name}
                        price={item.price}
                    />
                ))}
            </div>
        </div>
    );
}

export default LatestCollection;