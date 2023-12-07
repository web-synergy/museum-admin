import { Link, ListItem, useTheme } from "@mui/material";

interface ListItemProps {
  member: { link: string; name: string };
}

const MemberItem = ({ member }: ListItemProps) => {
  const theme = useTheme();
  return (
    <ListItem
      sx={{
        justifyContent: { xs: "center", md: "start" },
        width: "100%",
        padding: 0,
        textAlign: { xs: "center", md: "left" },
        fontSize: "18px",
        fontWeight: "500",
        lineHeight: "normal",
        marginTop: { xs: "8px", md: "12px" },
        color: theme.palette.common.white,
      }}
    >
      <Link
        href={member.link}
        underline="hover"
        sx={{
          color: "inherit",
          textAlign: { xs: "center", md: "center" },
          transition: "color 0.3s ease-out",
          "&:hover": {
            color: theme.palette.action.hover,
          },
        }}
        target="_blank"
      >
        {member.name}
      </Link>
    </ListItem>
  );
};

export default MemberItem;
