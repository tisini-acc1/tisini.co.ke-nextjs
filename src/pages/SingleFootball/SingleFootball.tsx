import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import { ReactNode, useState } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useQuery } from "@tanstack/react-query";
import Typography from "@mui/material/Typography";

import FootballStats from "./FootballStats";
import { tokens } from "@/theme/ScoresTheme";
import FootballHeader from "./FootballHeader";
import FootballLineUps from "./FootballLineUps";
import FootballScorers from "./FootballScorers";
import FetchFixtureById from "@/lib/scores/FetchFixtureById";

interface TabPanelProps {
  children?: ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function SingleFootball() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { fixtureId } = useParams();

  const { data, isLoading } = useQuery(["footballById"], () =>
    FetchFixtureById(fixtureId)
  );

  const details = data?.data[0][0];
  const home = data?.data[1];
  const away = data?.data[2];
  const scores = data?.data[3];
  const lineups = data?.data[4];
  const cards = data?.data[5];
  const fouls = data?.data[6];

  const [value, setValue] = useState(1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container>
      <Grid item xs={12} p={1}>
        <Box bgcolor={colors.primary[300]} sx={{ width: "100%" }}>
          <FootballHeader teams={details} scores={scores} />
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="secondary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Lineups" {...a11yProps(0)} />
              <Tab label="Team stats" {...a11yProps(1)} />
              <Tab label="Top scorers" {...a11yProps(2)} disabled />
            </Tabs>
          </AppBar>

          <TabPanel value={value} index={0} dir={theme.direction}>
            <FootballLineUps teams={details} squads={lineups} />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <FootballStats
              home={home}
              away={away}
              cards={cards}
              fouls={fouls}
            />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <FootballScorers />
          </TabPanel>
        </Box>
      </Grid>
    </Grid>
  );
}
