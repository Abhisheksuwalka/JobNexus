import { ArrowRight, Briefcase } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import JobCard from "./LatestJobcard";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <section className="py-12 lg:py-16 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Latest Job Openings
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Explore the newest opportunities from top companies
            </p>
          </div>
          <Link
            to="/jobs"
            className="hidden sm:flex items-center gap-1 text-primary hover:underline font-medium"
          >
            View all jobs
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Jobs Grid */}
        {allJobs.length <= 0 ? (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <Briefcase className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              No jobs available yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Check back soon for new opportunities
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {allJobs?.slice(0, 6).map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
            {/* Mobile View All Link */}
            <div className="mt-6 text-center sm:hidden">
              <Link
                to="/jobs"
                className="inline-flex items-center gap-1 text-primary font-medium"
              >
                View all jobs
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default LatestJobs;
