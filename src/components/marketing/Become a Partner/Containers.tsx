import Container from "./Container";

const data = [
  {
    tag: "PARTNERING WITH GOVERNMENT AGENCIES",
    headerOne: "Ministry of Agriculture and Rural Development",
    textOne:
      "Collaborating to support policy development and implement sustainable farming practices. Our joint initiatives aim to increase productivity and promote food security.",
    headerTwo: "Local Government Bodies",
    textTwo:
      "Working with local governments to improve infrastructure and access to resources for farmers in various regions",
    headerThree: "OUR IMPACT",
    subHeaderThree: "Policy Support",
    textThree:
      "We've helped develop policies that improve access to funding and resources for over 10,000 farmers.",
  },
  {
    tag: "Collaborating with NGOs for Community Impact",
    headerOne: "Agricultural Development NGOs",
    textOne:
      "Partnering with NGOs like the Food Security Initiative to provide training and resources to smallholder farmers.",
    headerTwo: "Environmental NGOS",
    textTwo:
      "Working together to promote sustainable farming practices and environmental conservation.",
    headerThree: "our aim",
    subHeaderThree: "Training Programs",
    textThree:
      "In collaboration with NGOs, we would train 5,000 farmers in the first year in sustainable practices, boosting yields by 30%",
  },
  {
    tag: "Financial Institution Partnerships",
    headerOne: "Banks and Microfinance Institutions",
    textOne:
      "Collaborating with financial institutions to provide loans, insurance, and investment opportunities tailored to farmers' needs.",
    headerTwo: "Investment Firms",
    textTwo:
      "Partnering with investment firms to develop innovative financial products that attract investments in agriculture.",
    headerThree: "our aim",
    subHeaderThree: "Funding Access",
    textThree:
      "Through our financial partnerships, we will be facilitating over $5 million in funding for agricultural projects.",
  },
  {
    tag: "Technology and Research Organizations",
    headerOne: "Tech Companies",
    textOne:
      "Collaborating with technology firms to integrate advanced solutions, such as AI and data analytics, into agriculture.",
    headerTwo: "Research Institutions",
    textTwo:
      "Partnering with research bodies to conduct studies and pilot innovative farming techniques",
    headerThree: "our impact",
    subHeaderThree: "Technology Integration",
    textThree:
      "Our tech partnerships have enabled us to implement AI solutions, increasing efficiency for 2,000 farmers",
  },
];

const Containers = () => {
  return (
    <div className="flex flex-col gap-10 md:gap-20 py-10 md:py-20">
      {data?.map((data, index) => (
        <Container
          key={index}
          tag={data.tag}
          headerOne={data.headerOne}
          textOne={data.textOne}
          headerTwo={data.headerTwo}
          textTwo={data.textTwo}
          headerThree={data.headerThree}
          subHeaderThree={data.subHeaderThree}
          textThree={data.textThree}
        />
      ))}
    </div>
  );
};

export default Containers;
