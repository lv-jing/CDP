import { useState, useEffect } from 'react';

const list = [
  {
    id: 1,
    text: 'xxx xxx xxx',
  },
  {
    id: 2,
    text: 'yyy yyy yyy',
  },
  {
    id: 3,
    text: 'zzz zzz zzz',
  },
];

export default function useDemo(filter) {
  const [data, setData] = useState(list);

  useEffect(() => {
    if (filter.text) {
      setData(list.filter(item => item.text.indexOf(filter.text) > -1));
    } else {
      setData(list);
    }
  }, [filter]);

  return {
    data
  }
}
