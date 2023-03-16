import React from 'react'

function JobList(props) {
  const { job } = props
  const calculateTimePassed = (created_at) => {
    const now = new Date();
    const date = new Date(created_at);
    const diff = now.getTime() - date.getTime();
    const oneDay = 24 * 60 * 60 * 1000;
    const oneWeek = 7 * oneDay;
    const oneMonth = 30 * oneDay;
    
    if (diff < oneDay) {
      return `${Math.floor(diff / (60 * 60 * 1000))} hours ago`;
    } else if (diff < oneWeek) {
      return `${Math.floor(diff / oneDay)} days ago`;
    } else if (diff < oneMonth) {
      return `${Math.floor(diff / oneWeek)} weeks ago`;
    } else {
      return `${Math.floor(diff / oneMonth)} months ago`;
    }
  }

  return (
    <div className='border-t-[1px] border-t-gray-300 py-2 flex justify-between'>
      <div className=''>
        <div className='text-cyan-600 font-bold'>
          <a href={`/jobs/${job.id}`}>{job.title}</a>
        </div>
        <div>
          <span className='text-gray-500 text-sm'>{job.company} - </span><span className='text-green-600 font-bold text-sm'>{job.type}</span>
        </div>
      </div>
      <div className=''>
        <div className='text-gray-500 font-semibold flex justify-end text-sm'>
          {job.location}
        </div>
        <div>
          <span className='text-gray-400 font-semibold flex justify-end text-sm'>{calculateTimePassed(job.created_at)}</span>
        </div>
      </div>
    </div>
  )
}

export default JobList