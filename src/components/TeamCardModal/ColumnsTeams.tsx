import teamsData from "./teamsData";
import { Box, List, Typography, useTheme } from "@mui/material";
import MemberItem from "./MemberItem";

interface ColumnsTeamsProps {
  columnIndices: number[];
}

const ColumnsTeams = ({ columnIndices }: ColumnsTeamsProps) => {
  const theme = useTheme();
  return (
    <Box
      key={columnIndices[0]}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "40px",
      }}
    >
      {columnIndices.map((index: number) => (
        <Box
          key={index}
          sx={{ width: "100%", textAlign: { xs: "center", md: "left" } }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: "18px",
              fontWeight: "600",
              lineHeight: "normal",
              color: theme.palette.primary.main,
            }}
          >
            {teamsData[index].role}
          </Typography>
          <List sx={{ padding: 0 }}>
            {teamsData[index].members.map((member, memIndex) => (
              <MemberItem key={memIndex} member={member} />
            ))}
          </List>
        </Box>
      ))}
    </Box>
  );
};

export default ColumnsTeams;
