import HomeHeader from "@/app/ui/home/header";

export default function HomeLayout({children}: { children: React.ReactNode}) {
  return (
    <>
      <HomeHeader/>
      {children}
    </>
  )
}