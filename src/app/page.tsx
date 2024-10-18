"use client"

import { useEffect, useState } from 'react';
import { GraphQLClient } from 'graphql-request';

const endpoint = 'https://swapi-graphql.netlify.app/.netlify/functions/index';

export default function Home() {
  const [data, setData]: any = useState(null);
  const [loading, setLoading]: any = useState(true);
  const [error, setError]: any = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const client = new GraphQLClient(endpoint);
      const query = `
        query {
          allPeople {
            people {
              name
              height
              mass
            }
          }
        }
      `;

      try {
        const response: any = await client.request(query);
        setData(response);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Star Wars Characters</h1>
      <ul>
        {data.allPeople.people.map((person: any) => (
          <li key={person.name}>
            ============================================================================
            {person.name} - Height: {person.height}, Mass: {person.mass}
          </li>
        ))}
      </ul>
    </div>
  );
}
