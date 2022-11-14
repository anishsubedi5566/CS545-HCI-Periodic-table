import React, { useEffect } from "react";
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  BarSeries,
} from "@devexpress/dx-react-chart-material-ui";
import { Paper } from "@mui/material";
import { AppUserGetDb } from "../Firebase";

const Progress = () => {
  let d = [];
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    AppUserGetDb().then((data) => {
      for (let i = 0; i < data.length; i++) {
        d = [
          ...d,
          {
            argument: String(i),
            value: data[i],
          },
        ];
      }
      setData(d);
      setLoading(false);
    });
  }, []);
  console.log("d", d);

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <Paper>
        <Chart data={data}>
          <ArgumentAxis />
          <ValueAxis />

          <BarSeries valueField="value" argumentField="argument" />
        </Chart>
      </Paper>
    );
  }
};

export default Progress;
