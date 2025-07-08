'use client';

import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, Phone, User, Gamepad2, Users, Trophy, Shield, Star, Target, ArrowRight, ArrowLeft, Check, MailOpen, ShieldCheck, BadgeDollarSign, LayoutTemplate } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { setCookie } from 'cookies-next';
import { useRouter, useSearchParams } from 'next/navigation';
import { setUser } from '@/features/user/userSlice';
import { useDispatch } from 'react-redux';

export default function SignupPage() {
    const router = useRouter();
    const [emailError, setEmailError] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        otp: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const searchParams = useSearchParams();
    const referCode = searchParams.get('referCode') || '';
    const dispatch = useDispatch();
    // console.log({ referCode });
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

        // Email field এর জন্য real-time validation
        if (name === 'email') {
            if (value === '') {
                setEmailError('');
                setIsEmailValid(false);
            } else if (!validateEmail(value)) {
                setEmailError('Please enter a valid email address');
                setIsEmailValid(false);
            } else {
                setEmailError('');
                setIsEmailValid(true);
            }
        }
    };


    // Step 1: Send OTP to email
    const handleSendOTP = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Simulate API call to send OTP
            const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/otp/send-otp`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: formData.email })
            });

            const data = await response.json();

            if (data.success) {
                // Show success message
                toast.success('OTP sent to your email successfully!');
                setCurrentStep(2);
            } else {
                toast.error(data.message || 'Failed to send OTP');
            }
        } catch (error) {
            toast.error('Error sending OTP: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Step 2: Verify OTP
    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/otp/verify-otp`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: formData.email,
                    otp: formData.otp
                })
            });

            const data = await response.json();

            if (data.success) {
                toast.success('Email verified successfully!');
                setCurrentStep(3);
            } else {
                toast.error(data.message || 'Invalid OTP');
            }
        } catch (error) {
            toast.error('Error verifying OTP: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Step 3: Complete signup
    const handleCompleteSignup = async (e) => {
        e.preventDefault();
        if (!acceptTerms) {
            toast.error('Please accept the terms and conditions');
            return;
        }

        setIsLoading(true);

        try {
            const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/register`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                })
            });

            const data = await response.json();
            console.log(data);
            const statusCode = response.status;

            if (statusCode === 201) {
                toast.success('Account created successfully!');
                // Set cookie and redirect to dashboard
                setCookie('token', data?.data?.token, {
                    maxAge: 60 * 60 * 24 * 365,
                    path: '/',
                });
                dispatch(setUser(data?.data?.user));
                router.push('/dashboard');
            }
            else if(statusCode === 409) {
                toast.error('Email already exists. Please use a different email.');
            }
            else if (statusCode === 400) {
                toast.error('Invalid input. Please check your details.');
            }
            else if (statusCode === 500) {
                toast.error('Server error. Please try again later.');
            }

            else {
                toast.error(data.message || 'Failed to create account');
            }
            
        } catch (error) {
            console.log(error);
            toast.error('Error creating account: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Resend OTP
    const handleResendOTP = async () => {
        setIsLoading(true);
        try {
            const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/send-otp`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: formData.email })
            });

            const data = await response.json();

            if (data.success) {
                toast.success('OTP resent successfully!');
            } else {
                toast.error(data.message || 'Failed to resend OTP');
            }
        } catch (error) {
            toast.error('Error resending OTP: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const renderStepIndicator = () => (
        <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
                {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${currentStep >= step
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                            : 'bg-white/10 text-slate-400 border border-white/20'
                            }`}>
                            {currentStep > step ? <Check className="w-5 h-5" /> : step}
                        </div>
                        {step < 3 && (
                            <div className={`w-8 h-0.5 mx-2 ${currentStep > step ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-white/20'
                                }`} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

    const renderStep1 = () => (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Enter Your Email</h2>
                <p className="text-slate-400">We'll send you a verification code</p>
            </div>

            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full pl-11 pr-4 py-3 bg-white/5 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${emailError ? 'border-red-500 focus:ring-red-500' : 'border-white/20 focus:ring-purple-500'
                                }`}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    {emailError && (
                        <p className="text-red-400 text-sm mt-1 flex items-center">
                            <span className="w-4 h-4 mr-1">⚠️</span>
                            {emailError}
                        </p>
                    )}
                </div>

                <button
                    onClick={handleSendOTP}
                    disabled={isLoading || !formData.email || !isEmailValid}
                    className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2"
                >
                    {isLoading ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-2 border-t-white rounded-full animate-spin"></div>
                            <span>Sending OTP...</span>
                        </>
                    ) : (
                        <>
                            <span>Next</span>
                            <ArrowRight className="w-5 h-5" />
                        </>
                    )}
                </button>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Verify Your Email</h2>
                <p className="text-slate-400">Enter the 6-digit code sent to</p>
                <p className="text-purple-400 font-medium">{formData.email}</p>
            </div>
            <form onSubmit={handleVerifyOTP} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Verification Code</label>
                    <input
                        type="text"
                        name="otp"
                        value={formData.otp}
                        onChange={handleChange}
                        className="w-full py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-slate-400  focus:border-transparent focus:bg-white/10 px-4  disabled:opacity-50 disabled:cursor-not-allowed outline-none  focus:outline-none focus:ring-2  transition-all duration-200 text-center text-lg tracking-widest"
                        placeholder="000000"
                        maxLength={6}
                        required
                    />
                </div>

                <div className="flex space-x-3">
                    <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="flex-1 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Back</span>
                    </button>

                    <button
                        type="submit"
                        disabled={isLoading || !formData.otp}
                        className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-2 border-t-white rounded-full animate-spin"></div>
                                <span>Verifying...</span>
                            </>
                        ) : (
                            <>
                                <span>Verify</span>
                                <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </button>
                </div>

                <div className="text-center">
                    <button
                        type="button"
                        onClick={handleResendOTP}
                        disabled={isLoading}
                        className="text-sm text-slate-400 hover:text-purple-400 transition-colors disabled:opacity-50"
                    >
                        Didn't receive code? Resend OTP
                    </button>
                </div>
            </form>
        </div>
    );

    const renderStep3 = () => (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Complete Your Profile</h2>
                <p className="text-slate-400">Fill in your details to finish signup</p>
            </div>

            <form onSubmit={handleCompleteSignup} className="space-y-6">
                {/* name field  */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Name</label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                            placeholder="Enter your name"
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
                            placeholder="Create a strong password"
                            required
                            minLength={8}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Password must be at least 8 characters long</p>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start space-x-3">
                    <input
                        type="checkbox"
                        id="acceptTerms"
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                        className="mt-1 rounded border-white/20 bg-white/5 text-purple-500 focus:ring-purple-500"
                    />
                    <label htmlFor="acceptTerms" className="text-sm text-slate-300 leading-relaxed">
                        I agree to the{' '}
                        <button type="button" className="text-purple-400 hover:text-purple-300 underline">
                            Terms of Service
                        </button>
                        {' '}and{' '}
                        <button type="button" className="text-purple-400 hover:text-purple-300 underline">
                            Privacy Policy
                        </button>
                    </label>
                </div>

                <div className="flex space-x-3">
                    <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="flex-1 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Back</span>
                    </button>

                    <button
                        type="submit"
                        disabled={isLoading || !acceptTerms}
                        className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-2 border-t-white rounded-full animate-spin"></div>
                                <span>Creating Account...</span>
                            </>
                        ) : (
                            <>
                                <span>Create Account</span>
                                <Check className="w-5 h-5" />
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-800  to-purple-900 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center relative z-10">
                {/* Left Side - Welcome Section */}
                <div className="hidden lg:block space-y-8 text-white">
                    <div className="space-y-4">
                        <div className="inline-block">
                            <Link href={`/`} className='flex items-center space-x-3'>

                                <div className="bg-gradient-to-r from-slate-200 to-slate-500 p-2 rounded-lg">
                                    <img className="h-8 w-8 text-white" src="/images/logo-transparent.png" alt="" />
                                    {/* <Gamepad2 className="h-8 w-8 text-white" /> */}
                                </div>
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    EmailPro
                                </h1>
                            </Link>
                        </div>

                        <p className="text-xl text-slate-300 leading-relaxed">
                            Create your account and use our Email Service to manage your emails efficiently.
                        </p>
                    </div>

                    {/* Benefits */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-white mb-6">Why Join Us?</h3>

                        <div className="flex items-start space-x-4">
                            <div className="p-2 bg-green-500/20 rounded-lg">
                                <ShieldCheck className="w-6 h-6 text-green-400" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-lg">Secure Platform</h4>
                                <p className="text-slate-400">100% secure payments and data protection</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="p-2 bg-yellow-500/20 rounded-lg">
                                <BadgeDollarSign className="w-6 h-6 text-yellow-400" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-lg">Free Emails</h4>
                                <p className="text-slate-400">Free email sending</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="p-2 bg-pink-500/20 rounded-lg">
                                <LayoutTemplate className="w-6 h-6 text-pink-400" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-lg">Email Templetes</h4>
                                <p className="text-slate-400">Various types of email templetes </p>
                            </div>
                        </div>
                    </div>


                </div>

                {/* Right Side - Multi-Step Form */}
                <div className="w-full max-w-md mx-auto">
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20">
                        {/* Mobile Header */}
                        <div className="lg:hidden text-center mb-8">
                            <div className="flex items-center justify-center space-x-3 mb-4">
                                <div className="bg-gradient-to-r from-slate-200 to-slate-500 p-2 rounded-lg">
                                    <img className="h-8 w-8 text-white" src="/images/logo-transparent.png" alt="" />
                                    {/* <Gamepad2 className="h-8 w-8 text-white" /> */}
                                </div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                    TournaPlex
                                </h1>
                            </div>
                        </div>

                        {/* Step Indicator */}
                        {renderStepIndicator()}

                        {/* Render Current Step */}
                        {currentStep === 1 && renderStep1()}
                        {currentStep === 2 && renderStep2()}
                        {currentStep === 3 && renderStep3()}

                        {/* Sign In Link */}
                        <div className="mt-8 text-center">
                            <p className="text-slate-400">
                                Already have an account?{' '}
                                <Link href={`/login`} className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                                    Sign in here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


