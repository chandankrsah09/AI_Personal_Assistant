'use client'
import React, { useContext } from "react";
import Image from "next/image";
import { AuthContext } from "@/context/AuthContext";

function Header() {
    const { user } = useContext(AuthContext);
  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-14">
      <Image src={"/logo.svg"} alt="Logo" width={40} height={40} />

      {user?.picture && <Image src={user?.picture} alt="Logo" width={40} height={40} className='rounded-full' />}
    </div>
  );
}

export default Header;
