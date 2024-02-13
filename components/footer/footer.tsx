import React, { useContext, useEffect, useRef, useState } from "react";
import { PlayerContext } from "@/src/contexts/PlayerContext";
import { backendurl } from "@/src/constants/contants";
import { Simulate } from "react-dom/test-utils";
import { log } from "console";
import { getStorage, ref } from "firebase/storage";
import Player from "../player/Player";

export default function Footer() {
  
  return (
    <>
      <footer className="fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow flex flex-col item dark:bg-gray-800 dark:border-gray-600">
        <Player/>
        <div className="md:flex md:items-center md:justify-between md:p-6">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023
            <a href="/" className="hover:underline">
              SoCloud™
            </a>
            . All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}
