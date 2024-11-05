// contexts/WalletContext.js
import React, { createContext, useState, useEffect } from 'react';
import { PeraWalletConnect } from '@perawallet/connect';

const peraWallet = new PeraWalletConnect();

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [walletAddress, setWalletAddress] = useState("");

    useEffect(() => {
        const savedAddress = localStorage.getItem('walletAddress');
        if (savedAddress) {
            setWalletAddress(savedAddress);
            setIsAuthenticated(true);
        }
    }, []);

    const connectWallet = async () => {
        try {
            const newAccounts = await peraWallet.connect();
            peraWallet.connector?.on("disconnect", disconnectWallet);
            setWalletAddress(newAccounts[0]);
            setIsAuthenticated(true);
            localStorage.setItem('walletAddress', newAccounts[0]);
        } catch (err) {
            console.error('Failed to connect to wallet', err);
        }
    };

    const disconnectWallet = () => {
        peraWallet.disconnect();
        setIsAuthenticated(false);
        setWalletAddress("");
        localStorage.removeItem('walletAddress');
    };

    return (
        <WalletContext.Provider value={{ isAuthenticated, walletAddress, connectWallet, disconnectWallet }}>
            {children}
        </WalletContext.Provider>
    );
};
