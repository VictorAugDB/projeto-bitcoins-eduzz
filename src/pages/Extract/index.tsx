import React, { useEffect, useState } from 'react';

import api from '../../services/api';

import { Container, TableContainer } from './styles';

interface Extract {
  type: string;
  value: number;
  createdAt: Date;
  id: string;
  formattedDate: string;
}

const Extract: React.FC = () => {
  const [extracts, setExtracts] = useState<Extract[]>([]);

  useEffect(() => {
    async function loadExtracts(): Promise<void> {
      const token = localStorage.getItem('@GoBarber:token');

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const [response] = await Promise.all([api.get('/extract', config)]);

      const extractsFormatted = response.data.map((extract: Extract) => ({
        ...extract,
        formattedDate: new Date(extract.createdAt).toLocaleDateString('pt-BR'),
      }));

      setExtracts(extractsFormatted);
    }

    loadExtracts();
  }, []);

  return (
    <Container>
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
                <td>{extract.value}</td>
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
