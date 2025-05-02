import React from "react";

import { Typography } from "neetoui";

const Item = React.forwardRef(({ id, selectedMovieId, title }, ref) => (
  <div
    ref={ref}
    className={`m-2 rounded-lg text-center shadow-md ${
      id === selectedMovieId ? "bg-blue-700 text-white" : "bg-blue-200"
    }`}
  >
    <Typography className="truncate p-2 font-medium">{title}</Typography>
  </div>
));

Item.displayName = "ViewHistoryItem";

export default Item;
