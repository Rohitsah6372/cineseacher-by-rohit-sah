import React, { useState } from "react";

import { Delete } from "neetoicons";
import { Typography } from "neetoui";

import WarningModal from "./WarningModal";

const Item = React.forwardRef(({ id, selectedMovieId, title }, ref) => {
  const [isDeleted, setIsDeleted] = useState(false);

  return (
    <div
      ref={ref}
      className={`m-2 flex justify-between rounded-lg  shadow-md ${
        id === selectedMovieId ? "bg-blue-700 text-white" : "bg-blue-200"
      }  pl-2 ${isDeleted ? "animate-bounce   border-2 border-red-600" : ""} `}
    >
      <Typography className={`flex-1 truncate p-2 font-mono text-xs `}>
        {title}
      </Typography>
      <button
        className="flex h-8 w-8 items-center justify-center rounded bg-transparent transition duration-700 ease-in hover:border hover:border-red-500 hover:shadow-md"
        onClick={() => setIsDeleted(true)}
      >
        <Delete
          className={`h-4 w-4  rounded-3xl   hover:h-5 hover:w-5  ${
            id === selectedMovieId ? " text-white" : "text-gray-700"
          }  hover:text-red-700
      ${isDeleted ? "rotate-180 text-red-700   " : "rotate-0"}`}
        />
      </button>
      {isDeleted && <WarningModal {...{ id, title, setIsDeleted }} />}
    </div>
  );
});

Item.displayName = "ViewHistoryItem";

export default Item;
