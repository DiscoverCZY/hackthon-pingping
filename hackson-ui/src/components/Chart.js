import React from "react";
import Apexcharts from "react-apexcharts";
import { Send, Delete as DeleteIcon, Polyline } from '@mui/icons-material';

const Chart = (props) => {
  const { id, name, categories, data, ...chartProps } = props;
  const config = {
    options: {
      chart: {
        id
      },
      xaxis: {
        categories: categories || [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
      }
    },
    series: [
      {
        name: name || "series-1",
        data: data || [30, 40, 45, 50, 49, 60, 70, 91]
      }
    ]
  };
  return (
    <Apexcharts
      options={config.options}
      series={config.series}
      type="bar"
      width="500"
      toolbar={{
        show: true,
        tools: {
          customIcons: [{
            icon: DeleteIcon,
            index: 4,
            title: 'tooltip of the icon',
            class: 'custom-icon',
            click: function (chart, options, e) {
              console.log("clicked custom-icon")
            }
          }]
        }
      }}
      {...chartProps}
    />
  );
};

export default Chart;