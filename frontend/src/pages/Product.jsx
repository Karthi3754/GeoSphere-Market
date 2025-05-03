import { useContext, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from '../context/ShopContext';
import { assets } from "../assets/frontend_assets/assets";
import RelatedProduct from "../components/RelatedProduct";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  const fetchProductData = useCallback(async () => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  }, [products, productId]);

  useEffect(() => {
    fetchProductData();
  }, [fetchProductData]);

  const handleAddToCart = () => {
    if (size) {
      addToCart(productData._id, size);
    } else {
      alert("Please select a size before adding to cart.");
    }
  }

  return productData ? (
    <div className="pt-10 transition-opacity duration-500 ease-in border-t-2 opacity-100">
      <div className="flex flex-col gap-12 sm:gap-12 sm:flex-row">
        <div className="flex flex-col-reverse flex-1 gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt={`Thumbnail ${index + 1} for ${productData.name}`}
                onClick={() => setImage(item)}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt={`Main view of ${productData.name}`} />
          </div>
        </div>
        <div className="flex-1">
          <h1 className="mt-2 text-2xl font-medium">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {Array(4).fill().map((_, i) => (
              <img key={i} src={assets.star_icon} alt={`Star ${i + 1}`} className="w-3.5" />
            ))}
            <img src={assets.star_dull_icon} alt="Star 5" className="w-3.5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">{currency}{productData.price}</p>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button onClick={() => setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`} key={index}>{item}</button>
              ))}
            </div>
          </div>
          <button onClick={handleAddToCart} className="px-8 py-3 text-sm text-white bg-black active:bg-gray-700">Add to Cart</button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="flex flex-col gap-1 mt-5 text-sm text-gray-500">
            <p>100% Original Product</p>
            <p>Cash on Delivery is available on this product</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <div className="flex">
          <b className="px-5 py-3 text-sm border">Description</b>
          <p className="px-5 py-3 text-sm border">Review (122)</p>
        </div>
        <div className="flex flex-col gap-4 px-6 py-6 text-sm text-gray-500 border">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo tempora, repellendus, repudiandae atque optio est distinctio praesentium blanditiis id eaque perferendis exercitationem. Eius est rerum impedit quas, deleniti incidunt voluptate!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis cumque consequatur accusantium quibusdam sequi nisi aut temporibus hic, est a ratione sit minima, nostrum amet minus?</p>
        </div>
      </div>
      <RelatedProduct category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : <div className="opacity-0">Loading...</div>
}

export default Product;