import { useAuth } from "../../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

const Signup = () => {
  const { user, signup, error, setError } = useAuth(); //context

  //Input refs
  const emailRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const emailVerificationMessage =
    "Verification mail has been sent to your email";

  //Signup handler

  const handleSignup = (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      passwordRef.current.value = "";
      confirmPasswordRef.current.value = "";
      return setError("Passwords do not match");
    }

    setError("");
    setLoading(true);
    signup(
      emailRef.current.value,
      passwordRef.current.value,
      nameRef.current.value
    );
    if (error === "Email is already registered") {
      emailRef.current.value = "";
    }
    passwordRef.current.value = "";
    confirmPasswordRef.current.value = "";

    setLoading(false);
  };

  return (
    <div className=' signup flex flex-col items-center justify-center'>
      <div className='w-11/12 sm:w-80 flex flex-col justify-center items-center m-4 border-b-2 border-b-gray-200'>
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
        <h2 className='text-3xl font-bold mb-4 '>Sign up</h2>
        <form
          className='w-full flex flex-col mb-2'
          onSubmit={handleSignup}
          onChange={() => {
            setError("");
          }}
        >
          <label htmlFor='email' className='mb-1 font-bold text-sm'>
            Email
          </label>
          <input
            ref={emailRef}
            type='email'
            className='mb-2 px-2 border border-gray-200 outline-gray-300 py-1 rounded-md'
            name='email'
          />
          <label htmlFor='name' className='mb-1 font-bold text-sm'>
            Name
          </label>
          <input
            ref={nameRef}
            type='text'
            name='name'
            className='mb-2 px-2 border border-gray-200 outline-gray-300 py-1 rounded-md'
          />
          <label htmlFor='password' className='mb-1 font-bold text-sm'>
            Password
          </label>
          <input
            ref={passwordRef}
            type='password'
            className='mb-2 px-2  border border-gray-200 outline-gray-300 py-1 rounded-md'
            name='password'
          />
          <label htmlFor='confirmPassword' className='mb-1 font-bold text-sm'>
            Password
          </label>
          <input
            ref={confirmPasswordRef}
            type='password'
            className='mb-2 px-2  border border-gray-200 outline-gray-300 py-1 rounded-md'
            name='confirmPassword'
          />
          <div className='flex justify-center mb-2'></div>
          <button
            disabled={loading}
            className='w-full mb-4 bg-red-500 text-white py-2 rounded-md'
            type='submit'
          >
            Sign up
          </button>
        </form>
      </div>
      <p className='text-sm'>
        Already have an account?{" "}
        <NavLink to='/signin' className='text-red-500'>
          Log in
        </NavLink>
      </p>
    </div>
  );
};

export default Signup;
