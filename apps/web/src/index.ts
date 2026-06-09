/**
 * @copyright 2026 Nguyen Viet Tien
 * @license Apache-2.0
 */

import { createBrowserRouter } from 'react-router';

import Layout from '@/Layout';
import Fallback from '@/Fallback';
import Error404 from '@/Error404';
import HomePage from './HomePage';
import SignInPage from './SignInPage';
import AdminLayout from './AdminLayout';
import Attendance from './Attendance';
import Score from './Score';
import Summary from './Summary';
import ProgramLayout from './ProgramLayout';
import MisPage from './MisPage';

import { attendanceLoader, scoreLoader, summaryLoader } from './loader';
import { attendanceAction, scoreAction } from './action';

const router = createBrowserRouter([
  // PUBLIC ROUTES
  {
    // main layout
    path: '',
    Component: Layout,
    HydrateFallback: Fallback,
    ErrorBoundary: Error404,
    children: [
      {
        // home page
        index: true,
        Component: HomePage,
      },
      {
        // sign in
        path: '/sign-in',
        Component: SignInPage,
      },
      {
        path: '/program',
        Component: ProgramLayout,
        children: [
          {
            index: true,
            Component: MisPage,
            handle: { breadcrumb: 'Hệ thống thông tin quản lý' },
          },
        ],
      },
      // AUTHED ROUTES
      {
        path: '/admin',
        Component: AdminLayout,
        children: [
          {
            index: true,
            Component: Attendance,
            loader: attendanceLoader,
            action: attendanceAction,
            handle: { breadcrumb: 'Điểm danh' },
          },
          {
            path: 'score',
            Component: Score,
            loader: scoreLoader,
            action: scoreAction,
            handle: { breadcrumb: 'Vào điểm' },
          },
          {
            path: 'summary',
            Component: Summary,
            loader: summaryLoader,
            handle: { breadcrumb: 'Tổng kết' },
          },
        ],
      },
    ],
  },
]);

export default router;
