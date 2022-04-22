import React from 'react';
import { useQuery } from '@apollo/client'; //this is a hook
import { QUERY_THOUGHTS } from '../utils/queries';
import ThoughtList from '../components/ThoughtList';

const Home = () => {
  //use useQuery hook to make query request
  // eslint-disable-next-line
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || []; //this is optional chaining
  console.log(thoughts);

  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className="col-12 mb-3">
         {loading ? (
            <div>Loading...</div>
         ) : (
            <ThoughtList thoughts={thoughts} title="Some Food for Thought(s)..." />
          )}
       </div>
     </div>
    </main>
  );
};

export default Home;
