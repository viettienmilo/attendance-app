/**
 * @copyright 2026 Nguyen Viet Tien
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router';

/**
 * Components
 */
import { Button } from '@/components/ui/button';

/**
 * @description Error boundary for 404 error with Home and Go back button
 */
const ErrorBoundary = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  if (isRouteErrorResponse(error)) {
    return (
      <div className='h-dvh grid place-content-center place-items-center gap-4'>
        <h1 className='text-4xl font-semibold'>
          {error.status} {error.statusText}
        </h1>
        <div className='p text-muted-foreground max-w-[60ch] text-center text-balance'>
          {error.data}
        </div>
        <div className='flex gap-4'>
          <Button
            variant='outline'
            onClick={() => navigate(-1)}>
            Go Back
          </Button>
          <Button onClick={() => navigate('/', { viewTransition: true })}>
            Home
          </Button>
        </div>
      </div>
    );
  }
};

export default ErrorBoundary;
