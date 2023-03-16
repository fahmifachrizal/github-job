import { useNavigate } from "react-router-dom"

function Navbar() {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('access_token')
    navigate('/login')
  }

  return (
    <div className='fixed top-0 h-14 w-full bg-gray-200'>
      <div className='flex h-full bg-blue-500 items-center px-8 md:px-24 lg:px-36 justify-between'>
        <div>
          <h1 className="text-4xl text-white"><span className="font-bold">Github</span> Jobs</h1>
        </div>
        <div>
          <button className="font-semibold text-white" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar