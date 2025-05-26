export default function Tes() {
  return (
    <div>
      <ResponsiveText />
    </div>
  );
}
function ResponsiveText() {
  return (
    <div className=" flex flex-col ">
      <span className="font-poppins font-[1000] text-[48px]">
        Sedap<b className="text-green-500">.</b>
      </span>
      <span className="text-gray-400 font-semibold font-barlow">
        Modern Admin Dashboard
      </span>
    </div>
  );
}
