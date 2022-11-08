import React from "react";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";

import logo from "/home/chadvit/hh-bc/project-1/client/src/assets/images/ncrypt.png";

const NavBarItem = ({ title, classprops }) => (
  <li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <nav className="w-full flex md:justify-between items-center p-1">    {/* md is medium device */}
  
      <div className="md:flex-[0.4] flex-initial justify-start items-center"> {/* flex initial se items don't grow when there is extra space*/}
        <img src={logo} alt="logo" className=" w-25 cursor-pointer align-left " />
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
          <NavBarItem key={item + index} title={item} />
        ))}
        <li className="bg-[#2961e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#3a9bcc] flex-end">
          Login
        </li>
      </ul>
      <div className="flex">
        {!toggleMenu && (
          <AiOutlineMenu fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
        )}
        {toggleMenu && (
          <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[60vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-2xl -right-0 my-2"><AiOutlineClose onClick={() => setToggleMenu(false)} /></li>
            {["Market", "Exchange", "Tutorials", "Wallets"].map(
              (item, index) => <NavBarItem key={item + index} title={item} classprops="my-2 text-lg" />,
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;