/* eslint-disable no-unused-vars */
import { setSearchedQuery } from "@/redux/jobslice";
import { useEffect } from "react";
import useGetAllJobs from "../../hooks/useGetAllJobs";
import Footer from "../common/Footer";
import Navbar from "../common/Navbar";
import CategoryCatalouge from "../layout/home/CategoryCatalouge";
import Herosection from "../layout/home/Herosection";
import Latestjobs from "../layout/home/Latestjobs";

import { useDispatch, useSelector } from "react-redux";
import CompanyCatalouge from "../layout/home/CompanyCatalouge";
import RecentJobsPosted from "../layout/home/RecentJobsPosted";

// Mock data for frontend testing - remove when connecting to real backend
import useMockData from "../../hooks/useMockData";

function Homepage() {
  useGetAllJobs();
  useMockData(); // Load 250 mock jobs for testing

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Herosection />

      {user && user.role === "recruiter" ? (
        <>
          <CompanyCatalouge />
          <RecentJobsPosted />
        </>
      ) : (
        <>
          <CategoryCatalouge />
          <Latestjobs />
        </>
      )}

      <Footer />
    </>
  );
}

export default Homepage;
