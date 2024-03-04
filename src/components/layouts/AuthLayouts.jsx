import { Link } from 'react-router-dom';

const Navigation = ({type}) => {
  if (type === 'Register') {
    return (
      <p className="text-slate-400 mt-5 text-sm font-medium">
        Already have account?{" "}
        <Link to="/login" className="text-teal-500 font-semibold cursor-pointer">Login</Link>
      </p>
    )
  } else {
    return (
      <p className="text-slate-400 mt-5 text-sm font-medium">
        Don't have an account?{" "}
        <Link to="/register" className="text-teal-500 font-semibold cursor-pointer">Register</Link>
      </p>
    )
  }
}

export default ({children, type}) => {
  return (
    <div className="w-full max-w-md">
      <h1 className="text-2xl font-semibold text-teal-500">{type}</h1>
      <p className="mt-1 text-sm font-medium text-slate-400">Welcome, please enter your detail!</p>
      {children}
      <Navigation type={type}/>
    </div>
  )
}