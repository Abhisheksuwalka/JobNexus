import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import { motion } from "framer-motion";
import {
    Briefcase,
    ExternalLink,
    FileText,
    Mail,
    Pen,
    Phone
} from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../common/Navbar";
import AppliedJobTable from "../layout/profile/Appliedjobs";
import Updateprofile from "../layout/profile/Updateprofile";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

function Profile() {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Card */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-card overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header Banner */}
          <div className="h-32 gradient-bg relative">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-gray-800 to-transparent"></div>
          </div>

          {/* Profile Info */}
          <div className="px-8 pb-8">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-16 relative z-10">
              <div className="relative">
                <Avatar className="h-32 w-32 ring-4 ring-white dark:ring-gray-800 shadow-xl">
                  <AvatarImage
                    src={
                      user?.profile?.profilePhoto ||
                      `https://ui-avatars.com/api/?name=${user?.fullname}&background=8B5CF6&color=fff&size=128`
                    }
                    alt="profile"
                    className="object-cover"
                  />
                </Avatar>
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-gray-800"></div>
              </div>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {user?.fullname}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      {user?.profile?.bio || "Add a bio to tell employers about yourself"}
                    </p>
                  </div>
                  <Button
                    onClick={() => setOpen(true)}
                    className="gradient-bg text-white border-0 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300"
                  >
                    <Pen className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {user?.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Phone</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user?.phoneNumber || "Not added"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                <div className="w-10 h-10 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Role</p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                    {user?.role}
                  </p>
                </div>
              </div>
            </div>

            {/* Skills Section - Only for non-recruiters */}
            {user?.role !== "recruiter" && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 gradient-bg rounded-full"></span>
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {user?.profile?.skills?.length > 0 ? (
                    user.profile.skills.map((skill, index) => (
                      <Badge
                        key={index}
                        className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/50 border-0 px-4 py-2"
                      >
                        {skill}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">
                      No skills added yet. Edit your profile to add skills.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Resume Section - Only for non-recruiters */}
            {user?.role !== "recruiter" && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 gradient-bg rounded-full"></span>
                  Resume
                </h2>
                {user?.profile?.resume ? (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={user.profile.resume}
                    className="inline-flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-200 dark:border-purple-800 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-lg gradient-bg flex items-center justify-center shadow-lg shadow-purple-500/20">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {user.profile.resumeOriginalName || "Resume.pdf"}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Click to view
                      </p>
                    </div>
                    <ExternalLink className="w-5 h-5 text-purple-600 dark:text-purple-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                ) : (
                  <div className="p-6 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-center">
                    <FileText className="w-10 h-10 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500 dark:text-gray-400">
                      No resume uploaded yet
                    </p>
                    <Button
                      variant="link"
                      onClick={() => setOpen(true)}
                      className="text-purple-600 hover:text-purple-700"
                    >
                      Upload Resume
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>

        {/* Applied Jobs Section - Only for non-recruiters */}
        {user?.role !== "recruiter" && (
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 gradient-bg rounded-full"></span>
              Applied Jobs
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card overflow-hidden">
              <AppliedJobTable />
            </div>
          </motion.div>
        )}
      </div>
      <Updateprofile open={open} setOpen={setOpen} />
    </div>
  );
}

export default Profile;
