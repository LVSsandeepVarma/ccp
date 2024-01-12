/* eslint-disable react/prop-types */
import ReactApexChart from "react-apexcharts";

export default function ApexCharts({ NOP, Revenue, AP }) {
  const series = [
    {
      name: "Number of Projects",
      type: "column",
      data: NOP,
      color: "rgba(104, 124, 254,0.8)",
    },
    {
      name: "Revenue",
      type: "column",
      data: Revenue,
      color: "rgba(247, 102, 110,0.7)",
    },
    {
      name: "Active Projects",
      type: "area",
      data: AP,
      color: "#ff7f5d",
    },
  ];
  let options = {
    chart: {
      height: 350,
      type: "dashed",
      stacked: false,
    },
    stroke: {
      width: [2, 2, 2],
      curve: "smooth",
      dashArray: [0, 0, 5],
    },
    plotOptions: {
      bar: {
        columnWidth: "35%",
      },
    },

    fill: {
      opacity: [0.8, 0.5, 0.1],
      gradient: {
        inverseColors: false,
        shade: "light",
        type: "vertical",
        opacityFrom: 0.5,
        opacityTo: 0.1,
        stops: [0, 100, 100, 100],
      },
    },

    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ],
    markers: {
      size: 5,
    },
    xaxis: {
      type: "text",
    },
    yaxis: {
      title: {
        text: "Points",
      },
      min: 0,
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return y.toFixed(0) + " points";
          }
          return y;
        },
      },
    },
  };

  return (
    <>
      <div id="chart">
        <ReactApexChart
          series={series}
          options={options}
          type="line"
          height={350}
        />
      </div>
    </>
  );
}
