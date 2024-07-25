"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { AiOutlineTransaction } from "react-icons/ai";
import { RiP2pFill } from "react-icons/ri";
import React from "react";

export default function Sidebar() {
  const menus = [
    { name: "Dashboard", link: "/dash", icon: RiDashboardHorizontalLine },
    { name: "Add Balance", link: "/transfer", icon: FaMoneyBillTransfer },
    { name: "Transactions", link: "/transactions", icon: AiOutlineTransaction },
    { name: "P2P", link: "/p2p", icon: RiP2pFill },
  ];

  return (
    <div
      className={`bg-black min-h-screen w-72 text-white duration-500 border-r-2`}
    >
      <div className="mt-4 flex flex-col gap-4 relative p-1">
        {menus.map((menu, i) => (
          <Link
            className="flex items-center gap-3.5 p-2.5 hover:bg-gray-800 rounded-lg"
            href={menu.link}
            key={i}
          >
            <div>{React.createElement(menu.icon, { size: 26 })}</div>
            <h2
              style={{
                transitionDelay: `${i + 3}00ms`,
              }}
              className={`whitespace-pre duration-500`}
            >
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
