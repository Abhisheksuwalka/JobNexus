import { setSearchedQuery } from "@/redux/jobSlice";
import { AnimatePresence, motion } from "framer-motion";
import {
    Briefcase,
    Building2,
    ChevronDown,
    ChevronUp,
    DollarSign,
    Filter,
    X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";

const filterData = [
  {
    filterType: "Companies",
    icon: Building2,
    array: ["Paytm", "Swiggy", "Uber", "Microsoft", "Apple"],
  },
  {
    filterType: "Industry",
    icon: Briefcase,
    array: [
      "Frontend Developer",
      "Backend Developer",
      "FullStack Developer",
      "Digital Analyst",
      "Cyber Analyst",
    ],
  },
  {
    filterType: "Salary",
    icon: DollarSign,
    array: ["20LPA", "40LPA", "60LPA", "80LPA", "100LPA"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [expandedSections, setExpandedSections] = useState(
    filterData.reduce((acc, data) => ({ ...acc, [data.filterType]: true }), {})
  );
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  const clearFilter = () => {
    setSelectedValue("");
  };

  const toggleSection = (filterType) => {
    setExpandedSections((prev) => ({
      ...prev,
      [filterType]: !prev[filterType],
    }));
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-card p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
            <Filter className="w-4 h-4 text-white" />
          </div>
          <h2 className="font-bold text-lg text-gray-900 dark:text-white">
            Filters
          </h2>
        </div>
        {selectedValue && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilter}
            className="text-gray-500 hover:text-red-500 text-sm"
          >
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {/* Selected Filter Badge */}
      {selectedValue && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800"
        >
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            Active Filter
          </p>
          <div className="flex items-center justify-between">
            <span className="text-purple-700 dark:text-purple-300 font-medium">
              {selectedValue}
            </span>
            <button
              onClick={clearFilter}
              className="text-purple-500 hover:text-purple-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}

      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => {
          const Icon = data.icon;
          const isExpanded = expandedSections[data.filterType];

          return (
            <div key={index} className="mb-4 last:mb-0">
              {/* Section Header */}
              <button
                onClick={() => toggleSection(data.filterType)}
                className="w-full flex items-center justify-between py-2 group"
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {data.filterType}
                  </h3>
                  <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                    {data.array.length}
                  </span>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                )}
              </button>

              {/* Section Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="py-2 space-y-1">
                      {data.array.map((item, idx) => {
                        const itemId = `id${index}-${idx}`;
                        const isSelected = selectedValue === item;

                        return (
                          <label
                            key={idx}
                            htmlFor={itemId}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 ${
                              isSelected
                                ? "bg-purple-100 dark:bg-purple-900/30"
                                : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
                            }`}
                          >
                            <RadioGroupItem
                              value={item}
                              id={itemId}
                              className="border-gray-300 dark:border-gray-600 text-purple-600 focus:ring-purple-500"
                            />
                            <Label
                              htmlFor={itemId}
                              className={`cursor-pointer text-sm ${
                                isSelected
                                  ? "text-purple-700 dark:text-purple-300 font-medium"
                                  : "text-gray-700 dark:text-gray-300"
                              }`}
                            >
                              {item}
                            </Label>
                          </label>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {index < filterData.length - 1 && (
                <div className="border-b border-gray-100 dark:border-gray-700 mt-2"></div>
              )}
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;