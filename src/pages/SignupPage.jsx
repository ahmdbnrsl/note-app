import Auth from '.././components/layouts/AuthLayouts.jsx';
import Register from '.././components/layouts/FormSignup.jsx'

export default () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 to-cyan-950 flex justify-center items-center p-5">
      <Auth type="Register">
        <Register/>
      </Auth>
    </div>
  )
}