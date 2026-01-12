/* eslint-disable react/prop-types */
import { ArrowUpRight, Clock, DollarSign, MapPin, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "../../ui/avatar";
import { Badge } from "../../ui/badge";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 cursor-pointer shadow-card hover:shadow-card-hover transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden"
    >
      {/* Gradient Accent */}
      <div className="absolute top-0 left-0 w-full h-1 gradient-bg"></div>

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 ring-2 ring-purple-100 dark:ring-purple-900/50">
            <AvatarImage src={job?.company?.logo} className="object-cover" />
          </Avatar>
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
        <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowUpRight className="w-4 h-4 text-purple-600 dark:text-purple-400" />
        </div>
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
      <div className="flex flex-wrap items-center gap-2">
        <Badge className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-0 text-xs">
          <Users className="w-3 h-3 mr-1" />
          {job?.position} Positions
        </Badge>
        <Badge className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border-0 text-xs">
          <Clock className="w-3 h-3 mr-1" />
          {job?.jobType}
        </Badge>
        <Badge className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-0 text-xs">
          <DollarSign className="w-3 h-3 mr-1" />
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default JobCard;