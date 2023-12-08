import { authorizeGoalEdition } from '@/lib/auth';
import { getUserId } from '@/lib/session';
import React from 'react';
import Unauthorized from './unauthorized';

export default async function GoalEditLayout({
  children,
  params,
}: {
  params: { userUid: string };
  children: React.ReactNode;
}) {
  const isAuthorized = authorizeGoalEdition(params.userUid, await getUserId());
  return isAuthorized ? <>{children}</> : <Unauthorized />;
}
