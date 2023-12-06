import Section from "@/components/Common/Section";
import { FC, useState } from "react";
import { Link, styled, useMediaQuery, useTheme } from "@mui/material";
import { FooterBox, FooterText, MainContainer } from "../styles";
import TeamCardModal from "@/components/TeamCardModal/TeamCardModal";

const TextLink = styled(Link)(({ theme }) => ({
  color: "inherit",
  textDecoration: "none",
  borderBottom: "solid 1px",
  cursor: "pointer",
  transition: "color 0.3s ease-out",
  ":hover": {
    color: theme.palette.primary.main,
  },
}));

const LoginFooter: FC = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Section variant="dark">
      <FooterBox>
        <MainContainer>
          <FooterText>
            <>
              {"\u00A9 Created by "}
              <TextLink
                sx={{ color: "#A17D21" }}
                underline="always"
                onClick={handleClick}
              >
                team
              </TextLink>
              {"."}
              {isMobile ? <br /> : ""}

              {" Всі права захищені"}
            </>
          </FooterText>
        </MainContainer>
      </FooterBox>
      <TeamCardModal handleClose={handleClick} open={open} />
    </Section>
  );
};

export default LoginFooter;
