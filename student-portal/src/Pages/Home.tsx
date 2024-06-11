import Profile from "./Profile";

const Home: React.FC = () => {
  return (
    <div>
      <div className="bg-gradient-to-br  from-gray-900 to-gray-400 opacity-95 w-full relative overflow-hidden block">
        <img
          src="src/assets/images/com-lab-3.jpeg"
          className="w-full h-screen object-cover absolute mix-blend-overlay"
        />
        <div className="text-white text-bold text-4xl  mt-10 ml-10 md:ml-20 mb-20 ">
          Hello 202X/E/XXX
        </div>
        <Profile />
      </div>
    </div>
  );
};

export default Home;
