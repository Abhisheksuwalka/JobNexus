import { setSingleJob } from "@/redux/jobslice";
import axios from "axios";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Award,
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  FileText,
  MapPin,
  Send,
  Timer,
  Users
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "../../../utils/constant";
import Navbar from "../../common/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
import { Button } from "./../../ui/button";

const JobDescription = () => {
  const { singleJob, allJobs } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const allAppliedJobs = useSelector((store) => store.job.allAppliedJobs);
  const [isApplied, setIsApplied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const applyJobHandler = async () => {
    if (allAppliedJobs.length >= 10) {
      navigate("/revenuehome");
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      // Check if it's a mock job ID (starts with "job_")
      if (jobId?.startsWith("job_")) {
        const mockJob = allJobs.find(j => j._id === jobId);
        if (mockJob) {
          dispatch(setSingleJob(mockJob));
          const hasApplied = mockJob.applications?.some(
            (application) => application.applicant === user?._id
          );
          setIsApplied(hasApplied);
          return;
        }
      }
      
      // Otherwise fetch from API
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          const hasApplied = res.data.job.applications.some(
            (application) => application.applicant === user?._id
          );
          setIsApplied(hasApplied);
        }
      } catch (error) {
        console.log(error);
        // Fallback: try to find in allJobs
        const fallbackJob = allJobs.find(j => j._id === jobId);
        if (fallbackJob) {
          dispatch(setSingleJob(fallbackJob));
        }
      }
    };

    if (jobId) {
      fetchSingleJob();
    }
  }, [jobId, dispatch, user?._id, allJobs]);

  useEffect(() => {
    const hasApplied = singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    );
    setIsApplied(hasApplied);
  }, [singleJob, user?._id]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const jobDetails = [
    { icon: MapPin, label: "Location", value: singleJob?.location },
    { icon: Timer, label: "Experience", value: `${singleJob?.experience} years` },
    { icon: DollarSign, label: "Salary", value: `${singleJob?.salary} LPA` },
    { icon: Users, label: "Positions", value: singleJob?.position },
    { icon: Briefcase, label: "Job Type", value: singleJob?.jobType },
    { icon: Calendar, label: "Posted", value: formatDate(singleJob?.createdAt) },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 mb-6 transition-colors"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Jobs
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Job Header Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card overflow-hidden">
              <div className="h-2 gradient-bg"></div>
              <div className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Avatar className="h-16 w-16 ring-2 ring-purple-100 dark:ring-purple-900/50 flex-shrink-0">
                    <AvatarImage
                      src={singleJob?.company?.logo}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 font-semibold">
                      {singleJob?.company?.name?.slice(0, 2).toUpperCase() || "CO"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {singleJob?.title}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      {singleJob?.company?.name}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      <Badge className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-0">
                        <Users className="w-3 h-3 mr-1" />
                        {singleJob?.position} Positions
                      </Badge>
                      <Badge className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border-0">
                        <Clock className="w-3 h-3 mr-1" />
                        {singleJob?.jobType}
                      </Badge>
                      <Badge className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-0">
                        <DollarSign className="w-3 h-3 mr-1" />
                        {singleJob?.salary} LPA
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-600" />
                Job Description
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                {singleJob?.description}
              </p>
            </div>

            {/* Requirements - if available */}
            {singleJob?.requirements && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card p-6 sm:p-8">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-600" />
                  Requirements
                </h2>
                <div className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                  {singleJob?.requirements}
                </div>
              </div>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Apply Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card p-6 sticky top-24">
              <div className="text-center mb-6">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Total Applicants
                </p>
                <p className="text-3xl font-bold gradient-text">
                  {singleJob?.applications?.length || 0}
                </p>
              </div>

              <Button
                onClick={isApplied ? null : applyJobHandler}
                disabled={isApplied || isLoading}
                className={`w-full h-12 text-base font-semibold transition-all duration-300 ${
                  isApplied
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    : "gradient-bg text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50"
                }`}
              >
                {isApplied ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    Already Applied
                  </>
                ) : isLoading ? (
                  "Applying..."
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Apply Now
                  </>
                )}
              </Button>

              {!isApplied && user?.role !== "recruiter" && (
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">
                  You can apply to {10 - (allAppliedJobs?.length || 0)} more jobs
                </p>
              )}
            </div>

            {/* Job Details */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Job Details
              </h3>
              <div className="space-y-4">
                {jobDetails.map((detail, index) => {
                  const Icon = detail.icon;
                  return (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {detail.label}
                        </p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {detail.value || "N/A"}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Company Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                About Company
              </h3>
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 ring-2 ring-purple-100 dark:ring-purple-900/50">
                  <AvatarImage
                    src={singleJob?.company?.logo}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 font-semibold text-sm">
                    {singleJob?.company?.name?.slice(0, 2).toUpperCase() || "CO"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {singleJob?.company?.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {singleJob?.company?.location || "View Company Profile"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
