import { Close } from "neetoicons";
import { Checkbox, Input, Typography } from "neetoui";

const FilterList = ({ setYear, setMovieType, setIsFilterOpen }) => (
  <div className=" absolute right-4 top-16 z-50 h-48 w-96 rounded-md bg-white p-4 shadow-xl">
    <div className="flex justify-end ">
      <button onClick={() => setIsFilterOpen(prev => !prev)}>
        <Close className="outline-none h-4  w-4 border-none text-red-600 hover:bg-red-600 hover:font-bold hover:text-white " />
      </button>
    </div>
    <div className="">
      <Input
        className="font-bold"
        label="Year"
        onChange={e => setYear(e.target.value)}
      />
    </div>
    <div className="mt-8">
      <Typography className="font-bold">Type</Typography>
      <div className="mt-2 flex">
        <Checkbox
          label="Movie"
          onChange={() => {
            setMovieType(prev => ({ ...prev, Movie: !prev.Movie }));
          }}
        />
        <Checkbox
          label="Series"
          onChange={() => {
            setMovieType(prev => ({
              ...prev,
              Series: !prev.Series,
            }));
          }}
        />
      </div>
    </div>
  </div>
);

export default FilterList;
