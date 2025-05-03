// frontend/src/components/Navbar.jsx
import { Link, NavLink } from 'react-router-dom';
import { assets } from '../assets/frontend_assets/assets.js';
import { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

    const logout = () => {
        navigate('/login');
        localStorage.removeItem('token');
        setToken('');
        setCartItems({});
    }

    return (
        <div className="flex items-center justify-between py-5 font-medium">
            <Link to='/'>
                <img src={assets.logo} className='w-36' alt="logo" />
            </Link>
            <ul className='hidden gap-5 text-sm text-gray-700 sm:flex'>
                <NavLink to='/' className='flex flex-col items-center gap-1'>
                    {({ isActive }) => (
                        <>
                            <p className={isActive ? 'text-black' : ''}>Home</p>
                            <hr className={`w-2/4 border-none h-[1.5px] bg-gray-700 ${isActive ? 'block' : 'hidden'}`} />
                        </>
                    )}
                </NavLink>
                <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                    {({ isActive }) => (
                        <>
                            <p className={isActive ? 'text-black' : ''}>Collection</p>
                            <hr className={`w-2/4 border-none h-[1.5px] bg-gray-700 ${isActive ? 'block' : 'hidden'}`} />
                        </>
                    )}
                </NavLink>
                <NavLink to='/about' className='flex flex-col items-center gap-1'>
                    {({ isActive }) => (
                        <>
                            <p className={isActive ? 'text-black' : ''}>About</p>
                            <hr className={`w-2/4 border-none h-[1.5px] bg-gray-700 ${isActive ? 'block' : 'hidden'}`} />
                        </>
                    )}
                </NavLink>
                <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                    {({ isActive }) => (
                        <>
                            <p className={isActive ? 'text-black' : ''}>Contact</p>
                            <hr className={`w-2/4 border-none h-[1.5px] bg-gray-700 ${isActive ? 'block' : 'hidden'}`} />
                        </>
                    )}
                </NavLink>
            </ul>
            <div className='flex items-center gap-6'>
                <img onClick={() => setShowSearch(true)} src={assets.search_icon} alt="search" className='w-5 cursor-pointer' />
                <div className='relative group'>
                    <img onClick={() => token ? null : navigate('/login')} src={assets.profile_icon} alt="profile" className='w-5 cursor-pointer' />
                    {token &&
                        <div className='absolute right-0 hidden pt-4 group-hover:block dropdown-menu'>
                            <div className='flex flex-col items-center gap-2 py-3 text-gray-500 rounded w-36 bg-slate-100'>
                                <p className='cursor-pointer hover:text-black'>My Profile</p>
                                <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                                <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
                            </div>
                        </div>
                    }
                </div>
                <Link to='/cart' className='relative'>
                    <img src={assets.cart_icon} className='w-5 min-w-5' alt="cart" />
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
                </Link>
                <Link to='/chat' className='relative'>
                    <img src={assets.chat_icon} className='w-5 min-w-5' alt="chat" />
                </Link>
                <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="menu" />
            </div>
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                        <img src={assets.dropdown_icon} alt="dropdown" className='h-4 rotate-180' />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} className={({ isActive }) => `py-2 pl-6 border ${isActive ? 'text-black bg-gray-100' : ''}`} to='/'>Home</NavLink>
                    <NavLink onClick={() => setVisible(false)} className={({ isActive }) => `py-2 pl-6 border ${isActive ? 'text-black bg-gray-100' : ''}`} to='/collection'>Collection</NavLink>
                    <NavLink onClick={() => setVisible(false)} className={({ isActive }) => `py-2 pl-6 border ${isActive ? 'text-black bg-gray-100' : ''}`} to='/about'>About</NavLink>
                    <NavLink onClick={() => setVisible(false)} className={({ isActive }) => `py-2 pl-6 border ${isActive ? 'text-black bg-gray-100' : ''}`} to='/contact'>Contact</NavLink>
                    <NavLink onClick={() => setVisible(false)} className={({ isActive }) => `py-2 pl-6 border ${isActive ? 'text-black bg-gray-100' : ''}`} to='/chat'>Chat with Seller</NavLink>
                </div>
            </div>
        </div>
    );
}

export default Navbar;