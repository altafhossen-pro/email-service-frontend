'use client';

import { Mail, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <div className="bg-blue-600 p-2 rounded-lg">
                            <Mail className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold text-gray-900">EmailPro</span>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
                        <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">Pricing</a>
                        <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
                        <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
                    </nav>

                    {/* CTA Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link href={`/login`} className="text-gray-600 hover:text-blue-600 transition-colors">Login</Link>
                        <Link href={`/register`} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t">
                        <nav className="flex flex-col space-y-4">
                            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
                            <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">Pricing</a>
                            <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
                            <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
                            <hr className="my-4" />
                            <Link href={`/login`} className="text-gray-600 hover:text-blue-600 transition-colors text-left">Login</Link>
                            <Link href={`/register`} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full">
                                Get Started
                            </Link>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};
export default Header;