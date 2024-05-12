import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <div className=" p-4 grid grid-cols-2">
      <div className="p-5 flex flex-col gap-10">
        <h1 className="text-5xl leading-15 tracking-wide font-semibold">everything is better with a <span className="text-red-500">pizza</span></h1>
        <p className="text-2xl">
          pizza is the missing piece that makes everyday complete ,a ximple yet
          delicious joy in life
        </p>
        <div className="flex gap-4  ">
         <Link to={'/menu'}> <button className="p-3 text-xl rounded-full bg-red-500 text-white">order now</button></Link>  
            <button className="p-2 text-xl rounded-full ">Learn more </button>
        </div>
      </div>
      <div className="flex justify-center items-center">
     <img src="/pizza.png" className="object-contain h-[350px] w-[350px]" />
      </div>
    </div>
  );
};
export default Hero;

