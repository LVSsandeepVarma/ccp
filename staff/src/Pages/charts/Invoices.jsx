/* eslint-disable react/prop-types */
import ReactApexChart from "react-apexcharts";

export default function ApexDonutCharts({ series }) {
  let options = {
    series: series,
    labels: ["Completed", "Paid", "Partially Paid", "Unpaid"],
    plotOptions: {
      donut: {
        donutWidth: 0.3,
      },
    },
    chart: {
      type: "donut",
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#3cd188", "#687cfe", "#efae4e", "#ff7f5d"],
  };

  return (
    <>
      <div id="chart">
        <ReactApexChart
          series={series}
          options={options}
          type="donut"
          height={250}
        />
      </div>
    </>
  );
}
