import {
  Button,
  Checkbox,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Ads, SubCampaigns } from "../types";
import { useMemo } from "react";
import { CHECKED } from "../constant";
type AdsProps = {
  selectedSubCamp: SubCampaigns;
  errorMode: boolean;
  onAddSubAds: () => void;
  onChangeSubAds: (item: Ads) => void;
  onDeleteSubAds: (id: string) => void;
  onCheckAll: (value: boolean) => void;
  onDeleteAll: () => void;
};
const CampAds: React.FC<AdsProps> = ({
  selectedSubCamp,
  errorMode,
  onAddSubAds,
  onChangeSubAds,
  onDeleteSubAds,
  onCheckAll,
  onDeleteAll,
}) => {
  const allChecked = useMemo(() => {
    return (
      selectedSubCamp.ads.every((item) => item.checked === CHECKED) &&
      selectedSubCamp.ads.length !== 0
    );
  }, [selectedSubCamp.ads]);

  const someChecked = useMemo(() => {
    return (
      selectedSubCamp.ads.some((item) => item.checked === CHECKED) && !allChecked
    );
  }, [selectedSubCamp.ads, allChecked]);

  const isValidAdsItemName = (item: Ads) => {
    return errorMode && item.name === "";
  };

  const isValidAdsItemQuantity = (item: Ads) => {
    return (
      (errorMode && item.quantity <= 0) ||
      (errorMode && Number.isNaN(item.quantity))
    );
  };

  return (
    <TableContainer component={Paper}>
      <Typography
        variant="h5"
        component="h5"
        style={{ textTransform: "uppercase" }}
      >
        Danh sách quảng cáo
      </Typography>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell width={20}>
              <FormControlLabel
                label=""
                control={
                  <Checkbox
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      onCheckAll(event.target.checked);
                    }}
                    sx={{
                      ".MuiCheckbox-indeterminate": {
                        color: "#ff0000",
                      },
                    }}
                    indeterminate={someChecked}
                    checked={allChecked}
                  />
                }
              />
            </TableCell>
            <TableCell>
              {someChecked || allChecked ? (
                <IconButton onClick={onDeleteAll}>
                  <DeleteIcon />
                </IconButton>
              ) : (
                "Tên quảng cáo*"
              )}
            </TableCell>
            <TableCell>
              {someChecked || allChecked ? "" : "Tên quảng cáo*"}
            </TableCell>
            <TableCell align="right">
              <Button
                style={{
                  padding: "5px 15px",
                  border: "2px solid rgb(33, 150, 243)",
                }}
                onClick={onAddSubAds}
              >
                + Thêm
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedSubCamp.ads?.map((item: Ads) => {
            return (
              <TableRow
                key={item.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  backgroundColor: `${
                    item.checked ? "rgba(245, 0, 87, 0.08);" : ""
                  }`,
                }}
              >
                <TableCell component="th" scope="row">
                  <FormControlLabel
                    label=""
                    control={
                      <Checkbox
                        name="camp"
                        onChange={() => {
                          onChangeSubAds({
                            ...item,
                            checked: !item.checked,
                          });
                        }}
                        value={item.checked}
                        checked={item.checked}
                      />
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="nameOfAds"
                    required
                    error={isValidAdsItemName(item)}
                    variant="standard"
                    fullWidth
                    value={item.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      onChangeSubAds({
                        ...item,
                        name: e.target.value,
                      })
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    InputProps={{
                      inputProps: { min: 0 },
                    }}
                    name="quantityOfAds"
                    type="number"
                    required
                    error={isValidAdsItemQuantity(item)}
                    variant="standard"
                    fullWidth
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      onChangeSubAds({
                        ...item,
                        quantity: parseInt(e.target.value),
                      });
                    }}
                    value={item.quantity}
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() => onDeleteSubAds(item.id)}
                    disabled={someChecked || allChecked}
                    sx={{
                      backgroundColor: `${
                        someChecked ? "rgba(0, 0, 0, 0.87)" : ""
                      }`,
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CampAds;
