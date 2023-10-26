import { FC } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { RotatingLines } from "react-loader-spinner";

interface LoaderProps {
  visible: boolean;
}

const Loader: FC<LoaderProps> = ({ visible }) => {
  const theme = useTheme();

  // Визначаємо тип екрану та встановлюємо розмір для Loader
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const isTablet = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const loaderSize = isDesktop ? "80" : isTablet ? "60" : "40";

  return (
    <Box
      sx={{
        display: visible ? "grid" : "none",
        placeItems: "center",
        height: "50vh",
      }}
    >
      <RotatingLines
        strokeColor={theme.palette.primary.main}
        strokeWidth="5"
        animationDuration="0.75"
        width={loaderSize}
        visible={true}
      />
    </Box>
  );
};

export default Loader;
