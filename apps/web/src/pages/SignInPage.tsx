/**
 * @copyright 2026 Nguyen Viet Tien
 * @license Apache-2.0
 */

/**
 * Modules
 */
import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router';
import { useForm } from 'react-hook-form';

/**
 * Libraries
 */
import { authClient } from '@/auth-client/auth-client';

/**
 * Components
 */
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';

/**
 * Custom components
 */
import AppBrand from '@/components/custom/AppBrand';

/**
 * Assets
 */
import { Mail01Icon, Key01Icon, Loading01Icon } from 'hugeicons-react';
import SignInBanner from '@/assets/login-banner.jpg';

/**
 * Constants
 */
const SIGNIN_FORM = {
  title: 'Xin chào',
  description: 'Đăng nhập để tiếp tục',
} as const;

const SignInPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { data: session } = authClient.useSession();

  // react hook form schema
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  if (session) {
    return (
      <Navigate
        to='/admin'
        replace
      />
    );
  }

  const emailError = form.formState.errors.email;
  const passwordError = form.formState.errors.password;

  // form submission
  const onFormSubmit = async (values: any) => {
    const { email, password } = values;

    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          navigate('/admin', { viewTransition: true, replace: true });
          setLoading(false);
        },
        onError: (ctx) => {
          if (ctx.error.status === 403) {
            alert('Sai thông tin đăng nhập');
          }
          alert(ctx.error.message || 'Sai thông tin đăng nhập');
        },
        onResponse: () => {
          setLoading(false);
        },
      },
    );
  };

  return (
    <div className='flex min-h-[calc(100dvh-150px)] items-center justify-center'>
      <div className='w-full h-full max-w-sm md:max-w-3xl'>
        <Card className='grid md:grid-cols-[1fr_auto] p-0'>
          <div className='flex flex-col p-6 gap-4'>
            <CardHeader className='p-0'>
              <div className='flex justify-end'>
                <AppBrand height='h-6' />
              </div>
              <Separator className='my-1' />
              <CardTitle className='text-2xl'>{SIGNIN_FORM.title}</CardTitle>
              <CardDescription>{SIGNIN_FORM.description}</CardDescription>
            </CardHeader>

            <CardContent className='p-0 min-w-80'>
              <form
                onSubmit={form.handleSubmit(onFormSubmit)}
                className='flex flex-col gap-2'
              >
                <FieldSet>
                  <FieldGroup className='gap-3'>
                    <Field className='gap-1'>
                      <FieldLabel htmlFor='email'>Email</FieldLabel>
                      <Tooltip open={!!emailError}>
                        <TooltipTrigger asChild>
                          <InputGroup>
                            <InputGroupInput
                              id='email'
                              autoComplete='off'
                              placeholder='email@example.com'
                              {...form.register('email')}
                            />
                            <InputGroupAddon align='inline-start'>
                              <Mail01Icon className='text-muted-foreground' />
                            </InputGroupAddon>
                          </InputGroup>
                        </TooltipTrigger>
                        {emailError && (
                          <TooltipContent
                            side='left'
                            className='text-xs italic'
                          >
                            {emailError.message}
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </Field>

                    <Field className='gap-1'>
                      <FieldLabel htmlFor='password'>Password</FieldLabel>
                      <Tooltip open={!!passwordError}>
                        <TooltipTrigger asChild>
                          <InputGroup>
                            <InputGroupInput
                              id='password'
                              type='password'
                              autoComplete='off'
                              placeholder='mật khẩu'
                              {...form.register('password')}
                            />
                            <InputGroupAddon align='inline-start'>
                              <Key01Icon className='text-muted-foreground' />
                            </InputGroupAddon>
                          </InputGroup>
                        </TooltipTrigger>
                        {passwordError && (
                          <TooltipContent
                            side='left'
                            className='text-xs italic'
                          >
                            {passwordError.message}
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </Field>
                  </FieldGroup>
                </FieldSet>
                <Button
                  type='submit'
                  disabled={loading}
                  className='mt-3'
                >
                  {loading && <Loading01Icon className='animate-spin' />}
                  {loading ? 'Đang chờ...' : 'Đăng nhập'}
                </Button>
              </form>
            </CardContent>
          </div>

          {/* RIGHT SIDE (IMAGE) */}
          <figure className='relative hidden md:block h-full aspect-square bg-muted'>
            <img
              src={SignInBanner}
              alt='signup-banner'
              className='absolute inset-0 w-full h-full object-cover'
            />
          </figure>
        </Card>
      </div>
    </div>
  );
};

export default SignInPage;
