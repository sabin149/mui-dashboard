import { AuthGuard } from 'guards/auth-guard';
import { ReactNode } from 'react';

interface WithAuthGuardProps {
  children: ReactNode;
}

export const withAuthGuard = (Component: React.ComponentType<any>) => {
  const WithAuthGuard = (props: WithAuthGuardProps) => (
    <AuthGuard>
      <div>
        <Component {...props} />
      </div>
    </AuthGuard>
  );

  return WithAuthGuard;
};
