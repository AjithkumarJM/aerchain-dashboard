import { Box } from "@mui/material";
import Logo from "../../assets/logo.png";

const Header = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: "56px",
        boxShadow: '0 -6px 10px 5px rgba(0,0,0,0.5)',
      }}
    >
      <Box margin={5}>
        <img src={Logo} height={18} width={123} alt="logo.png" />
      </Box>
    </Box>
  );
};
export default Header;
