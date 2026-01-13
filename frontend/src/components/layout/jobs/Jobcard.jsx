/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { ArrowRight, Bookmark, Clock, DollarSign, MapPin, Users } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";

const Job = ({ job }) => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  const daysAgo = daysAgoFunction(job?.createdAt);

  return (
    <motion.div
      className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden"
      whileHover={{ y: -4 }}
    >


      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="h-12 w-12 ring-2 ring-purple-100 dark:ring-purple-900/50">
              <AvatarImage src={job?.company?.logo} className="object-cover" />
              <AvatarFallback className="bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 font-semibold text-sm">
                {job?.company?.name?.slice(0, 2).toUpperCase() || "CO"}
              </AvatarFallback>
            </Avatar>
            {daysAgo === 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></span>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
              {job?.company?.name}
            </h3>
            <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
              <MapPin className="w-3 h-3" />
              <span>{job?.location || "India"}</span>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full hover:bg-purple-50 dark:hover:bg-purple-900/20 text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
        >
          <Bookmark className="h-5 w-5" />
        </Button>
      </div>

      {/* Job Title & Description */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
          {job?.title}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {job?.description}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <Badge className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/50 border-0">
          <Users className="w-3 h-3 mr-1" />
          {job?.position} Positions
        </Badge>
        <Badge className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 dark:hover:bg-indigo-900/50 border-0">
          <Clock className="w-3 h-3 mr-1" />
          {job?.jobType}
        </Badge>
        <Badge className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 border-0">
          <DollarSign className="w-3 h-3 mr-1" />
          {job?.salary} LPA
        </Badge>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {daysAgo === 0 ? (
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Posted today
            </span>
          ) : (
            `${daysAgo} days ago`
          )}
        </span>
        <div className="flex items-center gap-2">
          {user?.role === "recruiter" ? (
            <Button
              onClick={() => navigate(`/recruiter/jobs/${job?._id}/applicants`)}
              variant="outline"
              className="border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20"
            >
              View Applicants
            </Button>
          ) : (
            <>
              <Button
                onClick={() => navigate(`/description/${job?._id}`)}
                className="gradient-bg text-white border-0 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300 group/btn"
              >
                View Details
                <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Job;
