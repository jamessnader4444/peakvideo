import { CircularProgress } from "@mui/material";

export default function Spinner() {
  return (
    <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2">
      <CircularProgress />
    </div>
  );
}
