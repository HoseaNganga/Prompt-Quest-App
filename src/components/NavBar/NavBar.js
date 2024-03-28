"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [providers, setProviders] = useState(null);
  const { data: session } = useSession();
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
    const mobileMenu = document.getElementById("mobileMenu");
    mobileMenu.classList.toggle("hidden");
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
    const mobileMenu = document.getElementById("mobileMenu");
    mobileMenu.classList.add("hidden");
  };
  const handleSignOut = () => {
    signOut();
    closeMenu();
  };
  useEffect(() => {
    const fetchProviders = async () => {
      const resp = await getProviders();
      setProviders(resp);
    };
    fetchProviders();
  }, []);

  return (
    <nav className=" w-full mb-16 p-8 bg-teal-600">
      <div className="flex-between relative">
        <div>
          <Link href={"/"} className="flex justify-start gap-4 flex-center">
            <Image
              src="/assets/images/logo.svg"
              alt="logo"
              width={28}
              height={28}
              className="object-contain"
            />
            <h2 className="bg-gradient-to-r from-orange-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
              Prompt Quest
            </h2>
          </Link>
        </div>
        <div className="sm:flex hidden">
          {session?.user ? (
            <div className="flex gap-3">
              <div>
                <Link href={"/create-prompt"} className="black_btn">
                  Create Post
                </Link>
              </div>
              <button className="outline_btn" onClick={signOut}>
                Sign Out
              </button>
              <div>
                <Link
                  href={"/profile"}
                  className="flex justify-start gap-4 flex-center"
                >
                  <Image
                    src={session?.user.image}
                    alt="logo"
                    width={28}
                    height={28}
                    className=" rounded-full object-contain "
                  />
                </Link>
              </div>
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="black_btn_1"
                  >
                    Sign In
                  </button>
                ))}
            </>
          )}
        </div>
        <button
          id="hamburgerBtn"
          className={`block hamburger sm:hidden focus:outline-none ${
            isMenuOpen ? "openMenu" : ""
          }`}
          onClick={toggleMenu}
        >
          <span className="hamburger-top"></span>
          <span className="hamburger-middle"></span>
          <span className="hamburger-bottom"></span>
        </button>
      </div>
      <div className="sm:hidden">
        {session?.user ? (
          <div
            id="mobileMenu"
            className="mobile absolute top-0 left-0 w-full hidden  flex-col items-center self-end  py-8 mt-20 space-y-6 font-bold bg-black  drop-shadow-md min-h-screen transition-all duration-400 z-10 "
          >
            <div className="grid justify-center">
              <Link
                href={"/create-prompt"}
                className="black_btn_1"
                onClick={closeMenu}
              >
                Create Post
              </Link>
            </div>
            <button className="outline_btn_1 m-auto" onClick={handleSignOut}>
              Sign Out
            </button>
            <div className="grid justify-center">
              <Link
                href={"/profile"}
                className="black_btn_1"
                onClick={closeMenu}
              >
                My Profile
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div
              id="mobileMenu"
              className="mobile absolute top-0 left-0 w-full hidden  flex-col items-center self-end  py-8 mt-20 space-y-6 font-bold bg-black  drop-shadow-md min-h-screen transition-all duration-400"
            >
              <div className="grid justify-center">
                {providers &&
                  Object.values(providers).map((provider) => (
                    <button
                      type="button"
                      key={provider.name}
                      onClick={() => signIn(provider.signIn)}
                      className="black_btn_1"
                    >
                      Sign In
                    </button>
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
