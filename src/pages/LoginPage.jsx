import Auth from '.././components/layouts/AuthLayouts.jsx';
import Login from '.././components/layouts/FormLogin.jsx'

export default () => {
  return (
    <div className="w-full min-h-screen bg-black flex justify-center items-center p-5">
      <Auth type="Login">
        <Login/>
      </Auth>
    </div>
  )
}