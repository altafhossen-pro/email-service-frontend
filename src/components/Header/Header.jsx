'use client';

import { clearUser } from "@/features/user/userSlice";
import { deleteCookie } from "cookies-next";
import { Mail, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
    const dispatch = useDispatch();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, loading } = useSelector((state) => state.auth);

    const handleLogOut = () => {
        deleteCookie('token');
        deleteCookie('user');
        setIsMenuOpen(false);
        dispatch(clearUser());
        // setProfileDropdownOpen(false);
        toast.success('লগ আউট সফল হয়েছে।');
    }

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <Link href={`/`} className="flex items-center space-x-2">
                        <div className="bg-blue-600 p-2 rounded-lg">
                            <Mail className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold text-gray-900">EmailPro</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">

                        <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</Link>
                        <Link href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</Link>
                        <Link href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">Pricing</Link>
                        <Link href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">About</Link>
                        <Link href={`/docs`} className="text-gray-600 hover:text-blue-600 transition-colors">Docs</Link>
                        <Link href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</Link>
                    </nav>

                    {/* CTA Buttons */}
                    {
                        user?.email ? (
                            <div className="hidden md:flex items-center space-x-4">
                                <Link href={`/dashboard`} className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Dashboard
                                </Link>
                                <button onClick={handleLogOut} className="bg-red-500 text-white px-4 py-1 rounded transition-colors">
                                    Logout
                                </button>
                            </div>
                        ) : <div className="hidden md:flex items-center space-x-4">
                            <Link href={`/login`} className="text-gray-600 hover:text-blue-600 transition-colors">Login</Link>
                            <Link href={`/register`} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                Get Started
                            </Link>
                        </div>
                    }


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
                            {
                                user?.email ? (
                                    <div className="flex flex-col space-y-2">
                                        <Link href={`/dashboard`} className="text-gray-600 hover:text-blue-600 transition-colors">
                                            Dashboard
                                        </Link>
                                        <Link href={`/logout`} className="bg-red-500 text-white px-4 py-1 rounded transition-colors">
                                            Logout
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="flex flex-col space-y-2">
                                        <Link href={`/login`} className="text-gray-600 hover:text-blue-600 transition-colors">Login</Link>
                                        <Link href={`/register`} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                            Get Started
                                        </Link>
                                    </div>
                                )
                            }
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};
export default Header;