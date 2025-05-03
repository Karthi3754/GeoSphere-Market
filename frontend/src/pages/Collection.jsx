import { useContext, useEffect, useState, useCallback } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
    const { products, search, showSearch } = useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(true);
    const [filterProducts, setFilterProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortType, setSortType] = useState('relevant');

    const toggleCategory = (e) => {
        const selectedCategory = e.target.value;
        setCategory(prev => 
            prev.includes(selectedCategory) 
                ? prev.filter(item => item !== selectedCategory)
                : [...prev, selectedCategory]
        );
    };

    const toggleSubCategory = (e) => {
        const selectedSubCategory = e.target.value;
        setSubCategory(prev => 
            prev.includes(selectedSubCategory)
                ? prev.filter(item => item !== selectedSubCategory)
                : [...prev, selectedSubCategory]
        );
    };

    const applyFilter = useCallback(() => {
        let filteredProducts = [...products];
        if (showSearch && search) {
            filteredProducts = filteredProducts.filter(item =>
                item.name.toLowerCase().includes(search.toLowerCase())
            );
        }
        if (category.length > 0) {
            filteredProducts = filteredProducts.filter(item => 
                category.includes(item.category)
            );
        }
        if (subCategory.length > 0) {
            filteredProducts = filteredProducts.filter(item => 
                subCategory.includes(item.subCategory)
            );
        }
        setFilterProducts(filteredProducts);
    }, [products, category, subCategory, search, showSearch]);

    const sortProduct = useCallback(() => {
        let sortedProducts = [...filterProducts];
        switch (sortType) {
            case 'low-high':
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case 'high-low':
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            default:
                break;
        }
        setFilterProducts(sortedProducts);
    }, [filterProducts, sortType]);

    useEffect(() => {
        applyFilter();
    }, [applyFilter]);

    useEffect(() => {
        sortProduct();
    }, [sortProduct]);

    return (
        <div className="flex flex-col gap-1 pt-10 border-t sm:flex-row sm:gap-10">
            <div className="min-w-60">
                <p 
                    onClick={() => setShowFilter(!showFilter)} 
                    className="flex items-center gap-2 my-2 text-xl cursor-pointer"
                >
                    FILTERS
                    <img 
                        className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} 
                        src={assets.dropdown_icon} 
                        alt="Filter toggle" 
                    />
                </p>
                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className="mb-3 text-sm font-medium">CATEGORIES</p>
                    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                        {['Men', 'Women', 'Kids'].map((cat) => (
                            <p key={cat} className="flex gap-2">
                                <input 
                                    type="checkbox" 
                                    className="w-3" 
                                    value={cat} 
                                    checked={category.includes(cat)}
                                    onChange={toggleCategory} 
                                />{cat}
                            </p>
                        ))}
                    </div>
                </div>
                <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className="mb-3 text-sm font-medium">TYPE</p>
                    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                        {[
                            { value: 'Topwear', label: 'Top Wear' },
                            { value: 'Bottomwear', label: 'Bottom Wear' },
                            { value: 'Winterwear', label: 'Winter Wear' }
                        ].map((subCat) => (
                            <p key={subCat.value} className="flex gap-2">
                                <input 
                                    type="checkbox" 
                                    className="w-3" 
                                    value={subCat.value} 
                                    checked={subCategory.includes(subCat.value)}
                                    onChange={toggleSubCategory} 
                                />{subCat.label}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex-1">
                <div className="flex justify-between mb-4 text-base sm:text-2xl">
                    <Title text1={"All "} text2={" COLLECTION"} />
                    <select 
                        value={sortType}
                        onChange={(e) => setSortType(e.target.value)} 
                        className="px-2 text-sm border-2 border-gray-200"
                    >
                        <option value="relevant">Sort by: Relevant</option>
                        <option value="low-high">Sort by: Low to High</option>
                        <option value="high-low">Sort by: High to Low</option>
                    </select>
                </div>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 gap-y-6">
                    {filterProducts.length > 0 ? (
                        filterProducts.map((item, index) => (
                            <ProductItem 
                                key={item._id || index} 
                                id={item._id} 
                                image={item.image} 
                                name={item.name} 
                                price={item.price} 
                            />
                        ))
                    ) : (
                        <p className="text-center text-gray-500 col-span-full">
                            No products found matching the selected filters.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};
export default Collection;