import { Card, Tooltip, Typography } from "@mui/material";
import React, { useMemo } from "react";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { Ads, SubCampaigns } from "../types";
type CartItemProp = {
  itemId: string;
  name: string;
  status: boolean;
  ads: Ads[];
  selectedItem: SubCampaigns;
  errorMode: boolean;
  onSelectCard: (id: string) => void;
};
const CardItem: React.FC<CartItemProp> = ({
  itemId,
  name,
  status,
  ads,
  selectedItem,
  errorMode,
  onSelectCard,
}) => {
  const totalQuantity = useMemo(() => {
    return ads.reduce((acc, cur) => {
      let quantity = cur.quantity;
      if (Number.isNaN(cur.quantity)) {
        quantity = 0;
      }
      return acc + quantity;
    }, 0);
  }, [ads]);

  const isError = () => {
    return (
      name === "" ||
      ads.some((item) => item.quantity <= 0 || Number.isNaN(item.quantity))
    );
  };
  console.log(errorMode && isError(), `isError`);
  return (
    <Card
      sx={{
        width: "210px",
        height: "124px",
        ml: 2,
        boxShadow: 3,
        flexShrink: 0,
      }}
      className={selectedItem.id === itemId ? "active-card" : ""}
      onClick={() => onSelectCard(itemId)}
    >
      <Tooltip title={name} arrow placement="top">
        <Typography
          style={{ padding: "10px" }}
          textAlign="center"
          color={errorMode && isError() ? "red" : ""}
        >
          {name}
          <CheckCircleRoundedIcon
            fontSize="small"
            color={status ? "success" : "action"}
            style={{ position: "relative", top: 3.5 }}
          />
        </Typography>
      </Tooltip>
      <Tooltip title="Số lượng" arrow placement="left">
        <Typography variant="h6" textAlign="center">
          {totalQuantity}
        </Typography>
      </Tooltip>
    </Card>
  );
};

export default CardItem;
