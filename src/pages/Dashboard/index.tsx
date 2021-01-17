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

interface VolumeData {
  buy: number;
  sell: number;
}

const Dashboard: React.FC = () => {
  const [userBalance, setUserBalance] = useState<Balance>();
  const [userBitCoinsAmount, setUserBitCoinsAmount] = useState<UserBitCoins>();
  const [Price, setPrice] = useState<BitCoinsPrice>();
  const [userVolume, setUserVolume] = useState<VolumeData>();

  useEffect(() => {
    async function loadBalance(): Promise<void> {
      const token = localStorage.getItem('@GoBarber:token');

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await api.get('/account/balance', config);

      const [bitcoins] = await Promise.all([api.get('/btc', config)]);

      const bitcoinsPrice = await api.get('/btc/price', config);

      const volume = await api.get('/volume', config);

      const currentBtc = bitcoins.data.reduce(
        (accumulator: number, btc: UserBitCoins) => {
          return accumulator + btc.currentBtcAmount;
        },
        0,
      );

      setUserBitCoinsAmount(currentBtc.toFixed(2));
      setUserBalance(response.data);
      setPrice(bitcoinsPrice.data);
      setUserVolume(volume.data);
    }

    loadBalance();
  }, []);

  return (
    <Container>
      <UserContent>
        <div className="user-balance">
          <p>
            Você possui:
            {` `}
            {userBalance?.balance.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </p>
          <p>
            {userBitCoinsAmount}
            {` `}
            bitcoins
          </p>
        </div>
        <div className="bitcoins-price">
          <p>
            Valor atual de compra de um bitcoin:
            {` `}
            {Price?.buy.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </p>
          <p>
            Valor atual de venda de um bitcoin:
            {` `}
            {Price?.sell.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </p>
          <p>Operações efetuadas hoje:</p>
          <p>
            Compra:
            {` `}
            {userVolume?.buy.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </p>
          <p>
            Venda:
            {` `}
            {userVolume?.sell.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
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
