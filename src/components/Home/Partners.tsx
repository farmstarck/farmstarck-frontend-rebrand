"use client"

const stats = [
  { id: 1, value:'/assets/svg/wavetify.svg' },
  { id: 2, value: '/assets/svg/arolana.svg' },
  { id: 3, value: '/assets/svg/ibrand.svg' },
  { id: 4, value: '/assets/svg/fuge.svg' },
  { id: 5, value: '/assets/svg/koinwa.svg' },
];

const Partners = () => {
  return (
    <div className="primary-bg pb-14 sm:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h5 className="text-xs uppercase text-center mb-10">our partners</h5>
        <div className="flex gap-x-8 overflow-x-scroll snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-5 md:gap-y-10 md:gap-x-8">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="flex-shrink-0 snap-center mx-auto flex max-w-xs flex-col gap-y-4 justify-center"
            >
              <img
                src={stat.value}
                alt=""
                className="w-16 md:w-20"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partners;
