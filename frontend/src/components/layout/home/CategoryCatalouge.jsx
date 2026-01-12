import { setSearchedQuery } from "@/redux/jobSlice";
import { motion } from "framer-motion";
import {
    BarChart3,
    Brain,
    Cloud,
    Code,
    Layers,
    Megaphone,
    Palette,
    Server,
    Shield,
    Smartphone,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../../ui/carousel";

const categories = [
  { name: "Frontend Developer", icon: Code, color: "from-blue-500 to-cyan-500" },
  { name: "Backend Developer", icon: Server, color: "from-green-500 to-emerald-500" },
  { name: "Data Science", icon: BarChart3, color: "from-purple-500 to-violet-500" },
  { name: "UI/UX Designer", icon: Palette, color: "from-pink-500 to-rose-500" },
  { name: "Full Stack Developer", icon: Layers, color: "from-orange-500 to-amber-500" },
  { name: "Mobile Developer", icon: Smartphone, color: "from-indigo-500 to-purple-500" },
  { name: "DevOps Engineer", icon: Cloud, color: "from-teal-500 to-cyan-500" },
  { name: "Cybersecurity", icon: Shield, color: "from-red-500 to-orange-500" },
  { name: "AI/ML Engineer", icon: Brain, color: "from-violet-500 to-purple-500" },
  { name: "Marketing", icon: Megaphone, color: "from-yellow-500 to-orange-500" },
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Explore by <span className="gradient-text">Category</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Find your perfect role by browsing through our most popular job categories
          </p>
        </div>

        {/* Categories Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {categories.map((cat, index) => {
              const Icon = cat.icon;
              return (
                <CarouselItem
                  key={index}
                  className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/5"
                >
                  <motion.button
                    onClick={() => searchJobHandler(cat.name)}
                    className="w-full group"
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden">
                      {/* Gradient Background on Hover */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                      ></div>

                      {/* Icon */}
                      <div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </div>

                      {/* Category Name */}
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors text-sm">
                        {cat.name}
                      </h3>
                    </div>
                  </motion.button>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <div className="flex items-center justify-center gap-2 mt-8">
            <CarouselPrevious className="static translate-x-0 translate-y-0 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-700 hover:text-purple-600 dark:hover:text-purple-400" />
            <CarouselNext className="static translate-x-0 translate-y-0 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-700 hover:text-purple-600 dark:hover:text-purple-400" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default CategoryCarousel;
