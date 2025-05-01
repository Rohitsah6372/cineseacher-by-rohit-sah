import { NoData } from "neetoui";

const NoDataToShow = () => (
  <div className="flex h-full w-full items-center justify-center">
    <NoData
      title="There are no tickets to show"
      primaryButtonProps={{
        label: "Add new ticket",
      }}
    />
  </div>
);

export default NoDataToShow;
