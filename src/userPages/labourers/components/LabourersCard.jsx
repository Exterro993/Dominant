import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { FullpricesUrl } from '../../../../fetchers/URL_SERVER';
import { GetData } from '../../../../fetchers/CRUD';

const LabourersCard = () => {
  const [prices, setPrices] = useState([])
  const { id } = useParams();
  const currentService = prices.find((item) => Number(item.id) === Number(id))
  useEffect(() => {
    const handleData = (data, status) => {
      if (status === 200) {
        setPrices(data);
      } else {
        console.error("Ошибка загрузки данных:", status);
      }
    };
    
    GetData(FullpricesUrl, handleData);
  }, []);
  useEffect(() => {
    
    console.log(currentService);
    console.log(prices);
  }, [])
  
  
  
  return (
    <div>LabourersCard {currentService?.name} </div>
  )
}

export default LabourersCard