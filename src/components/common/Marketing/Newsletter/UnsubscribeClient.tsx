"use client";

import Link from "next/link";
import { useState } from "react";
import CommunityService from "@/services/community.service";
import { renderAxiosOrAuthError } from "@/lib/axios-client";
import { SuccessMessage, ErrorMessage } from "@/utils/PageUtils";
import { useRouter } from "next/navigation";

function UnsubscribeClient({ email }: { email: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUnsubscribe = async () => {
    try {
      setLoading(true);
      await CommunityService.unsubscribeFromNewsletter({ email });
      SuccessMessage("Unsubscribed successfully");
      router.push("/");
    } catch (error) {
      const msg = renderAxiosOrAuthError(error);
      ErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl text-main-blue font-bold">
        Are you sure you want to unsubscribe?
      </h1>
      <div className="flex flex-col gap-4 items-center">
        <button
          disabled={loading}
          onClick={handleUnsubscribe}
          className="h-11 text-white rounded-sm w-40 bg-primary"
        >
          {loading ? "Unsubscribing" : "Yes, Unsubscribe Me"}
        </button>
        <button disabled={loading} className="h-11  rounded-sm w-40">
          <Link href="/">Cancel</Link>
        </button>
      </div>
    </div>
  );
}

export default UnsubscribeClient;
