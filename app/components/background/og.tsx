import { StaticMeshGradient } from "@paper-design/shaders-react";

const Og = () => {
  return (
    <StaticMeshGradient
      width={1200}
      height={630}
      colors={["#000000", "#555555"]}
      grainMixer={0}
      grainOverlay={0}
      speed={1}
    />
  );
};

export { Og };
