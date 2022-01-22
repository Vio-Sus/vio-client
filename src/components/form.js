import { useEffect, useState } from 'react';
import { getSources } from '../network';

export default function Form() {
  const [sources, setSources] = useState([]);
  useEffect(() => {
    getSources().then((result) => {
      console.log(result);
      setSources(result.data);
    });
    // setSources();
  }, []);
  return (
    <>
      <form>
        {sources.map((source,key) => (
          <p key={key}>{source.name}</p>
        ))}

        <input type="submit"></input>
      </form>
    </>
  );
}
