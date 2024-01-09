// // DailyChart.js

// import React, { useEffect } from "react";
// import Chart from "react-google-charts";

// const DailyChart = ({ data }) => {
//     useEffect(() => {
//         // Kiểm tra xem dữ liệu có tồn tại không
//         if (data && data.length > 0) {
//             // Thực hiện vẽ biểu đồ
//             drawChart();
//         }
//     }, [data]);

//     const drawChart = () => {
//         // Vẽ biểu đồ với dữ liệu đã được kiểm tra
//         // ...
//     };

//     return (
//         <Chart
//             chartType="LineChart"
//             loader={<div>Loading Daily Chart</div>}
//             data={data}
//             options={{
//                 title: "Thống kê doanh thu theo ngày",
//                 curveType: "function",
//                 legend: { position: "bottom" },
//                 hAxis: { format: "dd/MM/yyyy" }, // Định dạng trục x thành ngày tháng
//             }}
//         />
//     );
// };

// export default DailyChart;
