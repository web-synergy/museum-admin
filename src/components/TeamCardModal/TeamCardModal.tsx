import {
  Box,
  IconButton,
  Modal,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import teamsData from "./teamsData";
import SvgSpriteIcon from "../Common/SvgSprite";
import ColumnsTeams from "./ColumnsTeams";
import { ModalContainer } from "./styles";

interface IModalTeamCard {
  handleClose: () => void;
  open: boolean;
}

const TeamCardModal = ({ handleClose, open }: IModalTeamCard) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const getTeamCardColumn = () => {
    if (isSmallScreen) {
      return teamsData.map((_, index) => [index]);
    }

    return [
      [0, 3, 4],
      [1, 5],
      [2, 6],
    ];
  };

  const columnOrder = getTeamCardColumn();

  return (
    <Modal open={open} onClose={handleClose}>
      <ModalContainer>
        <IconButton
          onClick={() => {
            handleClose();
          }}
          aria-label="close form"
          sx={{
            color: theme.palette.common.white,
            backgroundColor: "inherit",
            p: 0,
            position: "absolute",
            top: "16px",
            right: "16px",
            transition: "color 0.3s ease-in-out",
          }}
        >
          <SvgSpriteIcon fontSize="large" iconId="close" />
        </IconButton>
        <Box sx={{ width: "100%", textAlign: "center" }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "600", lineHeight: "normal" }}
          >
            Our great team
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: { md: "space-between" },
            marginTop: "32px",
            gap: "40px",
          }}
        >
          {columnOrder.map((columnIndices, index) => (
            <ColumnsTeams key={index} columnIndices={columnIndices} />
          ))}
        </Box>
      </ModalContainer>
    </Modal>
  );
};

export default TeamCardModal;
