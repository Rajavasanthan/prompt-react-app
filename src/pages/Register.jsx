import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom'; // Added Link
import { useState } from 'react';

const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
});

const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: RegisterSchema,
        onSubmit: async (values) => {
            setError(null);
            const result = await register(values.name, values.email, values.password);
            if (result.success) {
                // Redirect to login after successful registration
                navigate('/login');
            } else {
                setError(result.message || 'Registration failed');
            }
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]"> {/* Light cream background for premium feel */}
            <div className="w-full max-w-md p-8 md:p-12 bg-white rounded-2xl shadow-xl border border-gray-100">

                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black text-[#FF9D9D] mb-2 tracking-wide">PROMPTIFY</h1>
                    <p className="text-gray-500 font-serif italic">Create your account</p>
                </div>

                {/* Form */}
                <form onSubmit={formik.handleSubmit} className="space-y-6">

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            className={`w-full bg-[#CDE8E3]/30 text-gray-700 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-[#7CA9A0]/50 transition-all ${formik.errors.name && formik.touched.name ? 'border-red-500 ring-1 ring-red-500' : ''
                                }`}
                            placeholder="Your Name"
                        />
                        {formik.errors.name && formik.touched.name && (
                            <p className="text-red-500 text-xs mt-1 ml-1">{formik.errors.name}</p>
                        )}
                    </div>

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
                        {formik.isSubmitting ? 'Creating account...' : 'Register'}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-gray-400">
                    <p>Already have an account? <Link to="/login" className="text-[#FF9D9D] cursor-pointer hover:underline">Login here</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;
