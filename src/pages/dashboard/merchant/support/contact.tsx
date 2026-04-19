import DashBoardWrapper from "@/components/dashboard/ui/DashBoardWrapper";
import Image from "next/image";
import Link from "next/link";
import { Mail, MessageCircleMore, Phone } from "lucide-react";

const socialLinks = [
  {
    href: "https://www.instagram.com/farmstarck/profilecard/?igsh=MWNrbzlic3drcGU2aw==",
    icon: "/assets/svg/instagram.svg",
    label: "Instagram",
  },
  {
    href: "https://www.facebook.com/",
    icon: "/assets/svg/facebook.svg",
    label: "Facebook",
  },
  {
    href: "https://wa.me/2348130395444",
    icon: "/assets/svg/ifexes.svg",
    label: "WhatsApp",
  },
  {
    href: "https://x.com/",
    icon: "/assets/svg/x.svg",
    label: "X",
  },
  {
    href: "https://www.linkedin.com/company/farmstarck/",
    icon: "/assets/svg/linkedin.svg",
    label: "LinkedIn",
  },
];

const ContactSupport = () => {
  return (
    <DashBoardWrapper
      href="/dashboard/merchant/support"
      label="Contact Support"
    >
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[420px] rounded-[28px] bg-[#FBFCFA] px-6 py-8 shadow-[0_20px_60px_rgba(38,57,77,0.08)]">
          <div className="flex flex-col gap-9">
            <Link
              href="https://wa.me/2348130395444"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 rounded-2xl bg-[#04D800] px-6 py-7 text-white shadow-[0_20px_45px_rgba(4,216,0,0.18)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#04D800]">
                <MessageCircleMore size={26} strokeWidth={2.2} />
              </span>
              <span className="text-[17px] font-semibold">Live Chat</span>
            </Link>

            <Link
              href="tel:+2348130395444"
              className="flex items-center gap-5 rounded-2xl bg-white px-6 py-8 shadow-[0_18px_40px_rgba(50,50,93,0.08)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#04D800] text-white">
                <Phone size={24} strokeWidth={2.3} />
              </span>
              <span className="text-[18px] font-semibold tracking-[-0.02em] text-[#22242A] sm:text-[19px]">
                +234 813 039 5444
              </span>
            </Link>

            <Link
              href="mailto:support@farmstarck.com"
              className="flex items-center gap-5 rounded-2xl bg-white px-6 py-8 shadow-[0_18px_40px_rgba(50,50,93,0.08)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FFB52D] text-white">
                <Mail size={24} strokeWidth={2.3} />
              </span>
              <span className="text-[18px] font-semibold tracking-[-0.02em] text-[#22242A] sm:text-[19px]">
                support@farmstarck.com
              </span>
            </Link>

            <div className="rounded-2xl bg-white px-6 py-7 shadow-[0_18px_40px_rgba(50,50,93,0.08)]">
              <div className="flex items-center justify-between gap-3">
                {socialLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D8DEE9] bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-sm"
                  >
                    <Image
                      src={item.icon}
                      alt={item.label}
                      width={24}
                      height={24}
                      className="h-6 w-6"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashBoardWrapper>
  );
};

export default ContactSupport;
