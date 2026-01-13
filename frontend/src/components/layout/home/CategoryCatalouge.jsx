import { setSearchedQuery } from "@/redux/jobslice";
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
  { name: "Frontend Developer", icon: Code },
  { name: "Backend Developer", icon: Server },
  { name: "Data Science", icon: BarChart3 },
  { name: "UI/UX Designer", icon: Palette },
  { name: "Full Stack Developer", icon: Layers },
  { name: "Mobile Developer", icon: Smartphone },
  { name: "DevOps Engineer", icon: Cloud },
  { name: "Cybersecurity", icon: Shield },
  { name: "AI/ML Engineer", icon: Brain },
  { name: "Marketing", icon: Megaphone },
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Browse by Category
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Find jobs that match your expertise
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
          <CarouselContent className="-ml-3">
            {categories.map((cat, index) => {
              const Icon = cat.icon;
              return (
                <CarouselItem
                  key={index}
                  className="pl-3 basis-1/2 md:basis-1/3 lg:basis-1/5"
                >
                  <button
                    onClick={() => searchJobHandler(cat.name)}
                    className="w-full group"
                  >
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700 hover:border-primary/50 transition-all duration-200 card-hover text-center">
                      <div className="w-12 h-12 mx-auto rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                        {cat.name}
                      </h3>
                    </div>
                  </button>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <div className="flex items-center justify-center gap-2 mt-6">
            <CarouselPrevious className="static translate-x-0 translate-y-0" />
            <CarouselNext className="static translate-x-0 translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default CategoryCarousel;
