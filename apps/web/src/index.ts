/**
 * @copyright 2026 Nguyen Viet Tien
 * @license Apache-2.0
 */

/**
 * Modules
 */
import { createBrowserRouter } from 'react-router';

/**
 * Layouts
 */
import MainLayout from '@/layouts/MainLayout';
import AdminLayout from '@/layouts/AdminLayout';
import ProgramLayout from '@/layouts/ProgramLayout';

/**
 * Pages
 */
import Fallback from '@/components/custom/Fallback';
import ErrorPage from '@/pages/ErrorPage';
import HomePage from '@/pages/HomePage';
import SignInPage from '@/pages/SignInPage';
import AttendancePage from '@/pages/AttendancePage';
import ScorePage from '@/pages/ScorePage';
import SummaryPage from '@/pages/SummaryPage';
import MisPage from '@/pages/MisPage';
import EcomPage from './pages/EcomPage';
import DocsPage from '@/pages/DocsPage';

/**
 * Loaders
 */
import { attendanceLoader, scoreLoader, summaryLoader } from '@/loaders/loader';

/**
 * Actions
 */
import {
  homeStudentAction,
  attendanceAction,
  scoreAction,
} from '@/actions/action';

const router = createBrowserRouter([
  {
    // main layout
    path: '',
    Component: MainLayout,
    HydrateFallback: Fallback,
    ErrorBoundary: ErrorPage,
    children: [
      // PUBLIC ROUTES
      {
        // home page
        index: true,
        Component: HomePage,
        action: homeStudentAction,
      },
      {
        // sign in
        path: '/sign-in',
        Component: SignInPage,
      },
      {
        // study program
        path: '/program',
        Component: ProgramLayout,
        children: [
          {
            index: true,
            Component: MisPage,
            handle: { breadcrumb: 'Hệ thống thông tin quản lý' },
          },
          {
            path: 'e-commerce',
            Component: EcomPage,
            handle: { breadcrumb: 'Thương mại điện tử' },
          },
          {
            path: 'docs',
            Component: DocsPage,
            handle: { breadcrumb: 'Giáo trình và tài liệu tham khảo' },
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
            Component: AttendancePage,
            loader: attendanceLoader,
            action: attendanceAction,
            handle: { breadcrumb: 'Điểm danh' },
          },
          {
            path: 'score',
            Component: ScorePage,
            loader: scoreLoader,
            action: scoreAction,
            handle: { breadcrumb: 'Vào điểm' },
          },
          {
            path: 'summary',
            Component: SummaryPage,
            loader: summaryLoader,
            handle: { breadcrumb: 'Tổng kết' },
          },
        ],
      },
    ],
  },
]);

export default router;
