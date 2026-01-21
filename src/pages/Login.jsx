import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
});

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const [error, setError] = useState(null);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: LoginSchema,
        onSubmit: async (values) => {
            setError(null);
            const result = await login(values.email, values.password);
            if (result.success) {
                navigate(from, { replace: true });
            } else {
                setError(result.message || 'Login failed');
            }
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]"> {/* Light cream background for premium feel */}
            <div className="w-full max-w-md p-8 md:p-12 bg-white rounded-2xl shadow-xl border border-gray-100">

                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black text-[#FF9D9D] mb-2 tracking-wide">PROMPTIFY</h1>
                    <p className="text-gray-500 font-serif italic">Welcome back!</p>
                </div>

                {/* Form */}
                <form onSubmit={formik.handleSubmit} className="space-y-6">

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            className={`w-full bg-[#CDE8E3]/30 text-gray-700 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#7CA9A0]/50 transition-all ${formik.errors.email && formik.touched.email ? 'border-red-500 ring-1 ring-red-500' : ''
                                }`}
                            placeholder="you@example.com"
                        />
                        {formik.errors.email && formik.touched.email && (
                            <p className="text-red-500 text-xs mt-1 ml-1">{formik.errors.email}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            className={`w-full bg-[#CDE8E3]/30 text-gray-700 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#7CA9A0]/50 transition-all ${formik.errors.password && formik.touched.password ? 'border-red-500 ring-1 ring-red-500' : ''
                                }`}
                            placeholder="••••••••"
                        />
                        {formik.errors.password && formik.touched.password && (
                            <p className="text-red-500 text-xs mt-1 ml-1">{formik.errors.password}</p>
                        )}
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
                            {error}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={formik.isSubmitting}
                        className="w-full bg-[#7CA9A0] hover:bg-[#6b968d] text-white font-bold py-4 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {formik.isSubmitting ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-gray-400">
                    <p>Don't have an account? <span className="text-[#FF9D9D] cursor-pointer hover:underline">Contact Admin</span></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
