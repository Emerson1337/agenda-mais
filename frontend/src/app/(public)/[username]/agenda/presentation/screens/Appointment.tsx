import CustomMotion from "@/components/ui/custom-motion";
import LayoutOne from "../components/LayoutOne";

const Appointment = (): JSX.Element => {
  return (
    <CustomMotion>
      <div className="w-full h-screen bg-primary flex flex-col items-center justify-center overflow-hidden relative">
        <LayoutOne />
        {/* <LayoutTwo /> */}
      </div>
    </CustomMotion>
  );
};

export default Appointment;
