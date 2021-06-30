import React from 'react';
import { vidinet as VidinetApi } from '@vidispine/vdt-api';

const useCost = (apiCall) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [cost, setCost] = React.useState('Loading...');
  const timeoutSession = React.useRef();

  const getCost = (parameters = {}) => {
    timeoutSession.current = {};
    apiCall({
      ...parameters,
      costEstimate: true,
    })
      .then((response) => {
        console.log('Cost estimate id', response.data);
        const { id: costEstimateId } = response.data;
        console.log('ID', costEstimateId);
        return new Promise((resolve, reject) => {
          const newPoll = () => {
            VidinetApi.getCostEstimate({ costEstimateId })
              .then((estimateResponse) => {
                if (timeoutSession.current[costEstimateId] !== null) {
                  clearTimeout(timeoutSession.current[costEstimateId]);
                  delete timeoutSession.current[costEstimateId];
                }
                const { data: { state } = {} } = estimateResponse;
                console.log('STATE', state);
                if (state === 'FINISHED') resolve(estimateResponse);
                else {
                  timeoutSession.current[costEstimateId] = setTimeout(() => newPoll(), 1000);
                }
              })
              .catch((error) => reject(error));
          };
          newPoll();
        });
      })
      .then((response) => {
        const { data } = response;
        if (data.state === 'FINISHED') {
          const { cost: theCost } = data.service[0];
          setCost(theCost.value);
          setIsLoading(false);
        }
      });
  };

  return {
    cost,
    getCost,
    isLoading,
  };
};

export default useCost;
