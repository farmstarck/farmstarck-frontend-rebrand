"use client"
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Faq from "@/components/Home/Faq";

export const FoodVaultAccordionItems = [
  {
    header: "What is Food Vault?",
    text: "Food Vault is a savings wallet that helps you save gradually towards food purchases on Farmstarck.",
  },
  {
    header: "Can I withdraw cash from Food Vault?",
    text: "No. Savings can only be used to buy food and farm items from our platform.",
  },
  {
    header: "How do I fund my Food Vault?",
    text: "You can set automated debits or fund manually through your dashboard.",
  },
  {
    header: "Can I choose how often I save?",
    text: "Yes. You can save daily, weekly, monthly, or manually — whatever works best for you.",
  },

  {
    header: "What if I want to pause my savings?",
    text: "You can pause or change your saving plan anytime via your settings.",
  },
];

const howItWorksItem = [
  {
    header: "Create Your Vault",
    text: "Sign up for a secure Food Vault account protected with bank-grade encryption.",
    bg: "bg-[#00C700] rounded-xl flex flex-col items-center md:items-start justify-between px-5 pt-5  gap-5  overflow-hidden",
    headerStyle:
      "text-white font-subHeading text-center md:text-start font-extrabold text-xl",
    textStyle: "text-white text-sm md:text-base text-center md:text-start",
    img: '/assets/images/fault-crop-phone.png',
  },
  {
    header: "Fund Your Vault",
    text: "Deposit funds into your vault using various secure payment methods.",
    bg: "bg-[#F44748] rounded-xl flex flex-col items-center md:items-start justify-between px-5 pt-5  gap-5 overflow-hidden",
    headerStyle:
      "text-white font-subHeading text-center md:text-start font-extrabold text-xl",
    textStyle: "text-white  text-sm md:text-base text-center md:text-start",
    img:'/assets/images/fault-crop-phone.png',
  },
  {
    header: "Shop & Save",
    text: "Use your vault balance to make purchases with special discounts and priority access.",
    bg: "bg-[#FFFFFF] rounded-xl flex flex-col items-center md:items-start justify-between px-5 pt-5  gap-5  overflow-hidden",
    headerStyle:
      "text-[var(--dark-green)] font-subHeading text-center md:text-start font-extrabold text-xl",
    textStyle:
      "text-[var(--dark-green)] text-sm md:text-base text-center md:text-start",
    img:'/assets/images/fault-crop-phone.png',
  },
];

const whyItem = [
  {
    header: "Exclusive Vault Discounts",
    text: "Access special pricing and deals only available to Food Vault members.",
    icon: '/assets/svg/vault-1.svg',
    iconBg:
      "bg-[#00C700] rounded-xl flex justify-center items-center h-12 w-12",
    bg: "border border-[#00C700] rounded-xl flex flex-col items-center justify-center  p-3   md:px-5 md:py-10",
  },
  {
    header: "Budget Protection",
    text: "Safeguard funds specifically for food purchases to ensure food security for your family.",
    icon: '/assets/svg/vault-2.svg',
    iconBg:
      "bg-[#EF4444] rounded-xl flex justify-center items-center h-12 w-12",
    bg: "border border-[#EF4444] rounded-xl flex flex-col items-center justify-center p-3   md:px-5 md:py-10",
  },
  {
    header: "Reward Points",
    text: "Earn points on every vault deposit that can be redeemed for additional food products.",
    icon: '/assets/svg/vault-3.svg',
    iconBg:
      "bg-[#FFBB28] rounded-xl flex justify-center items-center h-12 w-12",
    bg: "border border-[#FFBB28] rounded-xl flex flex-col items-center justify-center p-3  md:px-5 md:py-10",
  },
  {
    header: "Zero Transaction Fee",
    text: "No hidden fees or charges when making purchases with your vault balance.",
    icon: '/assets/svg/vault-4.svg',
    iconBg:
      "bg-[#015401] rounded-xl flex justify-center items-center h-12 w-12",
    bg: "border border-[#015401] rounded-xl flex flex-col items-center justify-center  p-3  md:px-5 md:py-10",
  },
  {
    header: "Priority Access",
    text: "Get first access to seasonal harvests and limited availability products.",
    icon: '/assets/svg/vault-5.svg',
    iconBg:
      "bg-[#4B5563] rounded-xl flex justify-center items-center h-12 w-12",
    bg: "border border-[#4B5563] rounded-xl flex flex-col items-center justify-center  p-3   md:px-5 md:py-10",
  },
  {
    header: "Inflation Protection",
    text: "Food credits in your vault are protected against price increases for up to 6 months.",
    icon: '/assets/svg/vault-6.svg',
    iconBg:
      "bg-[#22C55E] rounded-xl flex justify-center items-center h-12 w-12",
    bg: "border border-[#22C55E] rounded-xl flex flex-col items-center justify-center  p-3  md:px-5 md:py-10",
  },
];

const Foodvault = () => {
  return (
    <>
      <Head>
        <title>Farmstarck Food Vault - Smart Saving for Smarter Eating</title>
        <meta name="description" content="Create your Food Vault on Farmstarck for stress-free food access. Save gradually, earn rewards, and shop with exclusive discounts and priority access to fresh produce." />
        <meta name="keywords" content="Food Vault Farmstarck, food savings Nigeria Africa, digital food wallet platform, food budget protection app, food savings app Nigeria, inflation protection food vault, food rewards Nigeria platform, farming food savings, agricultural food vault, farm produce savings, food security wallet, digital food savings, food budget management, inflation hedge food, food rewards program, food savings technology, digital food security, food vault app, food savings platform, food budget protection, food inflation protection, food rewards system, food savings innovation, digital food wallet, food security app, food budget app, food savings digital, food inflation hedge, food rewards digital, food savings ecosystem, food budget technology, food security platform, food inflation protection, food rewards innovation, food savings digital wallet, food security digital, food budget digital, food savings app development, food inflation digital, food rewards app, food savings platform development, food security app development, food budget app development, food savings digital innovation, food inflation digital innovation, food rewards digital innovation, food savings ecosystem development, food budget technology development, food security platform development, food inflation protection development, food rewards innovation development" />
        <meta name="author" content="Farmstarck" />
        <meta property="og:title" content="Farmstarck Food Vault - Smart Saving for Smarter Eating" />
        <meta property="og:description" content="Create your Food Vault on Farmstarck for stress-free food access. Save gradually, earn rewards, and shop with exclusive discounts and priority access to fresh produce." />
        <meta property="og:image" content="/assets/images/landing-vault.png" />
        <meta property="og:url" content="https://farmstarck.com/marketing/foodvault" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Farmstarck Food Vault - Smart Saving for Smarter Eating" />
        <meta name="twitter:description" content="Create your Food Vault on Farmstarck for stress-free food access. Save gradually, earn rewards, and shop with exclusive discounts and priority access to fresh produce." />
        <meta name="twitter:image" content="/assets/images/landing-vault.png" />
        <link rel="canonical" href="https://farmstarck.com/marketing/foodvault" />
      </Head>
      <div className="flex flex-col">
      <div className="bg-[var(--lite)]">
        <div className="p-5 relative flex flex-col justify-center items-center ">
          <div className="w-full flex flex-col gap-3 md:gap-5 items-center ">
            <h2 className="uppercase text-sm md:text-base text-center text-[var(--dark-green)] font-subHeading leading-relaxed">
              our product
            </h2>
            <h1 className="font-subHeading text-2xl md:text-3xl text-[var(--dark-green)] font-extrabold">
              Food Vault
            </h1>
          </div>
          <div className="w-full max-w-5xl m-auto mt-5 md:mt-10 flex flex-col md:flex-row justify-between items-center bg-white rounded-2xl px-5 md:px-10 py-8  md:py-5">
            <div className="flex flex-col gap-3 md:gap-10 w-full md:w-2/3 items-center md:items-start">
              <div className="w-full flex flex-col items-center md:items-start gap-3 md:gap-10 m-auto pb-8">
                <h2 className="font-subHeading leading-tight text-center font-extrabold text-[var(--dark-green)] text-2xl sm:text-4xl md:text-5xl lg:text-6xl md:text-start">
                  Smart Saving for{" "}
                  <span className="text-[var(--primary)]">Smarter Eating</span>
                </h2>
                <p className="text-sm font-subHeading2 sm:text-base md:text-lg text-center md:text-start">
                  Food Vault is your digital wallet for stress-free food access.
                  Set your savings, track your progress, and shop with peace of
                  mind.
                </p>
                <div className="flex md:hidden w-full md:w-2/3 item-center">
                  <Image
                    height={600}
                    width={600}
                    src={`/assets/images/landing-vault.png`}
                    alt="market-img"
                    className="object-contain w-full h-auto min-w-[250px]"
                  />
                </div>
                <Link
                  href=""
                  className="px-20 self-auto text-center hover:border hover:border-[var(--primary)] py-3 md:py-4 bg-[var(--primary)] text-white text-base rounded-full font-btnBody transition-all duration-300 hover:bg-white hover:text-[var(--primary)]"
                >
                  Create Vault
                </Link>
              </div>
            </div>
            <div className="hidden md:block w-full md:w-2/3">
              <Image
                height={600}
                width={600}
                src={`/assets/images/landing-vault.png`}
                alt="market-img"
                className="object-contain w-full h-auto min-w-[350px]"
              />
            </div>
          </div>
        </div>
        <div className="px-5 py-10 md:py-20 relative flex flex-col justify-center items-center ">
          <div className="w-full flex flex-col gap-3 md:gap-5 items-center ">
            <h1 className="font-subHeading text-2xl md:text-4xl text-[var(--dark-green)] font-extrabold">
              How It Works
            </h1>
          </div>
          <div className="w-full max-w-5xl m-auto space-y-8 flex flex-col items-center">
            <p className="text-sm font-subHeading2 sm:text-base md:text-lg text-center">
              Our Food Vault helps you securely save for food purchases while
              earning exclusive benefits
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-y-5  md:gap-y-10 gap-x-3 md:gap-x-16  justify-center items-stretch">
              {howItWorksItem.map((item, i) => {
                return (
                  <div key={i} className={`${item.bg}`}>
                    <div className="space-y-3">
                      <h1 className={`${item.headerStyle} `}>{item.header}</h1>
                      <p className={`${item.textStyle}`}>{item.text}</p>
                    </div>
                    <Image
                      height={600}
                      width={600}
                      src={item.img}
                      alt={item.text}
                      className="object-contain w-1/2 md:w-full h-auto "
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div className="p-5 py-10 md:py-20 relative flex flex-col justify-center items-center ">
          <div className="w-full flex flex-col gap-3 md:gap-5 items-center ">
            <h1 className="font-subHeading text-2xl md:text-3xl text-[var(--dark-green)] font-extrabold">
              Why Food Vault?
            </h1>
          </div>
          <div className="w-full max-w-5xl m-auto space-y-8 flex flex-col items-center">
            <p className="text-sm font-semibold sm:text-base md:text-lg text-center">
              Join thousands of users already safeguarding their food budget and
              enjoying premium benefits
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 w-full gap-y-5 md:gap-y-10 gap-x-3 md:gap-x-16 items-center">
              {whyItem.map((item, i) => (
                <div key={i} className={item.bg}>
                  <div className={item.iconBg}>
                    <img src={item.icon} alt={item.header} className="w-4" />
                  </div>
                  <h2 className="font-bold text-[var(--dark-green)] text-center pt-2 text-sm md:text-base h-11 md:h-8">
                    {item.header}
                  </h2>
                  <p className=" pt-2 text-center text-sm font-bold2 h-28 md:h-14">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Faq accordionItems={FoodVaultAccordionItems} />
    </div>
    </>
  );
};

export default Foodvault;
