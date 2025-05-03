import { useContext } from "react";
import PropTypes from "prop-types";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
    const { currency } = useContext(ShopContext);

    return (
        <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
            <div className="overflow-hidden">
                <img className="transition ease-out hover:scale-110" src={image[0]} alt={name} />
                <p className="pt-3 pb-1 text-sm">{name}</p>
                <p className="text-sm font-medium">{currency}{price}</p>
            </div>
        </Link>
    );
};

ProductItem.propTypes = {
    id: PropTypes.string.isRequired,
    image: PropTypes.arrayOf(PropTypes.string).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
};
export default ProductItem;