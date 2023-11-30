import HomeHeader from "@/app/ui/home/header/header";

export default function HomeLayout({children}: { children: React.ReactNode}) {
  return (
    <>
      <HomeHeader/>
      {children}
    </>
  )
}