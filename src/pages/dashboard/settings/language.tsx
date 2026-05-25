import React, { useState } from "react";
import { Check, ChevronLeft } from "lucide-react";
import { useRouter } from "next/router";
import SuccessModal from "@/components/common/status/SuccessModal";

const LanguageSelection = () => {
  const [selected, setSelected] = useState("English (UK)");
  const router = useRouter();

  const onSelectLanguage = (lang: string) => {
    setSelected(lang);
    // 👉 Optional: Store user preference via API
    console.log("Selected language:", lang);
  };

  const [verified, setVerified] = useState(false);

  const languages = [
    "English (UK)",
    "English (US)",
    "Yoruba",
    "Igbo",
    "Hausa",
    "French",
  ];

  return (
    <div className="px-4">
      <div className=" mb-6">
        <button
          onClick={() => router.back()}
          className="p-2 flex items-center gap-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft size={20} />
          <h1 className="text-xl lg:text-2xl font-bold text-gray-800">
            Language
          </h1>
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm">
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => onSelectLanguage(lang)}
            className="w-full flex items-center justify-between p-3  last:border-none hover:bg-gray-50 transition text-left"
          >
            <span className="text-gray-700">{lang}</span>

            {/* Green selection indicator */}
            <span
              className={`h-4 w-4 rounded-full flex items-center justify-center
                ${
                  selected === lang
                    ? "border-primary border-2"
                    : "border-gray-400 border"
                }`}
            >
              {selected === lang && (
                <div className="w-2 h-2 rounded-full bg-primary"></div>
              )}
            </span>
          </button>
        ))}
      </div>
      <div className="mt-5 w-full lg:w-fit  lg:ml-auto">
        <button
          onClick={() => setVerified(true)}
          className="w-full px-8 py-2 rounded-full text-white bg-primary"
        >
          Confirm Selection
        </button>
      </div>

      <SuccessModal
        isOpen={verified}
        title="You language preference has been updated successfully"
        onClose={() => setVerified(false)}
        back_cta={true}
        back_cta_title="Continue"
        back_cta_url="/dashboard/settings"
      />
    </div>
  );
};

export default LanguageSelection;
