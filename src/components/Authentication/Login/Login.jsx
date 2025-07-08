'use client';
import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Gamepad2, Users, Trophy, Zap } from 'lucide-react';
import toast from 'react-hot-toast';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { setUser } from '@/features/user/userSlice';

export default function LoginPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/login`;
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
                .then(response => {

                    return response.json();
                })
                .then(data => {
                    setIsLoading(false);
                    if (data.success) {
                        if (data?.data?.token) {
                            toast.success('Successfully logged in!');
                            setCookie('token', data?.data?.token, {
                                maxAge: 60 * 60 * 24 * 365,
                                path: '/',
                            });
                            dispatch(setUser(data?.data?.user));
                            // console.log(data?.data?.user);
                            router.push('/dashboard');
                        }
                    } else {
                        toast.error(data.message || 'Failed to create account');
                    }
                })
                .catch(error => {
                    setIsLoading(false);
                    toast.error('An error occurred: ' + error.message);
                });
        } catch (error) {
            setIsLoading(false);
            toast.error('An error occurred: ' + error.message);
        }
        finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
            {/* Background Pattern */}


            <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center relative z-10">
                {/* Left Side - Welcome Section */}
                <div className="hidden lg:block space-y-8 text-white">
                    <div className="space-y-4">
                        <Link href={`/`} className="flex items-center space-x-3">
                            <div className="bg-gradient-to-r from-slate-200 to-slate-500 p-2 rounded-lg">
                                <img className="h-8 w-8 text-white" src="/images/logo-transparent.png" alt="" />
                                {/* <Gamepad2 className="h-8 w-8 text-white" /> */}
                            </div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                EmailPro
                            </h1>
                        </Link>

                        <p className="text-xl text-slate-300 leading-relaxed">
                            Join to the email service platform that provides secure, reliable, and fast email service for everyone.
                        </p>
                    </div>

                    {/* Features */}
                    {/* <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                            <div className="p-2 bg-purple-500/20 rounded-lg">
                                <Users className="w-6 h-6 text-purple-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Team Tournaments</h3>
                                <p className="text-slate-400">Solo, Duo, Squad & Squad6 tournaments available</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="p-2 bg-pink-500/20 rounded-lg">
                                <Trophy className="w-6 h-6 text-pink-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Win Prizes</h3>
                                <p className="text-slate-400">Exciting cash prizes and rewards for winners</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="p-2 bg-blue-500/20 rounded-lg">
                                <Zap className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Live Tournaments</h3>
                                <p className="text-slate-400">Real-time tournaments with instant results</p>
                            </div>
                        </div>
                    </div> */}


                </div>

                {/* Right Side - Login Form */}
                <div className="w-full max-w-md mx-auto">
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20">
                        {/* Mobile Header */}
                        <div className="lg:hidden text-center mb-8">
                            <div className="flex items-center justify-center space-x-3 mb-4">
                                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                                    <Gamepad2 className="w-6 h-6 text-white" />
                                </div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    TournaPlex
                                </h1>
                            </div>
                        </div>

                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back!</h2>
                            <p className="text-slate-400">Sign in to continue your gaming journey</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email Field */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full pl-11 pr-12 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                        placeholder="Enter your password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center space-x-2 text-sm text-slate-300">
                                    <input type="checkbox" className="rounded border-white/20 bg-white/5 text-purple-500 focus:ring-purple-500" />
                                    <span>Remember me</span>
                                </label>
                                <Link href={`/forgot-password`} type="button" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                                    Forgot password?
                                </Link>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-2 border-t-white rounded-full animate-spin"></div>
                                        <span>Signing In...</span>
                                    </div>
                                ) : (
                                    'Sign In'
                                )}
                            </button>
                        </form>

                        {/* Sign Up Link */}
                        <div className="mt-8 text-center">
                            <p className="text-slate-400">
                                Don't have an account?{' '}
                                <Link href={`/register`} className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                                    Sign up here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}