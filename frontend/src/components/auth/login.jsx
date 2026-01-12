/* eslint-disable react/no-unescaped-entities */
import { setLoading, setUser } from "@/redux/authslice";
import axios from "axios";
import { motion } from "framer-motion";
import { Briefcase, Building2, ChevronRight, Loader2, Lock, Mail, Sparkles, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { USER_API_END_POINT } from "../../utils/constant";
import Navbar from "../common/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = { email: "", password: "", role: "" };
    let isValid = true;

    if (!input.email) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(input.email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    if (!input.password) {
      newErrors.password = "Password is required.";
      isValid = false;
    }

    if (!input.role) {
      newErrors.role = "Please select a role.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);

        if (res.data.user.email === "admin@domain.com" || res.data.user.role === "admin") {
          navigate("/adminpanel");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      if (user.email === "tushar.r22@iiits.in" || user.role === "admin") {
        navigate("/adminpanel");
      } else {
        navigate("/");
      }
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* Left Side - Illustration */}
        <div className="hidden lg:flex lg:w-1/2 gradient-bg relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          {/* Decorative Elements */}
          <div className="absolute top-20 left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col justify-center px-12 lg:px-16 text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-6 h-6" />
                <span className="text-sm font-medium uppercase tracking-wider">Welcome Back</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Continue Your <br />Career Journey
              </h1>
              <p className="text-lg text-white/80 mb-12 max-w-md">
                Access your personalized dashboard and stay connected with the best opportunities.
              </p>
              
              {/* Features */}
              <div className="space-y-4">
                {[
                  { icon: Briefcase, text: "Track your applications" },
                  { icon: Building2, text: "Connect with top companies" },
                  { icon: Users, text: "Network with professionals" },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                      <feature.icon className="w-5 h-5" />
                    </div>
                    <span className="text-white/90">{feature.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <motion.div
            className="w-full max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Sign In
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Enter your credentials to access your account
              </p>
            </div>

            <form onSubmit={submitHandler} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <Label className="text-gray-700 dark:text-gray-300">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="email"
                    value={input.email}
                    name="email"
                    onChange={changeEventHandler}
                    placeholder="you@example.com"
                    className="pl-10 h-12 border-gray-200 dark:border-gray-700 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label className="text-gray-700 dark:text-gray-300">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="password"
                    value={input.password}
                    name="password"
                    onChange={changeEventHandler}
                    placeholder="••••••••"
                    className="pl-10 h-12 border-gray-200 dark:border-gray-700 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>

              {/* Role Selection */}
              <div className="space-y-2">
                <Label className="text-gray-700 dark:text-gray-300">I am a</Label>
                <div className="grid grid-cols-2 gap-4">
                  {["student", "recruiter"].map((role) => (
                    <label
                      key={role}
                      className={`relative flex items-center justify-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        input.role === role
                          ? "border-purple-600 bg-purple-50 dark:bg-purple-900/20"
                          : "border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700"
                      }`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={role}
                        checked={input.role === role}
                        onChange={changeEventHandler}
                        className="sr-only"
                      />
                      {role === "student" ? (
                        <Users className={`w-5 h-5 ${input.role === role ? "text-purple-600" : "text-gray-400"}`} />
                      ) : (
                        <Building2 className={`w-5 h-5 ${input.role === role ? "text-purple-600" : "text-gray-400"}`} />
                      )}
                      <span className={`font-medium capitalize ${input.role === role ? "text-purple-600" : "text-gray-700 dark:text-gray-300"}`}>
                        {role === "student" ? "Job Seeker" : "Recruiter"}
                      </span>
                      {input.role === role && (
                        <motion.div
                          className="absolute top-2 right-2"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <div className="w-5 h-5 rounded-full gradient-bg flex items-center justify-center">
                            <ChevronRight className="w-3 h-3 text-white" />
                          </div>
                        </motion.div>
                      )}
                    </label>
                  ))}
                </div>
                {errors.role && (
                  <p className="text-red-500 text-sm">{errors.role}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 gradient-bg text-white border-0 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <p className="text-center mt-8 text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <Link to="/signup" className="text-purple-600 hover:text-purple-700 font-medium">
                Create one
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
