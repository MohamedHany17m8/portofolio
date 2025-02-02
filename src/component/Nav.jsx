import { headerLogo } from "../assets/images";
import { Link } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import { navLinks } from "../constants";
import { FaChevronDown } from "react-icons/fa"; // Import arrow icon

const Nav = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isHomeOpen, setIsHomeOpen] = useState(false);
  const hamburgerRef = useRef(null);
  const navRef = useRef(null);
  const homeSubmenuRef = useRef(null); // Ref for the Home submenu

  // Separate refs for arrow wrappers on large & small screens
  const largeArrowRef = useRef(null);
  const smallArrowRef = useRef(null);

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  const toggleHome = () => {
    setIsHomeOpen((prev) => !prev); // Toggle the submenu state
  };

  // Handle click outside to close menus
  useEffect(() => {
    function handleClickOutside(event) {
      // Close the main nav if clicked outside of nav and hamburger
      if (
        navRef.current &&
        !navRef.current.contains(event.target) &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setIsNavOpen(false);
      }

      // Close the Home submenu if clicked outside of:
      // - the submenu
      // - the large-screen arrow wrapper
      // - the small-screen arrow wrapper
      if (
        homeSubmenuRef.current &&
        !homeSubmenuRef.current.contains(event.target) &&
        !(
          (largeArrowRef.current &&
            largeArrowRef.current.contains(event.target)) ||
          (smallArrowRef.current &&
            smallArrowRef.current.contains(event.target))
        )
      ) {
        setIsHomeOpen(false);
      }
    }

    if (isNavOpen || isHomeOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNavOpen, isHomeOpen]);

  return (
    <header className="padding-x py-8 fixed top-0 left-0 w-full bg-white z-50 shadow-md">
      <nav className="flex justify-between items-center max-container">
        <a href="/">
          <img
            src={headerLogo}
            alt="logo"
            width={129}
            height={29}
            className="m-0 w-[129px] h-[29px] transition-transform duration-300 hover:scale-105"
          />
        </a>

        {/* Navigation Links for larger screens */}
        <ul className="flex-1 flex justify-center items-center gap-[7%] max-lg:hidden">
          <li className="relative flex items-center">
            <Link
              to="/"
              className="font-montserrat leading-normal text-lg text-slate-gray hover:text-coral-red transition-colors duration-300"
              onClick={toggleNav}
            >
              Home
            </Link>
            {/* Arrow icon wrapper for large screens */}
            <span
              ref={largeArrowRef}
              className="cursor-pointer transition-transform duration-300 ml-2 text-slate-gray hover:text-coral-red"
              onClick={(e) => {
                e.stopPropagation(); // Prevent the Home link click from firing
                toggleHome(); // Toggle the submenu open/close
              }}
            >
              <FaChevronDown
                className={`transition-transform duration-300 ${
                  isHomeOpen ? "rotate-180" : ""
                }`}
              />
            </span>
            {/* Submenu */}
            <ul
              ref={homeSubmenuRef}
              className={`absolute top-full left-0 bg-white shadow-md w-40 py-2 rounded-lg transition-all duration-300 ${
                isHomeOpen ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
              style={{ zIndex: 1000 }}
            >
              {navLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="block px-4 py-2 font-montserrat text-lg text-slate-gray hover:text-coral-red transition-colors duration-300"
                    onClick={() => setIsHomeOpen(false)} // Close submenu on link click
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <Link
              to="/about"
              className="font-montserrat leading-normal text-lg text-slate-gray hover:text-coral-red transition-colors duration-300"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="font-montserrat leading-normal text-lg text-slate-gray hover:text-coral-red transition-colors duration-300"
            >
              Contact Us
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              className="font-montserrat leading-normal text-lg text-slate-gray hover:text-coral-red transition-colors duration-300"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/signin"
              className="font-montserrat leading-normal text-lg text-slate-gray hover:text-coral-red transition-colors duration-300"
            >
              Sign In
            </Link>
          </li>
        </ul>

        {/* Sign In and Explore Now links for larger screens */}
        <div className="flex gap-2 text-lg leading-normal font-medium font-montserrat max-lg:hidden wide:mr-24">
          <a
            href="/"
            className="hover:text-coral-red transition-colors duration-300"
          >
            Sign in
          </a>
          <span>/</span>
          <a
            href="/"
            className="hover:text-coral-red transition-colors duration-300"
          >
            Explore now
          </a>
        </div>

        {/* Hamburger Icon for small screens */}
        <div
          ref={hamburgerRef}
          className="hidden max-lg:block cursor-pointer space-y-1.5"
          onClick={toggleNav}
        >
          {/* Hamburger Bars */}
          <span
            className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${
              isNavOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-black transition-opacity duration-300 ${
              isNavOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${
              isNavOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </div>

        {/* Navigation Links for small screens */}
        <div
          ref={navRef}
          className={`lg:hidden absolute top-20 left-0 w-full bg-white shadow-md overflow-hidden transition-all duration-500 ease-in-out ${
            isNavOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          <ul className="flex flex-col items-center gap-4 py-4">
            <li className="relative flex items-center">
              <Link
                to="/"
                className="font-montserrat leading-normal text-lg text-slate-gray hover:text-coral-red transition-colors duration-300"
                onClick={toggleNav}
              >
                Home
              </Link>
              {/* Arrow icon wrapper for small screens */}
              <span
                ref={smallArrowRef}
                className="cursor-pointer transition-transform duration-300 ml-2 text-slate-gray hover:text-coral-red"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleHome();
                }}
              >
                <FaChevronDown
                  className={`transition-transform duration-300 ${
                    isHomeOpen ? "rotate-180" : ""
                  }`}
                />
              </span>
              <ul
                className={`absolute top-full left-0 bg-white shadow-md w-40 py-2 rounded-lg transition-all duration-300 ${
                  isHomeOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
                style={{ zIndex: 1000 }}
              >
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="block px-4 py-2 font-montserrat text-lg text-slate-gray hover:text-coral-red transition-colors duration-300"
                      onClick={() => setIsHomeOpen(false)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <Link
                to="/about"
                className="font-montserrat leading-normal text-lg text-slate-gray hover:text-coral-red transition-colors duration-300"
                onClick={toggleNav}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="font-montserrat leading-normal text-lg text-slate-gray hover:text-coral-red transition-colors duration-300"
                onClick={toggleNav}
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="font-montserrat leading-normal text-lg text-slate-gray hover:text-coral-red transition-colors duration-300"
                onClick={toggleNav}
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/signin"
                className="font-montserrat leading-normal text-lg text-slate-gray hover:text-coral-red transition-colors duration-300"
                onClick={toggleNav}
              >
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
