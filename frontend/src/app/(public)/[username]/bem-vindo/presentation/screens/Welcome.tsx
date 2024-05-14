import Particles from "../components/Particles";
import { SparklesCore } from "../components/SparklesCore";
import OnboardingFlow from "../components/OnboardingFlow";

const Welcome = (): JSX.Element => {
  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center overflow-hidden relative">
      <div className="w-full h-40 absolute top-0">
        <Particles />
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]" />
      </div>
      <OnboardingFlow />
    </div>
  );
};

export default Welcome;
