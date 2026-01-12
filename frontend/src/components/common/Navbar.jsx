/* eslint-disable no-unused-vars */
import { setUser } from "@/redux/authslice";
import { AvatarImage } from "@radix-ui/react-avatar";
import axios from "axios";
import { Briefcase, Building2, Home, LayoutDashboard, LogOut, Menu, Search, User2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { USER_API_END_POINT } from "../../utils/constant";
import { Avatar } from "../ui/avatar";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

function Navbar() {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const studentLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Jobs", path: "/jobs", icon: Briefcase },
    { name: "Browse", path: "/browse", icon: Search },
  ];

  const recruiterLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Companies", path: "/recruiter/companies", icon: Building2 },
    { name: "Jobs", path: "/recruiter/jobs", icon: Briefcase },
  ];

  const navLinks = user?.role === "recruiter" ? recruiterLinks : studentLinks;

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg shadow-purple-500/5"
          : "bg-white dark:bg-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-shadow duration-300">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 15 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.491027 5.74153C1.14573 5.12319 2.20721 5.1232 2.86191 5.74153L14.0384 16.2971C14.6931 16.9154 14.6931 17.9179 14.0384 18.5363C13.3837 19.1546 12.3222 19.1546 11.6675 18.5363L0.491027 7.9807C-0.163676 7.36237 -0.163676 6.35985 0.491027 5.74153Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.45464e-07 1.58333C1.45464e-07 0.708882 0.750582 0 1.67647 0H12.8529C13.7788 0 14.5294 0.708882 14.5294 1.58333C14.5294 2.45778 13.7788 3.16667 12.8529 3.16667H1.67647C0.750582 3.16667 1.45464e-07 2.45778 1.45464e-07 1.58333Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.35294 8.44444L3.35294 17.4167C3.35294 18.2911 2.60236 19 1.67647 19C0.750583 19 1.04529e-06 18.2911 1.00482e-06 17.4167L1.1658e-07 6.86111C9.71445e-08 6.44119 0.176628 6.03846 0.491027 5.74153C0.805426 5.44459 1.23184 5.27778 1.67647 5.27778L12.8529 5.27778C13.7788 5.27778 14.5294 5.98666 14.5294 6.86111C14.5294 7.73556 13.7788 8.44444 12.8529 8.44444L3.35294 8.44444Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
            <span className="text-2xl font-bold">
              <span className="gradient-text">Job</span>
              <span className="text-gray-800 dark:text-white">Nexus</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.name}
                  {link.name === "Jobs" && (
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>

            {/* Authentication Section */}
            {!user ? (
              <div className="hidden md:flex items-center gap-3">
                <Link to="/login">
                  <Button
                    variant="ghost"
                    className="text-gray-600 hover:text-purple-600 hover:bg-purple-50"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="gradient-bg text-white border-0 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
                    Get Started
                  </Button>
                </Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <button className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
                    <Avatar className="relative cursor-pointer ring-2 ring-purple-200 dark:ring-purple-800 transition-all duration-300 group-hover:ring-purple-400">
                      <AvatarImage
                        src={
                          user?.profile?.profilePhoto
                            ? user.profile.profilePhoto
                            : `https://ui-avatars.com/api/?name=${user?.fullname}&background=8B5CF6&color=fff`
                        }
                        alt="User Avatar"
                        className="object-cover"
                      />
                    </Avatar>
                  </button>
                </PopoverTrigger>

                <PopoverContent className="w-72 p-0 shadow-xl shadow-purple-500/10 border-purple-100 dark:border-purple-900">
                  <div className="p-4 gradient-bg rounded-t-lg">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12 ring-2 ring-white/30">
                        <AvatarImage
                          src={
                            user?.profile?.profilePhoto
                              ? user.profile.profilePhoto
                              : `https://ui-avatars.com/api/?name=${user?.fullname}&background=8B5CF6&color=fff`
                          }
                          alt="User Avatar"
                          className="object-cover"
                        />
                      </Avatar>
                      <div className="text-white">
                        <h3 className="font-semibold">{user?.fullname || "User"}</h3>
                        <p className="text-sm text-purple-200 capitalize">
                          {user?.role}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                    >
                      <User2 className="w-4 h-4" />
                      <span>View Profile</span>
                    </Link>
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      <span>Dashboard</span>
                    </Link>
                    <hr className="my-2 border-gray-200 dark:border-gray-700" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4 animate-slideDown">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive(link.path)
                        ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {link.name}
                  </Link>
                );
              })}
              {!user && (
                <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full gradient-bg text-white border-0">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
