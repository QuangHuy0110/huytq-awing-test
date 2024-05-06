import ControlPointIcon from "@mui/icons-material/ControlPoint";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import CampAds from "./CampAds";
import { subCampaignsSelector } from "../store/selector";
import CardItem from "./CardItem";
import { useAppContext } from "../store";
import { Ads, SubCampaigns } from "../types";
import { useEffect, useMemo, useState } from "react";
import { ADD_SUB_CAMPAINS } from "../constant";
import { generateUniqueId } from "../utils";

type SubCampProps = {
  errorMode: boolean;
};
const SubCamp: React.FC<SubCampProps> = ({ errorMode }) => {
  const subCampains = subCampaignsSelector();
  const { dispatch } = useAppContext();

  const [selectedSubCamp, setSelectedSubCamp] = useState<SubCampaigns>(
    subCampains[0]
  );
  const [toggle, setToggle] = useState<number>(0);
  useEffect(() => {
    setSelectedSubCamp(subCampains[0]);
  }, []);

  useEffect(() => {
    dispatch({
      type: "HANDLE_CHANGE_SUBCAMP",
      payload: selectedSubCamp,
    });
  }, [selectedSubCamp, dispatch]);

  useEffect(() => {
    setSelectedSubCamp(subCampains[subCampains.length - 1]);
  }, [toggle]);

  const handleAddSubCampaigns = () => {
    dispatch({
      type: ADD_SUB_CAMPAINS,
    });
    setToggle((prev) => prev + 1);
  };

  const handleClickCardItem = (id: string) => {
    const selectedItem = subCampains.find((item) => item.id === id);
    if (!selectedItem) return;
    setSelectedSubCamp(selectedItem);
  };

  const handleChangeSubCampaignsName = (value: string) => {
    setSelectedSubCamp((prev) => {
      return {
        ...prev,
        name: value,
      };
    });
  };

  const handleChangeSubCampaignsStatus = () => {
    setSelectedSubCamp((prev) => {
      return {
        ...prev,
        status: !prev.status,
      };
    });
  };
  const handleAddSubAds = () => {
    setSelectedSubCamp((prev) => {
      return {
        ...prev,
        ads: [
          ...prev.ads,
          {
            id: generateUniqueId(),
            name: `Quang cao ${prev.ads.length + 1}`,
            quantity: 0,
            checked: false,
          },
        ],
      };
    });
  };

  const handleChangeSubAddItem = (value: Ads) => {
    setSelectedSubCamp((prev) => {
      return {
        ...prev,
        ads: selectedSubCamp.ads.map((adsItem) =>
          adsItem.id === value.id ? value : adsItem
        ),
      };
    });
  };

  const handleDeleteAdsItem = (id: string) => {
    setSelectedSubCamp((prev) => {
      return {
        ...prev,
        ads: selectedSubCamp.ads.filter((adsItem) => adsItem.id !== id),
      };
    });
  };

  const handleCheckAll = (value: boolean) => {
    setSelectedSubCamp((prev) => {
      return {
        ...prev,
        ads: selectedSubCamp.ads.map((adsItem) => {
          return {
            ...adsItem,
            checked: value,
          };
        }),
      };
    });
  };

  const handleDeleteAll = () => {
    setSelectedSubCamp((prev) => {
      return {
        ...prev,
        ads: prev.ads.filter((item) => item.checked !== true),
      };
    });
  };

  const isValidSubCampName = useMemo(() => {
    return errorMode && selectedSubCamp.name === "";
  }, [errorMode, selectedSubCamp.name]);
  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          display: "flex",
          margin: "20px",
        }}
      >
        <IconButton onClick={handleAddSubCampaigns} sx={{
              "&.MuiButtonBase-root:hover": {
                bgcolor: "transparent"
              }
            }}>
          <ControlPointIcon
            fontSize="large"
            style={{ marginRight: 20, cursor: "pointer" }}
          />
        </IconButton>
        <Box
          sx={{
            width: "100%",
            overflow: "auto",
            display: "flex",
            pb: 1,
          }}
        >
          {subCampains.map((item) => {
            return (
              <CardItem
                selectedItem={selectedSubCamp}
                onSelectCard={handleClickCardItem}
                key={item.id}
                name={item.name}
                status={item.status}
                ads={item.ads}
                itemId={item.id}
                errorMode={errorMode}
              />
            );
          })}
        </Box>
      </Box>
      <Box>
        <Grid container spacing={2} sx={{ margin: "40px 0" }}>
          <Grid item xs={8}>
            <TextField
              fullWidth
              name="subCamp"
              label="Tên chiến dịch con"
              variant="standard"
              required
              value={selectedSubCamp.name}
              onChange={(e) => handleChangeSubCampaignsName(e.target.value)}
              error={isValidSubCampName}
              helperText={isValidSubCampName && "Dữ liệu không hợp lệ"}
            />
          </Grid>
          <Grid item xs={2} display="flex" justifyContent="center">
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedSubCamp.status}
                  onChange={handleChangeSubCampaignsStatus}
                />
              }
              label="Đang hoạt động"
            />
          </Grid>
        </Grid>
        <Box>
          <CampAds
            selectedSubCamp={selectedSubCamp}
            onAddSubAds={handleAddSubAds}
            onChangeSubAds={handleChangeSubAddItem}
            onDeleteSubAds={handleDeleteAdsItem}
            onCheckAll={handleCheckAll}
            onDeleteAll={handleDeleteAll}
            errorMode={errorMode}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SubCamp;
