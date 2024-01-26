'use client';

import styles from './update-meal.module.css';
import { ApolloProvider } from '@apollo/client';
import { client } from '@/lib/graphql';

export default function Foods({ children }: { children: React.ReactNode }) {
  return <div className={styles.foods}>
    <ApolloProvider client={client}>{children}</ApolloProvider>
  </div>;
}
