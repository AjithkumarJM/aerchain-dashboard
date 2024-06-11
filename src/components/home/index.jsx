import { Box } from "@mui/material";
import Cards from "../cards/Cards";

const Home = () => {
  return (
    <Box
      padding={2}
      bgcolor="#F9F9F9"
      height="calc(100vh - 50px)"
      sx={{
        display: "flex",
      }}
    >
      <Cards />
    </Box>
  );
};

export default Home;
