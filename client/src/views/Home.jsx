import { useEffect, useState } from 'react';
import JobList from '../components/JobList';
import { getJobs } from '../stores/actionCreator';
import { useDispatch, useSelector } from 'react-redux';

const HomePage = function(){
  const dispatcher = useDispatch()
  let { jobs, page, totalPage, isLoading } = useSelector((state) => state.jobReducer)
  const [searchQuery, setSearchQuery] = useState({description:null, location:null, Full_Time:null})
  const [currentPage, setCurrentPage] = useState(1)

  const loadJobs = () => {
    dispatcher(getJobs(currentPage, searchQuery))
  }

  useEffect(() => {
    loadJobs()
  }, [currentPage])  

  const handleSearch = () => {
    setCurrentPage(1)
    loadJobs()
  }

  const handleLoadMore = () => {
    setCurrentPage(currentPage + 1)
    loadJobs()
  }
  
  return (
    <div className='mt-20 md:px-24 lg:px-36 bg-gray-200'>
      {/* Filter and Seach bar */}
      <div className='px-8'>
        <div className='flex flex-wrap gap-x-2 md:flex-row md:gap-x-4 lg:gap-x-6 items-center'>
          <div className='flex flex-col flex-1'>
            <label htmlFor='description' className='text-sm font-semibold flex flex-col'>Job Description<br/><input type="text" name='description' className='p-1 border-zinc-400 border-2 border-spacing-2' placeholder='Filter by Title, Benefits, Companies or Expertise'
              onChange={ (event) => {
                setSearchQuery({
                  ...searchQuery,
                  description:event.target.value
                })
              }}
            /></label>
          </div>
          <div className='flex flex-col flex-1'>
            <label htmlFor='location' className='text-sm font-semibold flex flex-col'>Location<br/><input type="text" name='location' className='p-1 border-zinc-400 border-2 border-spacing-2' placeholder='Filter by City, State, Zip Code or Country'
              onChange={ (event) => {
                setSearchQuery({
                  ...searchQuery,
                  location:event.target.value
                })
              }}
            /></label>
            
          </div>
          <div className='flex flex-col'>
            <label className='font-semibold'> <br/><input type="checkbox"
              onChange={ (event) => {
                setSearchQuery({
                  ...searchQuery,
                  Full_Time:event.target.checked
                })
              }}
            /> Full Time Only</label>
          </div>
          <div>
          <label className='font-semibold'> <br/><button className='px-4 py-1 bg-blue-500 text-white font-semibold rounded-sm'
            onClick={handleSearch}
          >Search</button></label>
          </div>
        </div>
      </div>

      {/* Job List */}
      <div className='my-12 bg-white w-full px-8'>
        <div className='py-8 '>
          <h1 className='text-3xl font-bold'>Job List</h1>
        </div>
        <div>
          {
            jobs.map((job, index) => {
              return (
                <JobList key={index} job={job} />
              )
            })
          }      
        </div>
        {
          page < totalPage &&
          <div className='py-8 flex flex-1 md:justify-end w-full'>
            <button className='px-6 py-1 bg-blue-500 text-white font-semibold rounded-sm w-full md:w-fit'
              onClick={handleLoadMore}
            >Load More</button>
          </div>
        }
      </div>

    </div>

  );
}

export default HomePage;