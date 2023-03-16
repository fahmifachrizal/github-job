import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getJobById } from '../stores/actionCreator';
import { useDispatch, useSelector } from 'react-redux';

const DetailPage = function(){
  const dispatcher = useDispatch()  
  const params = useParams();
  const id = params.id;
  const { jobById, isLoading } = useSelector((state) => state.jobReducer)

  const loadJobById = () => {
    dispatcher(getJobById(id))
  }

  useEffect(() => {
    loadJobById()
  }, [])  

  return (
    <>
      <div className='mt-20 md:px-24 lg:px-36 bg-gray-200'>
      <div className='font-bold text-cyan-600  py-4'><a href="/">← Back</a></div> 
        <div className='bg-white w-full px-8'>
          <div className='py-8 border-b-[1px] border-b-gray-300'>
            <div>
              {jobById.type} / {jobById.location}
            </div>
            <h1 className='text-3xl font-bold text-slate-700'>{jobById.title}</h1>
          </div>
          <div className='py-4 lg:flex lg:flex-row-reverse'>
            <div className='flex flex-col gap-y-4'>  
              <div className='p-2 w-96 bg-gray-200 rounded-lg'>
                <div className='p-2 bg-white w-full rounded-md border'>
                  <div className='h-8 border-b-2 mb-2'>
                    <h2 className='font-semibold'>{jobById.company}</h2>
                  </div>
                  <img src={jobById.company_logo} alt="logo" className='flex justify-center items-center w-full h-64 border-[1px]'/>
                  <a href={jobById.company_url} className='underline text-blue-700'>{jobById.company_url}</a>
                </div>
              </div>
              <div className='p-2 w-96 bg-amber-100 rounded-lg'>
                <div className='p-2 bg-amber-50 w-full rounded-md border'>
                  <div className='h-8 border-b-2 mb-2'>
                    <h2 className='font-semibold'>How to apply</h2>
                  </div>
                  <div>
                    <span>Contact us directly at <a className="text-blue-700 underline" href={jobById.company_url}>{jobById.company_url}</a></span><br/>
                    <span>Or apply directly <a className="text-blue-700 underline" href={jobById.url}>at here</a></span>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex-1 pb-24 py-4 lg:pr-8' dangerouslySetInnerHTML={{__html: jobById.description}}>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailPage;