import { headerLogo } from "../assets/images";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { navLinks } from "../constants";
import { useRef, useEffect } from "react";
const Nav = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navRef = useRef(null);
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  // Handle click outside to close menu
  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsNavOpen(false);
      }
    }

    if (isNavOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNavOpen]);
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
          <li>
            <Link
              to="/"
              className="font-montserrat leading-normal text-lg text-slate-gray hover:text-coral-red transition-colors duration-300"
            >
              Home
            </Link>
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
            <li>
              <Link
                to="/"
                className="font-montserrat leading-normal text-lg text-slate-gray hover:text-coral-red transition-colors duration-300"
                onClick={toggleNav}
              >
                Home
              </Link>
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
