import { useAuth } from "../../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { NavLink, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

const Signin = () => {
  const { signin, googleSignIn, error, setError } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const emailVerificationMessage = "Please verify your email address to login.";

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    signin(emailRef.current.value, passwordRef.current.value);
    if (error !== null) {
      emailRef.current.value = "";
      passwordRef.current.value = "";
    }
    setLoading(false);
  };

  const googleLoginHandler = async () => {
    try {
      setLoading(true);
      await googleSignIn();
    } catch {
      setError("Failed to Log in");
    }
    setLoading(false);
  };

  return (
    <div className=' login flex flex-col items-center justify-center'>
      <div className='w-11/12 sm:w-80 flex flex-col justify-center items-center mb-4 border-b-2 border-b-gray-200'>
        {error !== "" && (
          <div
            className={`w-full  text-white rounded-md mb-2 mt-4  py-1 text-center ${
              error === emailVerificationMessage
                ? "bg-green-400 text-sm"
                : "bg-red-400"
            }`}
          >
            {error}
          </div>
        )}
        <h2 className='text-3xl font-bold mb-6'>Log in</h2>
        <form
          className='w-full flex flex-col mb-4'
          onSubmit={handleLogin}
          onChange={() => {
            setError("");
          }}
        >
          <label htmlFor='email' className='mb-2 font-bold text-sm'>
            Email
          </label>
          <input
            ref={emailRef}
            type='email'
            className='mb-4 px-2 border border-gray-200 outline-gray-300 py-1 rounded-md'
            name='email'
          />
          <label htmlFor='password' className='mb-2 font-bold text-sm'>
            Password
          </label>
          <input
            ref={passwordRef}
            type='password'
            className='mb-4 px-2  border border-gray-200 outline-gray-300 py-1 rounded-md'
            name='password'
          />
          <button
            disabled={loading}
            className='w-full bg-red-500 text-white py-2 rounded-md'
            type='submit'
          >
            Log in
          </button>
        </form>
        <NavLink to='/forgot' className='text-sm mb-4'>
          Forgot Password?
        </NavLink>
        <div className='mb-4 flex justify-center items-center w-full or-container text-gray-400 '>
          <span>OR</span>
        </div>
        <button
          className='w-full bg-white py-2 rounded-md mb-6 text-gray-500 border border-gray-200 pl-2 flex'
          onClick={googleLoginHandler}
        >
          <span className='w-1/5 '>
            <FcGoogle className='text-2xl' />
          </span>
          <span className='w-4/5 flex justify-start'>Login with Google</span>
        </button>
      </div>
      <p className='text-sm'>
        Don't have an account?{" "}
        <NavLink to='/signup' className='text-red-500'>
          Sign up
        </NavLink>
      </p>
    </div>
  );
};

export default Signin;
