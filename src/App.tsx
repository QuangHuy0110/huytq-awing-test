import { Box, Button, Grid, Tab, Tabs } from "@mui/material";
import "./App.css";
import { useAppContext } from "./store";
import { useState } from "react";
import InfoCamp from "./Components/CampForm";
import TabPanel from "./Components/TabPanel";
import { Information } from "./types";
import SubCamp from "./Components/SubCamp";
import { errorSelector } from "./store/selector";
import { CHANGE_INFO_DESC, CHANGE_INFO_NAME } from "./constant";
import { formatCampains } from "./utils";

function App() {
  const { state, dispatch } = useAppContext();
  const checkError = errorSelector();
  const [errorMode, setErrorMode] = useState(false);
  const [tab, setTab] = useState<number>(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };
  const handleChangeInfor = (field: keyof Information, value: string) => {
    const type = field === "name" ? CHANGE_INFO_NAME : CHANGE_INFO_DESC;
    dispatch({
      type,
      payload: value,
    });
  };

  const handleSubmit = () => {
    if (checkError) {
      alert("Vui lòng điền đúng và đầy đủ thông tin");
    } else {
      alert(JSON.stringify(formatCampains(state)));
    }
    setErrorMode(true);
  };
  return (
    <>
      <Grid container style={{ display: "flex", justifyContent: "end" }}>
        <Button
          style={{ backgroundColor: "#3f51b5" }}
          variant="contained"
          onClick={handleSubmit}
          sx={{ mb: 1 }}
        >
          Submit
        </Button>
      </Grid>
      <hr />
      <Grid container>
        <Box
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            boxShadow: 3,
            borderRadius: "5px",
          }}
        >
          <Tabs
            value={tab}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            sx={{ borderBottom: 1, borderColor: "grey.500" }}
          >
            <Tab sx={{ p: 1 }} label="thông tin" />
            <Tab sx={{ p: 1 }} label="chiến dịch con" />
          </Tabs>
          {/* Tab 1 */}
          <TabPanel value={tab} index={0}>
            <InfoCamp onChangeInfor={handleChangeInfor} errorMode={errorMode} />
          </TabPanel>
          {/* Tab 2 */}
          <TabPanel value={tab} index={1}>
            <SubCamp errorMode={errorMode} />
          </TabPanel>
        </Box>
      </Grid>
    </>
  );
}

export default App;
