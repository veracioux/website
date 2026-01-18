import AppSwitcher from "@/components/AppSwitcher";
import Chat from "@/components/Chat";

export default function Page() {
  return (
    <>
      <div className="h-screen w-screen">
        <AppSwitcher></AppSwitcher>
        <div className="h-full mx-auto md:max-w-[70vw] p-12 flex flex-col items-center justify-between">
          <Chat></Chat>
        </div>
      </div>
    </>
  );
}
