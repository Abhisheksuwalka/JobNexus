import { setAllJobs } from "@/redux/jobslice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { mockJobs } from "../data/mockJobs";

// Hook to load mock data for frontend testing
// Remove this hook call from App.jsx when connecting to real backend
const useMockData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load mock jobs into Redux store
    dispatch(setAllJobs(mockJobs));
    console.log("[Mock Data] Loaded", mockJobs.length, "jobs for testing");
  }, [dispatch]);
};

export default useMockData;
