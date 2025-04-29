import logo from '@/src/assets/images/Helsa Logo brand white.png';
import banner from '@/src/assets/images/banner.png';
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-1 box-border h-full w-full lg:grid-cols-2">
      <div className="flex flex-col h-full justify-center items-center gap-10">
        <div className="flex justify-center gap-2 mt-2 items-center">
          <img src={logo.src} alt="logo" className="h-10 w-10 rounded-lg" />
          <h1 className="text-3xl font-semibold">Gonurse</h1>
        </div>
        <div className="w-full">{children}</div>
      </div>
      <div className="overflow-hidden hidden flex-row box-border w-full lg:flex">
        <div className="hidden bg-sidebar w-full h-full justify-center items-center lg:flex">
          <img src={banner.src} alt="banner" className="h-full object-contain"></img>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
