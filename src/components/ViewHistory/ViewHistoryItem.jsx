import React from "react";

import { Typography } from "neetoui";

const ViewHistoryItem = React.forwardRef(({ title }, ref) => (
  <div
    className="m-2 rounded-lg bg-blue-200 p-1 text-center shadow-md"
    ref={ref}
  >
    <Typography className="text-md font-serif">{title}</Typography>
  </div>
));

ViewHistoryItem.displayName = "ViewHistoryItem";

export default ViewHistoryItem;
