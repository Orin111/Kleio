import CircleIcon from "../../components/CircleIcon";
export const ReportCard = ({ title, metrics }) => {
  return (
    <div className="flex flex-col rounded-xl text-center p-2 max-h-44 bg-violet-300 justify-between m-6">
      <p className=" text-2xl font-bold	mb-1 text-white">{title}</p>
      <div className="flex flex-row justify-evenly items-center  mb-6 text-4xl">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="flex flex-col p-4 justify-center items-center"
          >
            <CircleIcon icon={metric[2]}></CircleIcon>
            <p className="text-lg font-semibold max-w-xs mt-1 text-neutral-50">
              {metric[0]}
            </p>
            <p className="text-lg text-neutral-50" style={{ marginTop: -5 }}>
              {" "}
              {metric[1]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
