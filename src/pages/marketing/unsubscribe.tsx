// pages/marketing/unsubscribe.tsx
import UnsubscribeClient from "@/components/common/Marketing/Newsletter/UnsubscribeClient";

export async function getServerSideProps({
  query,
}: {
  query: { email: string };
}) {
  const email = query.email;

  if (!email) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      email,
    },
  };
}

export default function UnsubscribePage({ email }: { email: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <UnsubscribeClient email={email} />
    </div>
  );
}
