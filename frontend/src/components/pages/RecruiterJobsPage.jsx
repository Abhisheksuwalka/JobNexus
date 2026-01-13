import { setSearchJobByText } from '@/redux/jobslice'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useGetAllRecruiterJobs from '../../hooks/useGetAllRecruiterJobs'
import Navbar from '../common/Navbar'
import RecruiterJobsTable from '../layout/recruiterJobs/RecruiterJobsTable'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

const AdminJobs = () => {
  useGetAllRecruiterJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);
  return (
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto my-10'>
        <div className='flex items-center justify-between my-5'>
          <Input
            className="w-fit"
            placeholder="Filter by name, role"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={() => navigate("/recruiter/jobs/create")}>New Jobs</Button>
        </div>
      <RecruiterJobsTable/>
      </div>
    </div>
  )
}

export default AdminJobs