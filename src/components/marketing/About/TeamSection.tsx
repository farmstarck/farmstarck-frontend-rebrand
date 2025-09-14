import Teams from "./Teams";
const TeamSection = () => {
  return (
    <div className="max-w-3xl m-auto flex flex-col space-y-14 md:space-y-24 px-5 py-6 md:py-12">
      <div className="space-y-3">
        <h5 className="text-xs uppercase">Our origins</h5>
        <h2 className="sm:text-2xl uppercase md:text-3xl">
          AGRICULTURAL transformers: meet the minds REVOLUTIONIZING THE
          AGRO-ECOSYSTEM.
        </h2>
      </div>
      <Teams />
    </div>
  );
};

export default TeamSection;
