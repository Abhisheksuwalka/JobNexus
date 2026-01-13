import { motion } from "framer-motion";
import { Briefcase, ChevronLeft, ChevronRight, Search, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../common/Navbar";
import Filterjobs from "../layout/jobs/Filterjobs";
import Job from "../layout/jobs/Jobcard";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const JOBS_PER_PAGE = 20;

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  const [localSearch, setLocalSearch] = useState("");
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const query = searchedQuery || localSearch;
    if (query) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title?.toLowerCase().includes(query.toLowerCase()) ||
          job.description?.toLowerCase().includes(query.toLowerCase()) ||
          job.location?.toLowerCase().includes(query.toLowerCase()) ||
          job.company?.name?.toLowerCase().includes(query.toLowerCase()) ||
          job.skills?.some(skill => skill.toLowerCase().includes(query.toLowerCase()))
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
    setCurrentPage(1); // Reset to page 1 when filters change
  }, [allJobs, searchedQuery, localSearch]);

  // Pagination calculations
  const totalPages = Math.ceil(filterJobs.length / JOBS_PER_PAGE);
  const paginatedJobs = filterJobs.slice(
    (currentPage - 1) * JOBS_PER_PAGE,
    currentPage * JOBS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Browse <span className="gradient-text">Jobs</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {filterJobs.length} opportunities available
              </p>
            </div>

            {/* Search Bar */}
            <div className="flex items-center gap-3 flex-1 max-w-md">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search jobs..."
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  className="pl-10 h-11 border-gray-200 dark:border-gray-700 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              <Button
                variant="outline"
                className="md:hidden h-11 px-3 border-gray-200 dark:border-gray-700"
                onClick={() => setShowMobileFilter(!showMobileFilter)}
              >
                <SlidersHorizontal className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Filter Sidebar - Desktop */}
          <div className="hidden md:block w-72 flex-shrink-0">
            <div className="sticky top-24">
              <Filterjobs />
            </div>
          </div>

          {/* Mobile Filter Overlay */}
          {showMobileFilter && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 md:hidden"
            >
              <div
                className="absolute inset-0 bg-black/50"
                onClick={() => setShowMobileFilter(false)}
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                className="absolute left-0 top-0 bottom-0 w-80 bg-white dark:bg-gray-800 p-4 overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    Filters
                  </h2>
                  <button
                    onClick={() => setShowMobileFilter(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                <Filterjobs />
              </motion.div>
            </motion.div>
          )}

          {/* Jobs Grid */}
          <div className="flex-1">
            {filterJobs.length <= 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="w-20 h-20 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-10 h-10 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No jobs found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                  {searchedQuery || localSearch
                    ? "Try adjusting your search or filter criteria"
                    : "Check back soon for new opportunities!"}
                </p>
                {(searchedQuery || localSearch) && (
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => setLocalSearch("")}
                  >
                    Clear Search
                  </Button>
                )}
              </motion.div>
            ) : (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {paginatedJobs.map((job, index) => (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: Math.min(index, 10) * 0.05 }}
                      key={job?._id}
                    >
                      <Job job={job} />
                    </motion.div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex flex-col items-center gap-4 mt-8">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="flex items-center gap-1"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                      </Button>
                      
                      <div className="flex items-center gap-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }
                          
                          return (
                            <Button
                              key={pageNum}
                              variant={currentPage === pageNum ? "default" : "outline"}
                              size="sm"
                              onClick={() => setCurrentPage(pageNum)}
                              className={`w-10 ${currentPage === pageNum ? 'bg-purple-600 hover:bg-purple-700' : ''}`}
                            >
                              {pageNum}
                            </Button>
                          );
                        })}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="flex items-center gap-1"
                      >
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Showing {(currentPage - 1) * JOBS_PER_PAGE + 1} - {Math.min(currentPage * JOBS_PER_PAGE, filterJobs.length)} of {filterJobs.length} jobs
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
