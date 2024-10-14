import React, { useState } from "react";
import "./styles.css";
import DateRangeFilter from "./DateRangeFilter";
import moment from "moment";
export default function App() {
  const [open, setOpen] = useState(false);
  const onChange = (ranges) => {
    if (
      moment(ranges.startDate).format("MM-DD-YYYY") !==
      moment(ranges.endDate).format("MM-DD-YYYY")
    ) {
      setOpen(false);
    } else if (ranges.startDate === "" && ranges.endDate === "") {
      setOpen(false);
    }
  };

  return (
    <div className="App">
      <DateRangeFilter onChange={onChange} open={open} setOpen={setOpen} />
    </div>
  );
}
