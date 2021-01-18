import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import api from '../../services/api';

import { Container } from './styles';

interface HistoryDate {
  buy: number;
  sell: Number;
  createdAt: Date;
  formattedHourWithMinutes: string;
}

const LineChart: React.FC = () => {
  const [userHistory, setHistory] = useState<HistoryDate[]>([]);

  useEffect(() => {
    async function loadHistory(): Promise<void> {
      const token = localStorage.getItem('@Desafio-Eduzz:token');

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const [response] = await Promise.all([api.get('/history', config)]);
      const actualDate = new Date();
      const dayHistory: HistoryDate[] = [];

      response.data.map((element: HistoryDate) => {
        const created = new Date(element.createdAt);
        const elementHourWithMinutes = `${created
          .getHours()
          .toString()}:${created.getMinutes().toString()}`;

        return (
          created.getDate() === actualDate.getDate() &&
          actualDate.getHours() - created.getHours() < 12 &&
          created.getMonth() === actualDate.getMonth() &&
          created.getFullYear() === actualDate.getFullYear() &&
          dayHistory.push({
            buy: element.buy,
            createdAt: element.createdAt,
            sell: element.sell,
            formattedHourWithMinutes: elementHourWithMinutes,
          })
        );
      });

      setHistory(dayHistory);
    }
    loadHistory();
  }, []);
  return (
    <Container>
      <Line
        data={{
          labels: userHistory.map(element => element.formattedHourWithMinutes),
          datasets: [
            {
              label: 'Valor de compra',
              data: userHistory.map(element => element.buy),
              borderColor: 'red',
            },
            {
              label: 'Valor de venda',
              data: userHistory.map(element => element.sell),
              borderColor: 'green',
            },
          ],
        }}
        height={300}
        width={400}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  max: 210000,
                  min: 170000,
                },
              },
            ],
            xAxes: [
              {
                display: true,
                position: 'right',
                ticks: {
                  reverse: true,
                },
              },
            ],
          },
        }}
      />
    </Container>
  );
};

export default LineChart;
