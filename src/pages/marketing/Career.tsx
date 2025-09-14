import Accordion from "../../components/marketing/Career/Accordion";

const accordionItems = [
  {
    title: "Senior/Mid Mobile App Developer (iOS & Android) - Full Time",
    type: "remote work, lagos,nigeria",
    content: [
      {
        header: "the role",
        text: "We're looking for a skilled mobile app developer with strong experience building cross-platform applications using Flutter or React Native. You'll be responsible for building, optimizing, and maintaining our Farmstarck mobile app, used by thousands of farmers, merchants, and consumers.",
      },
      {
        header: "Key Responsibilty",
        lists: [
          "Build responsive and scalable iOS and Android apps",
          "Collaborate with product and backend teams",
          "Integrate APIs (e.g. payments, savings, logistics)",
          "Optimize app performance and user experience",
          "Deploy to Google Play and App Store",
        ],
      },
      {
        header: "Qualifications",
        lists: [
          "3+ years experience in mobile development",
          "Proficient in Flutter, Dart (or React Native/Java/Kotlin/Swift)",
          "Experience integrating third-party APIs",
          "Good understanding of Git, Firebase, and RESTful services",
          "Startup experience or passion for impact-driven work is a plus",
        ],
      },
    ],
  },
  {
    title: "business developer",
    type: "remote work, lagos,nigeria",
    content: [
      {
        header: "the role",
        text: "Lorem ipsum dolor sit amet consectetur. Mattis massa sed tortor dui sit leo. Sit pulvinar interdum varius donec. Nunc montes cursus fermentum tortor amet et eu at. Viverra sit non potenti nullam dignissim. Nunc enim sit venenatis nisl tellus. Amet sem neque enim nunc suspendisse tortor gravida risus. Nulla vulputate.",
      },
      {
        header: "your responsibilities",
        text: "Lorem ipsum dolor sit amet consectetur. Mattis massa sed tortor dui sit leo. Sit pulvinar interdum varius donec. Nunc montes cursus fermentum tortor amet et eu at. Viverra sit non potenti nullam dignissim. Nunc enim sit venenatis nisl tellus. Amet sem neque enim nunc suspendisse tortor gravida risus. Nulla vulputate.",
      },
      {
        header: "what can you expect from us",
        text: "Lorem ipsum dolor sit amet consectetur. Mattis massa sed tortor dui sit leo. Sit pulvinar interdum varius donec. Nunc montes cursus fermentum tortor amet et eu at. Viverra sit non potenti nullam dignissim. Nunc enim sit venenatis nisl tellus. Amet sem neque enim nunc suspendisse tortor gravida risus. Nulla vulputate.",
      },
    ],
  },
  {
    title: "marketing officer",
    type: "remote work, lagos,nigeria",
    content: [
      {
        header: "the role",
        text: "Lorem ipsum dolor sit amet consectetur. Mattis massa sed tortor dui sit leo. Sit pulvinar interdum varius donec. Nunc montes cursus fermentum tortor amet et eu at. Viverra sit non potenti nullam dignissim. Nunc enim sit venenatis nisl tellus. Amet sem neque enim nunc suspendisse tortor gravida risus. Nulla vulputate.",
      },
      {
        header: "your responsibilities",
        text: "Lorem ipsum dolor sit amet consectetur. Mattis massa sed tortor dui sit leo. Sit pulvinar interdum varius donec. Nunc montes cursus fermentum tortor amet et eu at. Viverra sit non potenti nullam dignissim. Nunc enim sit venenatis nisl tellus. Amet sem neque enim nunc suspendisse tortor gravida risus. Nulla vulputate.",
      },
      {
        header: "what can you expect from us",
        text: "Lorem ipsum dolor sit amet consectetur. Mattis massa sed tortor dui sit leo. Sit pulvinar interdum varius donec. Nunc montes cursus fermentum tortor amet et eu at. Viverra sit non potenti nullam dignissim. Nunc enim sit venenatis nisl tellus. Amet sem neque enim nunc suspendisse tortor gravida risus. Nulla vulputate.",
      },
    ],
  },
  {
    title: "farm educator",
    type: "on-site work, lagos,nigeria",
    content: [
      {
        header: "the role",
        text: "Lorem ipsum dolor sit amet consectetur. Mattis massa sed tortor dui sit leo. Sit pulvinar interdum varius donec. Nunc montes cursus fermentum tortor amet et eu at. Viverra sit non potenti nullam dignissim. Nunc enim sit venenatis nisl tellus. Amet sem neque enim nunc suspendisse tortor gravida risus. Nulla vulputate.",
      },
      {
        header: "your responsibilities",
        text: "Lorem ipsum dolor sit amet consectetur. Mattis massa sed tortor dui sit leo. Sit pulvinar interdum varius donec. Nunc montes cursus fermentum tortor amet et eu at. Viverra sit non potenti nullam dignissim. Nunc enim sit venenatis nisl tellus. Amet sem neque enim nunc suspendisse tortor gravida risus. Nulla vulputate.",
      },
      {
        header: "what can you expect from us",
        text: "Lorem ipsum dolor sit amet consectetur. Mattis massa sed tortor dui sit leo. Sit pulvinar interdum varius donec. Nunc montes cursus fermentum tortor amet et eu at. Viverra sit non potenti nullam dignissim. Nunc enim sit venenatis nisl tellus. Amet sem neque enim nunc suspendisse tortor gravida risus. Nulla vulputate.",
      },
    ],
  },
];

const Career = () => {
  return (
    <div className="flex flex-col">
      <div className="bg-secondary-veryLight ">
        <div className="p-5 relative flex flex-col justify-center items-center ">
          <div className="max-w-5xl m-auto  w-full flex flex-col py-10 gap-3 md:gap-5 items-center ">
            <h2 className="uppercase text-sm md:text-base text-center text-secondary-veryDark font-subHeading leading-relaxed">
              Careers
            </h2>
            <h1 className="font-subHeading text-center text-2xl md:text-4xl text-secondary-veryDark font-extrabold">
              Join an amazing team working on some of the most important{" "}
              <span className="text-secondary-light">
                challenge facing the world today!
              </span>
            </h1>
          </div>
        </div>
      </div>
      <div className="bg-white ">
        <div className="p-5 relative flex flex-col justify-center items-center">
          <div className="w-full max-w-5xl m-auto py-10 gap-y-10 flex flex-col justify-between items-center">
            <div className="">
              <div className="max-w-3xl m-auto flex flex-col gap-5 md:gap-20 items-start">
                <h2 className="text-xl sm:text-3xl md:text-4xl  text-center font-subHeading2 leading-tight font-extrabold text-secondary-veryDark text-centers w-full">
                  JOB OPENINGS
                </h2>
                <Accordion items={accordionItems} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
