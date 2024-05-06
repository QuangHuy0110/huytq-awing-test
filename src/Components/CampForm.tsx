import { Box, TextField } from "@mui/material";
import { Information } from "../types";
import { informationSelector } from "../store/selector";
import { useMemo } from "react";
import React from "react";

interface IInfoCamp {
  errorMode: boolean;
  onChangeInfor: (field: keyof Information, value: string) => void;
}

const InfoCamp: React.FC<IInfoCamp> = ({ onChangeInfor, errorMode }) => {
  const { name, describe } = informationSelector();
  const isError = useMemo(() => {
    return errorMode && name === "";
  }, [errorMode, name]);
  return (
    <Box sx={{ p: 2 }}>
      <TextField
        sx={{ m: 2 }}
        label="Tên chiến dịch"
        variant="standard"
        fullWidth
        value={name}
        onChange={(event) => onChangeInfor("name", event.target.value)}
        name="name"
        error={isError}
        helperText={isError && "Dữ liệu không hợp lệ"}
        required
      />
      <TextField
        sx={{ m: 2 }}
        label="Mô tả"
        variant="standard"
        fullWidth
        value={describe}
        onChange={(event) => onChangeInfor("describe", event.target.value)}
        name="describe"
      />
    </Box>
  );
};

export default InfoCamp;
