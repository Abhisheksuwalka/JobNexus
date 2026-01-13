import useGetAllJobs from '@/hooks/useGetAllJobs';
import { setSearchedQuery } from '@/redux/jobslice';
import { ChevronLeft, ChevronRight, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../common/Navbar';
import Job from '../layout/jobs/Jobcard';
import { Button } from '../ui/button';

const JOBS_PER_PAGE = 20;

const Browse = () => {
    useGetAllJobs();
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const dispatch = useDispatch();
    
    // Initialize query from Redux (for category navigation)
    const [query, setQuery] = useState(searchedQuery || '');
    const [currentPage, setCurrentPage] = useState(1);

    // Sync from Redux when navigating from category page
    useEffect(() => {
        if (searchedQuery) {
            setQuery(searchedQuery);
        }
    }, [searchedQuery]);

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        };
    }, [dispatch]);

    // Advanced search: search across multiple fields
    const filteredJobs = allJobs.filter(job => {
        if (!query.trim()) return true;
        
        const searchLower = query.toLowerCase().trim();
        return (
            job.title?.toLowerCase().includes(searchLower) ||
            job.description?.toLowerCase().includes(searchLower) ||
            job.location?.toLowerCase().includes(searchLower) ||
            job.company?.name?.toLowerCase().includes(searchLower) ||
            job.skills?.some(skill => skill.toLowerCase().includes(searchLower)) ||
            job.jobType?.toLowerCase().includes(searchLower) ||
            job.requirements?.toLowerCase().includes(searchLower)
        );
    });

    // Pagination logic
    const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);
    const paginatedJobs = filteredJobs.slice(
        (currentPage - 1) * JOBS_PER_PAGE,
        currentPage * JOBS_PER_PAGE
    );

    // Reset to page 1 when query changes
    useEffect(() => {
        setCurrentPage(1);
    }, [query]);

    const clearSearch = () => {
        setQuery('');
        dispatch(setSearchedQuery(''));
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navbar />
            <div className='max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8'>
                {/* Search Bar */}
                <div className='flex w-full max-w-2xl shadow-lg border border-gray-200 dark:border-gray-700 pl-4 rounded-full items-center gap-2 mx-auto my-6 bg-white dark:bg-gray-800'>
                    <Search className='h-5 w-5 text-gray-400' />
                    <input
                        type="text"
                        placeholder='Search by title, skills, company, location...'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full py-3 bg-transparent dark:text-white placeholder:text-gray-400'
                    />
                    {query && (
                        <button
                            onClick={clearSearch}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full mr-1"
                        >
                            <X className='h-4 w-4 text-gray-500' />
                        </button>
                    )}
                    <Button className="rounded-r-full bg-[#6A38C2] hover:bg-[#5b30a6] h-12 px-6">
                        <Search className='h-5 w-5' />
                    </Button>
                </div>

                {/* Search info */}
                {query && (
                    <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                        Searching for &quot;{query}&quot; in titles, descriptions, skills, companies, and locations
                    </p>
                )}

                <h1 className='font-bold text-xl my-6 text-gray-900 dark:text-white'>
                    Search Results ({filteredJobs.length})
                </h1>
                
                {filteredJobs.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-gray-500 dark:text-gray-400 text-lg">
                            No jobs found matching your search criteria.
                        </p>
                        {query && (
                            <Button
                                variant="outline"
                                className="mt-4"
                                onClick={clearSearch}
                            >
                                Clear Search
                            </Button>
                        )}
                    </div>
                ) : (
                    <>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                            {paginatedJobs.map((job) => (
                                <Job key={job._id} job={job} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2 mt-8">
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
                                                className={`w-10 ${currentPage === pageNum ? 'bg-[#6A38C2]' : ''}`}
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
                        )}
                        
                        {/* Page info */}
                        {totalPages > 1 && (
                            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                                Showing {(currentPage - 1) * JOBS_PER_PAGE + 1} - {Math.min(currentPage * JOBS_PER_PAGE, filteredJobs.length)} of {filteredJobs.length} jobs
                            </p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Browse;
