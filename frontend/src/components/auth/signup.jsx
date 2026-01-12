import { setLoading } from "@/redux/authSlice";
import axios from "axios";
import { motion } from "framer-motion";
import {
    Briefcase,
    Building2,
    CheckCircle2,
    ChevronRight,
    Loader2,
    Lock,
    Mail,
    Phone,
    Sparkles,
    TrendingUp,
    Upload,
    User,
    Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { USER_API_END_POINT } from "../../utils/constant";
import Navbar from "../common/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    if (!input.fullname.trim()) {
      errors.fullname = "Full name is required.";
    }

    if (!input.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(input.email)) {
      errors.email = "Enter a valid email address.";
    }

    if (!input.phoneNumber) {
      errors.phoneNumber = "Phone number is required.";
    } else if (!/^\d{10}$/.test(input.phoneNumber)) {
      errors.phoneNumber = "Enter a valid 10-digit phone number.";
    }

    if (!input.password.trim()) {
      errors.password = "Password is required.";
    } else if (input.password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
    }

    if (!input.role) {
      errors.role = "Please select a role.";
    }

    if (input.file && !["image/jpeg", "image/png", "image/jpg"].includes(input.file.type)) {
      errors.file = "Profile picture must be a JPEG or PNG file.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    setErrors({ ...errors, [name]: "" });

    if (name === "password") {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
    if (file) {
      setErrors({ ...errors, file: "" });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Something went wrong.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const getStrengthColor = () => {
    if (passwordStrength <= 1) return "bg-red-500";
    if (passwordStrength <= 2) return "bg-orange-500";
    if (passwordStrength <= 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthText = () => {
    if (passwordStrength <= 1) return "Weak";
    if (passwordStrength <= 2) return "Fair";
    if (passwordStrength <= 3) return "Good";
    return "Strong";
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* Left Side - Illustration */}
        <div className="hidden lg:flex lg:w-1/2 gradient-bg relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
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
                <span className="text-sm font-medium uppercase tracking-wider">
                  Join JobNexus
                </span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Start Your <br />
                Career Journey
              </h1>
              <p className="text-lg text-white/80 mb-12 max-w-md">
                Create your account and get access to thousands of job
                opportunities from top companies.
              </p>

              {/* Benefits */}
              <div className="space-y-4">
                {[
                  { icon: Briefcase, text: "Access to 10,000+ job listings" },
                  { icon: TrendingUp, text: "AI-powered job recommendations" },
                  { icon: Building2, text: "Direct connect with recruiters" },
                  { icon: CheckCircle2, text: "Free forever for job seekers" },
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
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 overflow-y-auto">
          <motion.div
            className="w-full max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Create Account
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Fill in your details to get started
              </p>
            </div>

            <form onSubmit={submitHandler} className="space-y-5">
              {/* Full Name */}
              <div className="space-y-2">
                <Label className="text-gray-700 dark:text-gray-300">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    value={input.fullname}
                    name="fullname"
                    onChange={changeEventHandler}
                    placeholder="John Doe"
                    className="pl-10 h-12 border-gray-200 dark:border-gray-700 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                {errors.fullname && (
                  <p className="text-red-500 text-sm">{errors.fullname}</p>
                )}
              </div>

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

              {/* Phone Number */}
              <div className="space-y-2">
                <Label className="text-gray-700 dark:text-gray-300">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="tel"
                    value={input.phoneNumber}
                    name="phoneNumber"
                    onChange={changeEventHandler}
                    placeholder="1234567890"
                    className="pl-10 h-12 border-gray-200 dark:border-gray-700 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
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
                {input.password && (
                  <div className="space-y-1">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded-full ${
                            level <= passwordStrength
                              ? getStrengthColor()
                              : "bg-gray-200 dark:bg-gray-700"
                          }`}
                        />
                      ))}
                    </div>
                    <p className={`text-xs ${getStrengthColor().replace("bg-", "text-")}`}>
                      Password strength: {getStrengthText()}
                    </p>
                  </div>
                )}
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
                        <Users
                          className={`w-5 h-5 ${
                            input.role === role ? "text-purple-600" : "text-gray-400"
                          }`}
                        />
                      ) : (
                        <Building2
                          className={`w-5 h-5 ${
                            input.role === role ? "text-purple-600" : "text-gray-400"
                          }`}
                        />
                      )}
                      <span
                        className={`font-medium capitalize ${
                          input.role === role
                            ? "text-purple-600"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {role === "student" ? "Job Seeker" : "Recruiter"}
                      </span>
                      {input.role === role && (
                        <motion.div
                          className="absolute top-2 right-2"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <div className="w-5 h-5 rounded-full gradient-bg flex items-center justify-center">
                            <CheckCircle2 className="w-3 h-3 text-white" />
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

              {/* Profile Picture */}
              <div className="space-y-2">
                <Label className="text-gray-700 dark:text-gray-300">
                  Profile Picture (Optional)
                </Label>
                <div className="relative">
                  <label className="flex items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700 cursor-pointer transition-colors">
                    <Upload className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">
                      {input.file ? input.file.name : "Click to upload image"}
                    </span>
                    <Input
                      accept="image/*"
                      type="file"
                      onChange={changeFileHandler}
                      className="sr-only"
                    />
                  </label>
                </div>
                {errors.file && (
                  <p className="text-red-500 text-sm">{errors.file}</p>
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
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <p className="text-center mt-8 text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Sign in
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
