const stats = [
  { id: 1, name: "Total Farm Produce", value: "8000Kg" },
  { id: 2, name: "Total value exchanged (marketplace)", value: "$4000+" },
  { id: 3, name: "total farmers onboard", value: "200+" },
  { id: 4, name: "total value locked (protocol)", value: "N/A" },
];

type StatisticsProps = {
  insight?: boolean;
};

const Statistics: React.FC<StatisticsProps> = ({ insight }) => {
  return (
    <div
      className={`${
        insight ? "bg-white" : "bg-secondary-light py-24 sm:py-32"
      }`}
    >
      <div className={`${insight ? "" : "mx-auto max-w-7xl px-6 lg:px-8"}`}>
        <h5
          className={` uppercase ${
            insight
              ? "mx-auto max-w-3xl  text-center text-xs font-subHeading2 md:text-start md:text-sm"
              : "text-center text-xs"
          } mb-10`}
        >
          success metrics
        </h5>
        <dl className="grid grid-cols-1 gap-x-8 gap-y-10 text-center md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="mx-auto flex max-w-xs flex-col gap-y-4"
            >
              <dt className="text-xs/7 text-gray-600 capitalize">
                {stat.name}
              </dt>
              <dd className="order-first text-xl font-normal tracking-tight text-secondary-dark sm:text-3xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default Statistics;
