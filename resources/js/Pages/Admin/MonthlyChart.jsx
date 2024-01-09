import React, { useEffect } from "react";
import Chart from "react-google-charts";

const MonthlyChart = ({ data }) => {
    useEffect(() => {
        // Thực hiện bất kỳ xử lý nào khác tại đây nếu cần

        return () => {
            // Thực hiện các công việc cleanup nếu cần
        };
    }, [data]);

    return (
        <Chart
            chartType="ColumnChart"
            loader={<div>Loading Chart</div>}
            data={data}
            options={{
                title: "Monthly Revenue",
                hAxis: {
                    title: "Month",
                },
                vAxis: {
                    title: "Revenue",
                },
            }}
        />
    );
};

export default MonthlyChart;
