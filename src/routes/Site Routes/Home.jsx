import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className='flex justify-center'>
      <div className='flex flex-col items-center justify-center my-60 '>
        <h1 className='text-5xl md:text-6xl font-bold text-center mb-6'>
          Plan your <br></br>journey to success
        </h1>
        <h2 className='mb-6 text-lg md:text-xl text-center '>
          Empowering you to achieve your goals one task at a time<br></br> -
          Trektask, the ultimate productivity tool designed to keep you focused,
          <br></br>
          organized, and on top of your game!
        </h2>
        <button className='bg-red-500 text-white px-6 py-2 rounded-md'>
          <NavLink to='/app'>Go to App</NavLink>
        </button>
      </div>
      <div>
        <img src='' alt='' />
      </div>
    </div>
  );
};

export default Home;
