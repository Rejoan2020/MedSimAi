import ResponsiveCircle from "@/components/ResponsiveCircle";
import Tab from "@/components/Tab";

export default function Home() {
  return (
    <div className="flex justify-center m-4">
      {/* <Tab number = {1} title = {"Referral"}/> */}
      <ResponsiveCircle percentage = {32}/>
    </div>
  );
}
