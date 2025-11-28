import { useLocation, useNavigate } from 'react-router-dom';
import { LoginForm } from './LoginForm';
import  RegisterForm from './RegisterForm';
import { StaticPageLayout } from '../landing/StaticPageLayout';

export function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === '/login';

  return (
    <StaticPageLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center pt-24 pb-12 px-4">
        <div className="w-full max-w-md">
          {isLogin ? (
            <LoginForm
              onToggleForm={() => navigate('/register')}
              onForgotPassword={() => navigate('/forgot-password')}
            />
          ) : (
            <RegisterForm onToggleForm={() => navigate('/login')} />
          )}
        </div>
      </div>
    </StaticPageLayout>
  );
}
