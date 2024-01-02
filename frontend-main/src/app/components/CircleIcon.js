const CircleIcon = ({ icon: Icon }) => (
  <div className="flex flex-row justify-center items-center">
    <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full">
      <Icon size={32} className="text-violet-400 text-2xl" />
    </div>
  </div>
);

export default CircleIcon;
