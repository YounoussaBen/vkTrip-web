

import ExploreForm from "./ExploreForm";


const Hero = () => {
 

  return (
    <>
      <header className="flex flex-col items-center relative w-full h-[529px] px-7 py-4">
        <div className="flex items-center justify-center">
          <h1 className="font-extrabold text-5xl sm:text-7xl md:text-8xl text-center leading-[55px] sm:leading-[70px] md:leading-[90px] text-gradient">
            It's more than <br /> just a trip
          </h1>
        </div>
        <ExploreForm />
      </header>
    </>
  );
};

export default Hero;
