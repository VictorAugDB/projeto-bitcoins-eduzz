import React, { useCallback, useState } from 'react';

import investment from '../../assets/investment.svg';
import liquidation from '../../assets/liquidation.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';
import formatValue from '../../utils/formatValue';

import {
  CardContainer,
  Container,
  TableContainer,
  Card,
  FilterCard,
  FilterContainer,
} from './styles';

interface Extract {
  type: string;
  value: number;
  createdAt: Date;
  id: string;
  formattedDate: string;
  formattedValue: string;
}

interface Balance {
  investment: number;
  liquidation: number;
  total: number;
}

interface BalanceFormatData {
  formattedInvestment: string;
  formattedLiquidation: string;
  formattedTotal: string;
}

const Extract: React.FC = () => {
  const [extracts, setExtracts] = useState<Extract[]>([]);
  const [balance, setBalance] = useState<BalanceFormatData>();

  const filterDate = useCallback((data: Extract[], daysQuantity: number) => {
    const actualDate = new Date();
    const filteredDate = data.filter(filtering => {
      const created = new Date(filtering.createdAt);
      const comparationDay = actualDate.getDate() - daysQuantity;
      const comparationMonth = new Date(
        actualDate.getFullYear(),
        actualDate.getMonth(),
        comparationDay,
      );

      return created >= comparationMonth;
    });

    return filteredDate;
  }, []);

  const handleFilter = useCallback(
    (daysQuantity: number) => {
      async function loadExtracts(): Promise<void> {
        const token = localStorage.getItem('@Desafio-Eduzz:token');

        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const [response] = await Promise.all([api.get('/extract', config)]);

        const filteredDate = filterDate(response.data, daysQuantity);

        const extractsFormatted = filteredDate.map((extract: Extract) => ({
          ...extract,
          formattedValue: extract.value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }),
          formattedDate: new Date(extract.createdAt).toLocaleDateString(
            'pt-BR',
          ),
        }));

        const balanceSum: Balance = extractsFormatted.reduce(
          (accumulator: Balance, extract: Extract) => {
            switch (extract.type) {
              case 'investment':
                accumulator.investment += extract.value;
                break;
              case 'liquidation':
                accumulator.liquidation += extract.value;
                break;
              case 'deposit':
                accumulator.total += 0;
                break;
              default:
                break;
            }
            accumulator.total =
              accumulator.investment + accumulator.liquidation;
            return accumulator;
          },
          {
            investment: 0,
            liquidation: 0,
            total: 0,
          },
        );

        const balanceFormatted: BalanceFormatData = {
          formattedInvestment: formatValue(balanceSum.investment),
          formattedLiquidation: formatValue(balanceSum.liquidation),
          formattedTotal: formatValue(balanceSum.total),
        };

        setBalance(balanceFormatted);
        setExtracts(extractsFormatted);
      }

      loadExtracts();
    },
    [filterDate],
  );

  return (
    <Container>
      <h1 className="filter-title">Clique em um dos Filtros</h1>
      <FilterContainer>
        <FilterCard onClick={() => handleFilter(30)}>
          <h1>30 Dias</h1>
        </FilterCard>
        <FilterCard onClick={() => handleFilter(60)}>
          <h1>60 Dias</h1>
        </FilterCard>
        <FilterCard onClick={() => handleFilter(90)}>
          <h1>90 Dias</h1>
        </FilterCard>
      </FilterContainer>
      <CardContainer>
        <Card>
          <header>
            <p>Investimentos</p>
            <img src={investment} alt="Investment" />
          </header>
          <h1 data-testid="balance-investment">
            {balance?.formattedInvestment}
          </h1>
        </Card>
        <Card>
          <header>
            <p>liquidação</p>
            <img src={liquidation} alt="Liquidation" />
          </header>
          <h1 data-testid="balance-liquidation">
            {balance?.formattedLiquidation}
          </h1>
        </Card>
        <Card total>
          <header>
            <p>Total</p>
            <img src={total} alt="Total" />
          </header>
          <h1 data-testid="balance-total">{balance?.formattedTotal}</h1>
        </Card>
      </CardContainer>
      <TableContainer>
        <table>
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Valor</th>
              <th>Data</th>
            </tr>
          </thead>
          {extracts.map(extract => (
            <tbody key={extract.id}>
              <tr>
                <td className="type">{extract.type}</td>
                <td className={extract.type}>{extract.formattedValue}</td>
                <td>{extract.formattedDate}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </TableContainer>
    </Container>
  );
};

export default Extract;
