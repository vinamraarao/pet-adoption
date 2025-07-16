import React from "react";
import AdoptSection from "./AdoptSection";
import PostPetSection from "./PostPetSection";

const Services = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "50px", padding: "20px" }}>
      <AdoptSection />
      <PostPetSection />
    </div>
  );
};

export default Services;
