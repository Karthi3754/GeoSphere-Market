import PropTypes from "prop-types";

const Title = ({ text1, text2 }) => {
    return (
        <div className="inline-flex items-center gap-2 mb-3">
            <p className="text-gray-500 uppercase">
                {text1}
                <span className="font-medium text-gray-700 uppercase">{text2}</span>
            </p>
            <p className="w-8 sm:w-12 h-[2px] sm:h-[2px] bg-gray-700"></p>
        </div>
    );
};

Title.propTypes = {
    text1: PropTypes.string.isRequired,
    text2: PropTypes.string.isRequired,
};

export default Title;