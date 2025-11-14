import { Navigate, Outlet } from 'react-router-dom';

import type { Role } from '../../domain/entities/Role';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  redirectTo?: string;
}

export const ProtectedRoute = ({ redirectTo = '/login' }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};

interface RoleProtectedRouteProps extends ProtectedRouteProps {
  allowedRoles: Role[];
  fallback?: string;
}

export const RoleProtectedRoute = ({
  allowedRoles,
  fallback = '/403',
  redirectTo
}: RoleProtectedRouteProps) => {
  const { user, hasRole, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to={redirectTo ?? '/login'} replace />;
  }

  if (!hasRole(allowedRoles)) {
    return <Navigate to={fallback} replace />;
  }

  return <Outlet />;
};
