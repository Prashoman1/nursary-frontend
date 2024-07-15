import  { useState } from 'react'

import { HiOutlineSearch } from "react-icons/hi";
import { HiShoppingCart, HiMiniUserCircle } from "react-icons/hi2";

import { motion, AnimatePresence } from "framer-motion";
import { Link } from 'react-router-dom';

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const items = [
      {
        name: "Home",
        path: "/",
      },
      {
        name: "About",
        path: "/about",
      },
  
      {
        name: "Services",
        path: "/services",
      },
      {
        name: "Portfolio",
        path: "/portfolio",
      },
      {
        name: "Contact",
        path: "/contact",
      },
    ];
  
    const handleSearch = () => {
      setIsOpen(!isOpen);
    };
  return (
   <>
    <div>
      <div className="w-full ">
        <nav className="bg-[#690213]  w-full  border-[#690213] lg:px-24 xl:px-20 shadow-2xl">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
            <a
              href="#"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              {/* <Image src={logo} width={60} height={60} alt="" /> */}
            </a>
            <div className="flex md:hidden items-center space-x-3 rtl:space-x-reverse">
              <button className="p-2">
                <i className="fa-solid fa-cart-shopping text-white"></i>
              </button>
              <button
                data-collapse-toggle="navbar-sticky"
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg hover:bg-[#F2BF4A] focus:outline-none focus:ring-2 focus:ring-gray-200"
                aria-controls="navbar-sticky"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
            </div>

            <div className="hidden md:flex md:items-center md:space-x-3 rtl:space-x-reverse">
              <ul className="flex items-center space-x-8 rtl:space-x-reverse">
                {items.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.path}
                      className="text-white hover:text-[#F2BF4A]"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-3">
                <motion.input
                  initial={{ opacity: 0, width: 0 }}
                  animate={{
                    opacity: isOpen ? 1 : 0,
                    width: isOpen ? "14rem" : 0, // "14rem" is equivalent to w-56 in Tailwind CSS
                  }}
                  transition={{ duration: 0.3 }}
                  placeholder="Search..."
                  className="input shadow-lg focus:border-2 focus:border-[#F2C047] px-3 py-1 rounded-lg transition-all outline-none"
                  name="search"
                  type="search"
                  style={{ height: "2.5rem" }} // Set a fixed height (e.g., 2.5rem for py-1 and the padding)
                />
                <HiOutlineSearch
                  onClick={handleSearch}
                  className="w-6 h-6 text-white cursor-pointer"
                />
              </div>
              <div>
                <HiShoppingCart
                  onClick={() => setIsCartOpen(!isCartOpen)}
                  className="w-6 h-6 text-white cursor-pointer"
                />
              </div>
              <div>
                <HiMiniUserCircle className="w-6 h-6 text-white cursor-pointer" />
              </div>
            </div>
          </div>
        </nav>
      </div>
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className="w-[30%] bg-[#690213] bg-opacity-50 px-3 py-5 rounded absolute right-[2%] top-[13%] z-40"
          >
            <div className="w-full flex items-center justify-between border border-gray-300 px-2 py-1 rounded-md">
              <div>
                <img
                  className="w-[50px] h-[50px]"
                  src="https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                  alt=""
                />
              </div>
              <div>
                <h1>Test the title</h1>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#690213] cursor-pointer">-</span>
                <span>
                  <input
                    type="text"
                    className="w-[20px] px-1 border border-[#690213] rounded-md"
                    value={1}
                  />
                </span>
                <span className="text-[#690213] cursor-pointer">+</span>
              </div>
              <div>Delete</div>
            </div>
            <div className="flex items-center justify-center">
              <button className="bg-[#690213] text-white px-3 py-1 rounded mt-3">
                Checkout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div></>
  )
}
