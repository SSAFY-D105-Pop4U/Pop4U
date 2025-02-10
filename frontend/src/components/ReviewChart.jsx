import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { useState, useEffect } from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ReviewChart = ({ reviewRatings }) => {
  console.log("넘어온 reviewRatings:", reviewRatings); // ✅ 데이터 확인

  const [chartData, setChartData] = useState({
    labels: ['5', '4', '3', '2', '1'],
    datasets: [
      {
        label: 'Value',
        data: [0, 0, 0, 0, 0],
        backgroundColor: '#FFD900',
        borderColor: '#FFD900',
        borderWidth: 1,
        barPercentage: 0.6,
        categoryPercentage: 0.95,
      },
    ],
  });

  useEffect(() => {
    if (reviewRatings && reviewRatings.length > 0) {
      const counts = [0, 0, 0, 0, 0];
      reviewRatings.forEach(score => {
        if (score >= 1 && score <= 5) {
          counts[5 - score] += 1;
        }
      });

      console.log("계산된 counts 배열:", counts); // ✅ counts 배열 확인

      setChartData(prevData => ({
        labels: prevData.labels,
        datasets: [
          {
            ...prevData.datasets[0], // ✅ 기존 데이터 유지
            data: [...counts], // ✅ 새로운 데이터 적용
          },
        ],
      }));
    }
  }, [reviewRatings]);

  useEffect(() => {
    console.log("차트 데이터가 변경됨:", chartData); // ✅ chartData 변경 확인
  }, [chartData]);

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: { display: false, grid: { display: false } },
      y: {
        grid: { display: false },
        ticks: { display: true, font: { size: 16, weight: "bold" } },
      },
    },
  };

  return (
    <div style={{ width: '80%', maxWidth: '170px', height: '120px', marginLeft: "70px" }}>
      {chartData.datasets[0].data.some(value => value > 0) ? (
        <Bar data={chartData} options={options} />
      ) : (
        <p>리뷰 데이터가 없습니다.</p>
      )}
    </div>
  );
};

export default ReviewChart;
