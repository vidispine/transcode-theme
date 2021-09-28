import React from 'react';
import { vidinet as VidinetApi } from '@vidispine/vdt-api';

const useCostEstimate = (endpoint) => {
  const ref = React.useRef({});
  const cancel = React.useRef(null);
  const [cost, setCost] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const request = React.useCallback(
    ({ tag: tags = [], ...params }) => {
      if (!tags.length) return;
      if (cancel.current) {
        cancel.current({ canceled: true });
        cancel.current = null;
      } else {
        setIsLoading(true);
      }
      const promise = new Promise((resolve, reject) => {
        const promises = tags.map(
          ({ tagName: tag }) =>
            new Promise((res, rej) => {
              if (cost[tag]) {
                res({ tag, ...cost[tag] });
              } else {
                endpoint({ ...params, queryParams: { tag }, costEstimate: true })
                  .then(({ data: { id: costEstimateId } = {} }) => {
                    const poll = () => {
                      VidinetApi.getCostEstimate({ costEstimateId }).then(({ data }) => {
                        const { state, service: [service] = [{}] } = data;
                        if (state === 'FINISHED') res({ ...service, tag });
                        else ref.current[tag] = setTimeout(() => poll(), 1000);
                      });
                    };
                    poll();
                  })
                  .catch(rej);
              }
            }),
        );
        Promise.all(promises).then(resolve).catch(reject);
      });
      const cancelPromise = new Promise((_, reject) => {
        cancel.current = reject;
      });
      Promise.race([promise, cancelPromise])
        .then((res) => {
          const estimates = res.reduce((a, { tag, ...c }) => ({ ...a, [tag]: { ...c } }), {});
          setIsLoading(false);
          setCost(estimates);
          cancel.current = null;
        })
        .catch(({ canceled }) => {
          if (!canceled) {
            setIsLoading(false);
            cancel.current = null;
          }
        });
    },
    [endpoint, cost],
  );
  return { request, isLoading, data: cost };
};

export default useCostEstimate;
