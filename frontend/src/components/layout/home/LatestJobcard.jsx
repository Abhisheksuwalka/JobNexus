/* eslint-disable react/prop-types */
import { ArrowRight, Briefcase, Clock, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const daysAgo = () => {
    const createdAt = new Date(job?.createdAt);
    const now = new Date();
    const diff = Math.floor((now - createdAt) / (1000 * 60 * 60 * 24));
    return diff === 0 ? "Today" : diff === 1 ? "Yesterday" : `${diff}d ago`;
  };

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="bg-white dark:bg-gray-800 rounded-lg p-5 cursor-pointer border border-gray-200 dark:border-gray-700 hover:border-primary/50 transition-all duration-200 card-hover"
    >
      {/* Header */}
      <div className="flex items-start gap-4">
        <Avatar className="h-12 w-12 rounded-lg border border-gray-200 dark:border-gray-700">
          <AvatarImage
            src={job?.company?.logo}
            className="object-cover rounded-lg"
          />
          <AvatarFallback className="bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 font-semibold text-sm rounded-lg">
            {job?.company?.name?.slice(0, 2).toUpperCase() || "CO"}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">
                {job?.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {job?.company?.name}
              </p>
            </div>
            <span className="text-xs text-gray-400 whitespace-nowrap">
              {daysAgo()}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
        {job?.description}
      </p>

      {/* Meta Info */}
      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
        <span className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {job?.location || "India"}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {job?.jobType}
        </span>
        <span className="flex items-center gap-1">
          <Briefcase className="w-4 h-4" />
          {job?.experience || 0}+ yrs
        </span>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
        <span className="text-primary font-semibold">
          ₹{job?.salary} LPA
        </span>
        <span className="text-sm text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
          View Details
          <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </div>
  );
};

export default JobCard;