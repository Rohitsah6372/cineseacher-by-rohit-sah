import { Button, Typography } from "neetoui";
import { Link } from "react-router-dom";

const PageNotFound = () => (
  <div className="absolute left-1/3 top-1/3">
    <Typography style="h1">
      The page you are looking for cant be found
    </Typography>
    <Link to="/">
      <Button label="Go Back" style="primary" />
    </Link>
  </div>
);

export default PageNotFound;
