// import React, { useEffect } from "react";
// import { Button, Container, Typography, Box } from "@mui/material";
// import { styled } from "@mui/system";
// import { useNavigate } from "react-router-dom"; 

// import girlHoldingADog from "../Assets/girlHoldingADog.png";
// import HomeDarkCardLeftPic from "../Assets/HomeDarkCardLeftPic.png";
// import HomeDarkCardRightPic from "../Assets/HomeDarkCardRightPic.png";

// // Styled Components
// const MainContainer = styled(Box)({
//   width: "100%",
//   minHeight: "100vh",
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "center",
//   alignItems: "center",
//   backgroundColor: "#fff",
// });

// const HeroSection = styled(Box)({
//   width: "100%",
//   maxWidth: "2000px",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "space-between",
//   padding: "50px 20px",
// });

// const Heading = styled(Typography)({
//   fontSize: "3.5rem",
//   fontWeight: "bold",
//   lineHeight: "1.2",
// });

// const Subtext = styled(Typography)({
//   fontSize: "1.5rem",
//   color: "#555",
//   marginTop: "15px",
//   maxWidth: "500px",
// });

// const AdoptButton = styled(Button)({
//   backgroundColor: "#FF9800",
//   color: "#fff",
//   fontSize: "18px",
//   padding: "12px 24px",
//   borderRadius: "25px",
//   marginTop: "20px",
//   "&:hover": {
//     backgroundColor: "#F57C00",
//   },
// });

// const PetStatsSection = styled(Box)({
//   width: "100%",
//   backgroundColor: "#1a1a2e",
//   color: "#fff",
//   padding: "30px 20px",
//   textAlign: "center",
//   borderRadius: "10px",
//   marginTop: "30px",
// });

// const InfoBox = styled(Box)({
//   width: "100%",
//   maxWidth: "1200px",
//   display: "flex",
//   justifyContent: "space-between",
//   marginTop: "30px",
// });

// const InfoCard = styled(Box)({
//   width: "30%",
//   textAlign: "center",
// });

// const Home = () => {
//   const navigate = useNavigate();

//   // 🔹 CHECK IF USER IS AUTHENTICATED
//   useEffect(() => {
//     const token = localStorage.getItem("token"); // Changed from "userToken" to "token"
//     console.log("Home component mounted:", { token });

//     if (!token) {
//       console.log("No token found in Home, redirecting to /login");
//       navigate("/login", { replace: true });
//     }
//   }, [navigate]);

//   return (
//     <MainContainer>
//       {/* Hero Section */}
//       <HeroSection>
//         <Box sx={{ ml: 8, fontStyle: "italic" }}>
//           <Heading>
//             Your Pets <br /> Are Our <br /> Priority
//           </Heading>
//           <Subtext>
//             Ensure you are fully prepared to provide proper care and attention
//             to your pet before welcoming them into your home.
//           </Subtext>
//           <AdoptButton variant="contained" onClick={() => navigate("/pets")}>
//             Adopt a Pet
//           </AdoptButton>
//         </Box>
//         <Box sx={{ mr: 7 }}>
//           <img src={girlHoldingADog} alt="Woman with Pet" width="400px" />
//         </Box>
//       </HeroSection>

//       {/* Stats Section */}
//       <PetStatsSection
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           backgroundColor: "#1a1a2e",
//           color: "#fff",
//           padding: "30px 50px",
//           borderRadius: "20px",
//           position: "relative",
//           maxWidth: "1200px",
//           margin: "30px auto",
//         }}
//       >
//         {/* Left Dog Image */}
//         <img
//           src={HomeDarkCardLeftPic}
//           alt="Dog Left"
//           style={{
//             width: "160px",
//             position: "absolute",
//             left: "-40px",
//             top: "50%",
//             transform: "translateY(-50%)",
//           }}
//         />

//         {/* Center Text */}
//         <Box sx={{ textAlign: "center", flex: 1 }}>
//           <Typography variant="h4" sx={{ fontWeight: "bold" }}>
//             1.2k+ Furry Friends
//           </Typography>
//           <Typography>Living Their Best Lives</Typography>
//         </Box>

//         {/* Right Section (Text + Dog Image) */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//           <Box sx={{ maxWidth: "300px" }}>
//             <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#FFA500" }}>
//               WHAT WE DO?
//             </Typography>
//             <Typography>
//               With a focus on matching the right pet with the right family, PawFinds makes it easy to adopt love and foster happiness.
//             </Typography>
//           </Box>

//           <img
//             src={HomeDarkCardRightPic}
//             alt="Dog Right"
//             style={{
//               width: "140px",
//               position: "absolute",
//               right: "-100px",
//               top: "50%",
//               transform: "translateY(-50%)",
//             }}
//           />
//         </Box>
//       </PetStatsSection>

//       {/* Information Boxes */}
//       <InfoBox>
//         <InfoCard>
//           <Typography variant="h6" color="orange">
//             The Joy of Pet Adoption
//           </Typography>
//           <Typography>
//             Bringing a pet into your life can be incredibly rewarding, not just
//             for you but for the furry friend you welcome into your home.
//           </Typography>
//         </InfoCard>
//         <InfoCard>
//           <Typography variant="h6" color="orange">
//             A Guide to Pet Adoption
//           </Typography>
//           <Typography>
//             Finding the ideal companion involves careful thought, research, and
//             planning, but the rewards are immeasurable.
//           </Typography>
//         </InfoCard>
//         <InfoCard>
//           <Typography variant="h6" color="orange">
//             Healing Power of Animals
//           </Typography>
//           <Typography>
//             Animals have an extraordinary ability to touch our lives in profound
//             ways, offering companionship and emotional well-being.
//           </Typography>
//         </InfoCard>
//       </InfoBox>
//     </MainContainer>
//   );
// };

// export default Home;





import React, { useEffect } from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

import girlHoldingADog from "../Assets/girlHoldingADog.png";
import HomeDarkCardLeftPic from "../Assets/HomeDarkCardLeftPic.png";
import HomeDarkCardRightPic from "../Assets/HomeDarkCardRightPic.png";

// Styled Components
const MainContainer = styled(Box)({
  width: "100%",
  minHeight: "100vh",
  paddingBottom: "100px", // ✅ space before footer
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#fff",
});

const HeroSection = styled(Box)({
  width: "100%",
  maxWidth: "2000px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "50px 20px",
});

const Heading = styled(Typography)({
  fontSize: "3.5rem",
  fontWeight: "bold",
  lineHeight: "1.2",
});

const Subtext = styled(Typography)({
  fontSize: "1.5rem",
  color: "#555",
  marginTop: "15px",
  maxWidth: "500px",
});

const AdoptButton = styled(Button)({
  backgroundColor: "#FF9800",
  color: "#fff",
  fontSize: "18px",
  padding: "12px 24px",
  borderRadius: "25px",
  marginTop: "20px",
  "&:hover": {
    backgroundColor: "#F57C00",
  },
});

const PetStatsSection = styled(Box)({
  width: "100%",
  backgroundColor: "#1a1a2e",
  color: "#fff",
  padding: "30px 20px",
  textAlign: "center",
  borderRadius: "10px",
  marginTop: "30px",
});

const InfoBox = styled(Box)({
  width: "100%",
  maxWidth: "1200px",
  display: "flex",
  justifyContent: "space-between",
  marginTop: "30px",
});

const InfoCard = styled(Box)({
  width: "30%",
  textAlign: "center",
});

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return (
    <MainContainer>
      {/* Hero Section */}
      <HeroSection>
        <Box sx={{ ml: 8, fontStyle: "italic" }}>
          <Heading>
            Your Pets <br /> Are Our <br /> Priority
          </Heading>
          <Subtext>
            Ensure you are fully prepared to provide proper care and attention
            to your pet before welcoming them into your home.
          </Subtext>
          <AdoptButton variant="contained" onClick={() => navigate("/pets")}>
            Adopt a Pet
          </AdoptButton>
        </Box>
        <Box sx={{ mr: 7 }}>
          <img src={girlHoldingADog} alt="Woman with Pet" width="400px" />
        </Box>
      </HeroSection>

      {/* Stats Section */}
      <PetStatsSection
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#1a1a2e",
          color: "#fff",
          padding: "30px 50px",
          borderRadius: "20px",
          position: "relative",
          maxWidth: "1200px",
          margin: "30px auto",
        }}
      >
        {/* Left Dog Image */}
        <img
          src={HomeDarkCardLeftPic}
          alt="Dog Left"
          style={{
            width: "160px",
            position: "absolute",
            left: "-40px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />

        {/* Center Text */}
        <Box sx={{ textAlign: "center", flex: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            1.2k+ Furry Friends
          </Typography>
          <Typography>Living Their Best Lives</Typography>
        </Box>

        {/* Right Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ maxWidth: "300px" }}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#FFA500" }}>
              WHAT WE DO?
            </Typography>
            <Typography>
              With a focus on matching the right pet with the right family, PawFinds makes it easy to adopt love and foster happiness.
            </Typography>
          </Box>

          <img
            src={HomeDarkCardRightPic}
            alt="Dog Right"
            style={{
              width: "140px",
              position: "absolute",
              right: "-100px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          />
        </Box>
      </PetStatsSection>

      {/* Information Boxes */}
      <InfoBox>
        <InfoCard>
          <Typography variant="h6" color="orange">
            The Joy of Pet Adoption
          </Typography>
          <Typography>
            Bringing a pet into your life can be incredibly rewarding, not just
            for you but for the furry friend you welcome into your home.
          </Typography>
        </InfoCard>
        <InfoCard>
          <Typography variant="h6" color="orange">
            A Guide to Pet Adoption
          </Typography>
          <Typography>
            Finding the ideal companion involves careful thought, research, and
            planning, but the rewards are immeasurable.
          </Typography>
        </InfoCard>
        <InfoCard>
          <Typography variant="h6" color="orange">
            Healing Power of Animals
          </Typography>
          <Typography>
            Animals have an extraordinary ability to touch our lives in profound
            ways, offering companionship and emotional well-being.
          </Typography>
        </InfoCard>
      </InfoBox>
    </MainContainer>
  );
};

export default Home;
