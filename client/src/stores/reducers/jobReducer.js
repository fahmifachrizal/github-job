const initialState = {
  jobs: [],
  jobById: {},
  isLoading: true,
  page:0,
  totalPage:1,
}

const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'jobs/getjobs':
      return {
        ...state,
        jobs: action.payload.page==1?[...action.payload.jobs]:[...state.jobs, ...action.payload.jobs],
        page: action.payload.page,
        totalPage: action.payload.totalPage,
        isLoading: false,
      }
    case 'jobs/getjobById':
      return {
        ...state,
        jobById: action.payload.jobById,
        isLoading: false,
      }
    default:
      return state
  }
}

export default jobReducer