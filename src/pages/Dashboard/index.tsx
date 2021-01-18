import React, { useEffect, useState } from 'react';

import LineChart from '../../components/Charts/LineChart';
import { Container, Graphics, TableContainer, UserContent } from './styles';

import api from '../../services/api';
import formatValue from '../../utils/formatValue';

interface Balance {
  balance: number;
}

interface UserBitCoins {
  currentBtcAmount: number;
  investmentTotalValue: number;
  purchaseAmount: number;
}

interface BitCoinsPrice {
  buy: number;
  sell: number;
}

interface VolumeData {
  buy: number;
  sell: number;
}

interface InvestmentPositionData {
  id: string;
  purchasedDate: Date;
  purchaseAmount: number;
  purchasePrice: number;
  variation: number;
}

const Dashboard: React.FC = () => {
  const [userBalance, setUserBalance] = useState<Balance>();
  const [userBitCoinsAmount, setUserBitCoinsAmount] = useState<UserBitCoins>();
  const [investmentPosition, setInvestmentPosition] = useState<
    InvestmentPositionData[]
  >([]);
  const [Price, setPrice] = useState<BitCoinsPrice>();
  const [userVolume, setUserVolume] = useState<VolumeData>();

  useEffect(() => {
    async function loadBalance(): Promise<void> {
      const token = localStorage.getItem('@Desafio-Eduzz:token');

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await api.get('/account/balance', config);

      const [bitcoins] = await Promise.all([api.get('/btc', config)]);

      const bitcoinsPrice = await api.get('/btc/price', config);

      const volume = await api.get('/volume', config);

      const currentBitCoinsBalance = bitcoins.data.reduce(
        (accumulator: UserBitCoins, btc: UserBitCoins) => {
          accumulator.currentBtcAmount += btc.currentBtcAmount;
          accumulator.investmentTotalValue += btc.purchaseAmount;
          return accumulator;
        },
        {
          currentBtcAmount: 0,
          investmentTotalValue: 0,
        },
      );

      setUserBitCoinsAmount(currentBitCoinsBalance);
      setInvestmentPosition(
        bitcoins.data.map((investment: InvestmentPositionData) => ({
          id: investment.id,
          purchasedDate: new Date(investment.purchasedDate).toLocaleDateString(
            'pt-BR',
          ),
          purchaseAmount: investment.purchaseAmount,
          purchasePrice: investment.purchasePrice,
          variation: investment.variation,
        })),
      );
      setUserBalance(response.data);
      setPrice(bitcoinsPrice.data);
      setUserVolume(volume.data);
    }

    loadBalance();
  }, []);

  return (
    <Container>
      {userBalance && Price && userVolume && userBitCoinsAmount && (
        <UserContent>
          <div className="user-balance">
            <p>
              Você possui:
              {` `}
              {formatValue(userBalance.balance)}
            </p>
            <p>
              {userBitCoinsAmount.currentBtcAmount.toFixed(2)}
              {` `}
              bitcoins
            </p>
            <p>
              {formatValue(userBitCoinsAmount.investmentTotalValue)}
              {` `}
              De valor investido
            </p>
          </div>
          <div className="bitcoins-price">
            <p>
              Valor atual de compra de um bitcoin:
              {` `}
              {formatValue(Price.buy)}
            </p>
            <p>
              Valor atual de venda de um bitcoin:
              {` `}
              {formatValue(Price.sell)}
            </p>
            <p>Operações efetuadas hoje:</p>
            <p>
              Compra:
              {` `}
              {(userVolume.buy / Price.buy).toFixed(6)}
              {` `}
              bitcoins
            </p>
            <p>
              Venda:
              {` `}
              {(userVolume.sell / Price.sell).toFixed(6)}
              {` `}
              bitcoins
            </p>
          </div>
        </UserContent>
      )}
      <Graphics>
        <LineChart />
      </Graphics>
      <TableContainer>
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Valor investido</th>
              <th>Valor na data da compra</th>
              <th>Percentual de variação</th>
            </tr>
          </thead>
          {investmentPosition.map(investment => (
            <tbody key={investment.id}>
              <tr>
                <td>{investment.purchasedDate}</td>
                <td>{investment.purchaseAmount}</td>
                <td>{investment.purchasePrice}</td>
                <td>
                  {(investment.variation * 10).toFixed(2)}
                  <span>%</span>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </TableContainer>
    </Container>
  );
};

export default Dashboard;
