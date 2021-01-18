import React from 'react';

import { FaCartPlus, FaMoneyBillWave } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';
import { BsLayoutTextSidebar } from 'react-icons/bs';
import { SiSellfy } from 'react-icons/si';

export const SidebarData = [
  {
    title: 'Home',
    path: '/dashboard',
    icon: <AiFillHome />,
    cName: 'nav-text',
  },
  {
    title: 'Deposit',
    path: '/deposit',
    icon: <FaMoneyBillWave />,
    cName: 'nav-text',
  },
  {
    title: 'Buy',
    path: '/buy',
    icon: <FaCartPlus />,
    cName: 'nav-text',
  },
  {
    title: 'Sell',
    path: '/sell',
    icon: <SiSellfy />,
    cName: 'nav-text',
  },
  {
    title: 'Extract',
    path: '/extract',
    icon: <BsLayoutTextSidebar />,
    cName: 'nav-text',
  },
];
