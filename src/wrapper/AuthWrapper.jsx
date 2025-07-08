"use client";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCookie, getCookie } from 'cookies-next';
import { setUser, setLoading, setError } from '@/features/user/userSlice';
import { useRouter } from 'next/navigation';
import { Loader } from 'lucide-react';

const AuthWrapper = ({ children }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { loading } = useSelector(state => state?.auth);

    useEffect(() => {
        const token = getCookie('token');

        const fetchUser = async (token) => {

            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await res.json();
                if (res.status === 401) {
                    deleteCookie('token');
                    dispatch(setError('Session expired. Please login again.'));
                    router.push('/login');
                    return;
                }
                if (res.status === 404) {
                    deleteCookie('token');
                    dispatch(setError('User not found. Please register.'));
                    router.push('/register');
                    return;
                }


                const user = data?.data;
                dispatch(setUser(user));
            } catch (error) {
                console.error('Failed to fetch user:', error);
                dispatch(setError('Network error or server not responding.'));
            }
        };

        if (token) {
            dispatch(setLoading(true));
            fetchUser(token);
        } else {
            dispatch(setLoading(false));
        }
    }, [dispatch]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-700 via-purple-900 to-slate-700 flex items-center justify-center">
                <div className="text-center">
                    <img className="w-20 mx-auto mb-0" src="/images/logo-transparent.png" alt="Logo" />
                    <h2 className="text-white text-2xl font-bold">Website Name</h2>

                    <svg className='w-16 mx-auto mt-2' fill="#fff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="4" cy="12" r="2"><animate id="spinner_qFRN" begin="0;spinner_OcgL.end+0.25s" attributeName="cy" calcMode="spline" dur="0.6s" values="12;6;12" keySplines=".33,.66,.66,1;.33,0,.66,.33" /></circle><circle cx="12" cy="12" r="2"><animate begin="spinner_qFRN.begin+0.1s" attributeName="cy" calcMode="spline" dur="0.6s" values="12;6;12" keySplines=".33,.66,.66,1;.33,0,.66,.33" /></circle><circle cx="20" cy="12" r="2"><animate id="spinner_OcgL" begin="spinner_qFRN.begin+0.2s" attributeName="cy" calcMode="spline" dur="0.6s" values="12;6;12" keySplines=".33,.66,.66,1;.33,0,.66,.33" /></circle></svg>
                </div>
            </div>

        );
    }

    return <>{children}</>;
};

export default AuthWrapper;