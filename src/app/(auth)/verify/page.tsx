import VerificationForm from "./_components/verification-form";

export default async function Verify({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  return <VerificationForm mobile={params["mobile"] as string} />;
}
