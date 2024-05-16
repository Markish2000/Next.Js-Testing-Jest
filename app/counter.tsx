'use client';

import { useEffect, useState } from 'react';

interface Props {
  loadData?: () => Promise<any>;
  shouldRender?: boolean;
}

export default function Counter({ loadData, shouldRender }: Readonly<Props>) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (loadData) {
      loadData().then((data) => {
        if (typeof data === 'number') {
          setCount(data);
        }
      });
    }
  }, [loadData]);

  if (!shouldRender) return null;

  return (
    <>
      <h2>{count}</h2>
      <button type='button' onClick={() => setCount(count + 1)}>
        +
      </button>
    </>
  );
}
