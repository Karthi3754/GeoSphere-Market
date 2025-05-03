import { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(backendUrl + "/api/product/add", formData, {
        headers: { token },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
        setSizes([]);
        setCategory("Men");
        setSubCategory("Topwear");
        setBestseller(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full border-t-4 border-purple-500 bg-gradient-to-br from-purple-50 to-white">
      <div className="w-full max-w-6xl p-6 mx-auto md:p-8">
        <h2 className="pb-3 mb-6 text-3xl font-bold text-purple-800 border-b border-purple-200">
          Add New Product
        </h2>
        
        <form onSubmit={onSubmitHandler} className="flex flex-col items-start w-full gap-6">
          <div className="w-full p-6 bg-white rounded-lg shadow-md" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
            <p className="mb-3 font-medium text-purple-800">Upload Images</p>
            <div className="flex flex-wrap gap-4">
              {[
                { state: image1, setState: setImage1, id: "image1" },
                { state: image2, setState: setImage2, id: "image2" },
                { state: image3, setState: setImage3, id: "image3" },
                { state: image4, setState: setImage4, id: "image4" }
              ].map((img, index) => (
                <label key={img.id} htmlFor={img.id} className="relative cursor-pointer group">
                  <div className="overflow-hidden border-2 border-purple-300 border-dashed rounded-lg" 
                       style={{ backgroundColor: "rgba(237, 233, 254, 0.5)" }}>
                    <img
                      className="object-cover w-28 h-28"
                      src={!img.state ? assets.upload_area : URL.createObjectURL(img.state)}
                      alt={`Upload area ${index + 1}`}
                    />
                    <div className="absolute inset-0 flex items-center justify-center transition-all duration-200 bg-purple-800 bg-opacity-0 group-hover:bg-opacity-30">
                      <p className="text-sm font-medium text-white opacity-0 group-hover:opacity-100">
                        {img.state ? "Change" : "Upload"}
                      </p>
                    </div>
                  </div>
                  <input
                    onChange={(e) => img.setState(e.target.files[0])}
                    type="file"
                    id={img.id}
                    hidden
                    accept="image/*"
                  />
                </label>
              ))}
            </div>
            <p className="mt-2 text-sm text-purple-600">Upload up to 4 high-quality product images</p>
          </div>
          
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
            <div className="p-6 bg-white rounded-lg shadow-md" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
              <label htmlFor="name" className="block mb-2 font-medium text-purple-800">Product Name</label>
              <input
                id="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="w-full px-4 py-3 transition-all border border-purple-200 rounded-md outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                type="text"
                placeholder="Enter product name"
                required
              />
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-md" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
              <label htmlFor="price" className="block mb-2 font-medium text-purple-800">Price ($)</label>
              <input
                id="price"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                className="w-full px-4 py-3 transition-all border border-purple-200 rounded-md outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                type="number"
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>
          
          <div className="w-full p-6 bg-white rounded-lg shadow-md" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
            <label htmlFor="description" className="block mb-2 font-medium text-purple-800">Product Description</label>
            <textarea
              id="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className="w-full h-32 px-4 py-3 transition-all border border-purple-200 rounded-md outline-none resize-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
              placeholder="Describe your product in detail"
              required
            />
          </div>
          
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
            <div className="p-6 bg-white rounded-lg shadow-md" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
              <label htmlFor="category" className="block mb-2 font-medium text-purple-800">Category</label>
              <select
                id="category"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className="w-full px-4 py-3 transition-all border border-purple-200 rounded-md outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-md" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
              <label htmlFor="subCategory" className="block mb-2 font-medium text-purple-800">Sub Category</label>
              <select
                id="subCategory"
                onChange={(e) => setSubCategory(e.target.value)}
                value={subCategory}
                className="w-full px-4 py-3 transition-all border border-purple-200 rounded-md outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
              >
                <option value="Topwear">Topwear</option>
                <option value="Bottomwear">Bottomwear</option>
                <option value="Winterwear">Winterwear</option>
              </select>
            </div>
          </div>
          
          <div className="w-full p-6 bg-white rounded-lg shadow-md" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
            <p className="mb-3 font-medium text-purple-800">Available Sizes</p>
            <div className="flex flex-wrap gap-3">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <div
                  key={size}
                  onClick={() =>
                    setSizes((prev) =>
                      prev.includes(size)
                        ? prev.filter((item) => item !== size)
                        : [...prev, size]
                    )
                  }
                  className={`${
                    sizes.includes(size) 
                      ? "bg-purple-600 text-white border-purple-700" 
                      : "bg-white text-purple-800 border-purple-300"
                  } px-5 py-2 rounded-md cursor-pointer border-2 transition-all hover:shadow-md font-medium`}
                  style={{
                    backgroundColor: sizes.includes(size) ? "rgba(124, 58, 237, 0.9)" : "rgba(255, 255, 255, 0.9)"
                  }}
                >
                  {size}
                </div>
              ))}
            </div>
            <p className="mt-2 text-sm text-purple-600">Click to select multiple sizes</p>
          </div>
          
          <div className="w-full p-6 bg-white rounded-lg shadow-md" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={bestseller}
                onChange={() => setBestseller((prev) => !prev)}
                id="bestseller"
              />
              <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-purple-600"></div>
              <span className="ml-3 font-medium text-purple-800">Add to Bestseller Collection</span>
            </label>
            <p className="mt-2 ml-16 text-sm text-purple-600">Featured products will appear on the homepage</p>
          </div>
          
          <div className="flex justify-end w-full mt-6">
            <button 
              className="px-8 py-4 text-lg font-medium text-white transition-colors bg-purple-600 rounded-md shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
              style={{ backgroundColor: "rgba(124, 58, 237, 0.9)" }}
              type="submit"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

Add.propTypes = {
  token: PropTypes.string.isRequired,
};

export default Add;