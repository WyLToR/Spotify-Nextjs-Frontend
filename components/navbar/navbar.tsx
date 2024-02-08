import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/src/contexts/AuthContext";
import Modal from "../modal/modal";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Navbar(props: any) {
  const [isClient, setIsClient] = useState(false);
  const { auth, setAuth }: any = useContext(AuthContext);
  const [loginModal, setLoginModal] = useState(props.log.loginModal);
  const [registerModal, setRegisterModal] = useState(props.reg.registerModal);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const router = useRouter();
  useEffect(() => {
    setIsClient(true);
  }, []);
  useEffect(()=>{

  })
  return (
    !isClient || (
      <>
        <Modal
          log={{ loginModal, setLoginModal }}
          reg={{ registerModal, setRegisterModal }}
        />
        <nav
          className={`bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600`}
        >
          <div
            className={`max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4`}
          >
            <Link
              href="/"
              className={`flex items-center space-x-3 rtl:space-x-reverse`}
            >
              <span
                className={`self-center text-2xl font-semibold whitespace-nowrap dark:text-red-600`}
              >
                SoCloud
              </span>
            </Link>
            <div
              className={`flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse`}
            >
              {!auth?.token && !auth?.user ? (
        <button
          type="button"
          onClick={() => setLoginModal(!loginModal)}
          className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          Login
        </button>
      ) : (
        <div className="relative">
          <button
            className="relative z-10 block w-8 h-8 overflow-hidden rounded-full shadow focus:outline-none"
            onClick={toggleDropdown}
          >
            <img
              className="object-cover w-full h-full"
              src={auth.userPicture}
              alt="your picture"
            />
          </button>
          {dropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-1 w-full h-full"
                onClick={() => setDropdownOpen(false)}
              />
              <div
                className={`transition duration-150 ease-out transform ${
                  dropdownOpen
                    ? "scale-100 opacity-100"
                    : "scale-95 opacity-0"
                }`}
              >
                <div className="absolute right-0 z-20 w-48 py-2 mt-2 bg-white rounded-md shadow-xl">
                  <Link
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
                    onClick={()=>setDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  {auth?.role === "ADMIN" && (
                    <Link
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
                      href={{ pathname: "/admin" }}
                      onClick={()=>setDropdownOpen(false)}
                      >
                        
                      Admin
                    </Link>
                  )}
                  <Link
                    href="/"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
                    onClick={() => {
                      setAuth(null);
                      setDropdownOpen(false)
                      localStorage.removeItem("user");
                      localStorage.removeItem("token");
                    }}
                  >
                    Log out
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      )}
              <button
                data-collapse-toggle="navbar-sticky"
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
            </div>
            <div
              className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
              id="navbar-sticky"
            >
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <Link
                    href={{ pathname: "/" }}
                    className="block py-2 px-3 text-white bg-red-700 rounded md:bg-transparent md:text-red-700 md:p-0 md:dark:text-red-500"
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href={{ pathname: "/artist" }}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-700 md:p-0 md:dark:hover:text-red-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Artists
                  </Link>
                </li>
                <li>
                  <Link
                    href={{ pathname: "/album" }}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-700 md:p-0 md:dark:hover:text-red-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Albums
                  </Link>
                </li>
                <li>
                  <Link
                    href={{ pathname: "/song" }}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-700 md:p-0 md:dark:hover:text-red-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Songs
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </>
    )
  );
}
