import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';
import Chart from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';

export type LineChartProps = {
  className?: string;
};

const LineChart = React.forwardRef(
  ({ className }: LineChartProps, ref: any) => {
    const canvasRef = useRef<any>(null);
    const [chart, setChart] = useState<any>();
    useEffect(() => {
      if (chart) {
        chart.destroy();
      }
      const createdChart = new Chart(canvasRef.current, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'March', 'April', 'May', 'Jun', 'July'],
          datasets: [
            {
              label: 'My First Dataset',
              data: [65, 59, 80, 81, 56, 55, 40],
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
          ],
        },
      });
      setChart(createdChart);
    }, []);
    return (
      <div>
        <canvas ref={canvasRef}></canvas>
      </div>
    );
  }
);

LineChart.displayName = 'LineChart';
export default LineChart;
