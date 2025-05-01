import React from "react";

import { Typography } from "neetoui";

const ViewHistoryItem = React.forwardRef(
  ({ id, selectedMovieId, title }, ref) => (
    <div
      className="m-2 rounded-lg bg-blue-200  text-center shadow-md"
      ref={ref}
    >
      <Typography
        className={`p-2 ${
          id === selectedMovieId ? "rounded-lg bg-blue-700 p-2 text-white" : ""
        }`}
      >
        {title}
      </Typography>
    </div>
  )
);

ViewHistoryItem.displayName = "ViewHistoryItem";

export default ViewHistoryItem;
