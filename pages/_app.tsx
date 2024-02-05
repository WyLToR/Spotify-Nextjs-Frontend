"use client"
import "@/styles/globals.css";
import "@/styles/player.css"
import type {AppProps} from "next/app";
import {useState} from "react";
import AuthProvider from "@/src/contexts/AuthContext";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import {ReactQueryProvider} from "@/components/utils/ReactQueryProvider";
import PlayerProvider from "@/src/contexts/PlayerContext";

export default function App({Component, pageProps}: AppProps) {
    const [loginModal, setLoginModal] = useState(false);
    const [registerModal, setRegisterModal] = useState(false);
    return (
        <ReactQueryProvider>
            <AuthProvider>
                <PlayerProvider>
                    <Navbar
                        log={{loginModal, setLoginModal}}
                        reg={{registerModal, setRegisterModal}}
                    />
                    <div className="pt-20 pb-20">
                        <Component {...pageProps} />
                    </div>
                    <Footer/>
                </PlayerProvider>
            </AuthProvider>
        </ReactQueryProvider>
    );
}
