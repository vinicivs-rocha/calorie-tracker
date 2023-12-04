import HomeHeader from "@/app/(protected-segment)/home/header";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HomeHeader />
      {children}
    </>
  );
}
