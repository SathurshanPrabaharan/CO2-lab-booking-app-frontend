import Profile from "./Profile";

const Home: React.FC = () => {
  return (
    <div>
      <div className="bg-gradient-to-br  from-gray-900 to-gray-400 opacity-95 w-full relative overflow-hidden block">
        <img
          src="src/assets/images/com-lab-3.jpeg"
          className="w-full h-screen object-cover absolute mix-blend-overlay"
        />
        <div className="text-white text-extrabold font-mono text-2xl md:text-4xl mt-4 md:mt-10 text-center lg:ml-20 mb-8 md:mb-20 ">
          Hello 202X/E/XXX
        </div>
        <Profile />
      </div>
    </div>
  );
};

export default Home;
