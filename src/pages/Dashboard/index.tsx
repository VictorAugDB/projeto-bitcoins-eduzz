import React, { useEffect, useState } from 'react';

import LineChart from '../../components/Charts/LineChart';
import { Container, Graphics, UserContent } from './styles';

import api from '../../services/api';

interface Balance {
  balance: number;
}

interface UserBitCoins {
  currentBtcAmount: number;
}

interface BitCoinsPrice {
  buy: number;
  sell: number;
}

const Dashboard: React.FC = () => {
  const [userBalance, setUserBalance] = useState<Balance>();
  const [userBitCoinsAmount, setUserBitCoinsAmount] = useState<UserBitCoins>();
  const [Price, setPrice] = useState<BitCoinsPrice>();

  useEffect(() => {
    async function loadBalance(): Promise<void> {
      const token = localStorage.getItem('@GoBarber:token');

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await api.get('/account/balance', config);

      const [bitcoins] = await Promise.all([api.get('/btc', config)]);

      const bitcoinsPrice = await api.get('/btc/price', config);

      const currentBtc = bitcoins.data.reduce(
        (accumulator: number, btc: UserBitCoins) => {
          return accumulator + btc.currentBtcAmount;
        },
        0,
      );

      setUserBitCoinsAmount(currentBtc.toFixed(2));
      setUserBalance(response.data);
      setPrice(bitcoinsPrice.data);
    }

    loadBalance();
  }, []);

  return (
    <Container>
      <UserContent>
        <div className="user-balance">
          <p>Você possui:</p>
          <p>
            {userBalance?.balance.toLocaleString('pt-BR')}
            R$
          </p>
          <p>E</p>
          <p>{userBitCoinsAmount}</p>
          <p>bitcoins</p>
        </div>
        <div className="bitcoins-price">
          <p>Valor atual de compra de um bitcoin:</p>
          <p>
            {Price?.buy.toLocaleString('pt-BR')}
            R$
          </p>
          <p>Valor atual de venda de um bitcoin:</p>
          <p>
            {Price?.sell.toLocaleString('pt-BR')}
            R$
          </p>
        </div>
      </UserContent>
      <Graphics>
        <LineChart />
      </Graphics>
    </Container>
  );
};

export default Dashboard;
