import Particles from "../components/Particles";
import { SparklesCore } from "../components/SparklesCore";
import OnboardingFlow from "../components/OnboardingFlow";
import "@/shared/styles/globals.css";

const Welcome = async () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center overflow-hidden relative">
      <div className="w-full h-40 absolute top-0">
        <Particles />
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
        />
        <div className="absolute bg-gradient-to-t from-background to-transparent inset-0 w-full h-full bg-background [mask-image:radial-gradient(350px_200px_at_top,transparent_30%,white)]" />
      </div>
      <OnboardingFlow />
    </div>
  );
};

export default Welcome;
