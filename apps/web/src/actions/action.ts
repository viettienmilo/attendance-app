/**
 * @copyright 2026 Nguyen Viet Tien
 * @license Apache-2.0
 */

/**
 * Modules
 */
import { hc } from 'hono/client';
import type { ActionFunction } from 'react-router';

/**
 * Repos
 */
import type { AppTypes } from '@repo/api';

/**
 * Types
 */
const client = hc<AppTypes>(
  import.meta.env.VITE_API_URL || 'http://localhost:3000',
  {
    fetch: (input: any, init: any) =>
      fetch(input, {
        ...init,
        credentials: 'include',
      }),
  },
);

export type MyClass = {
  id: string;
  name: string;
};

export type Course = {
  id: string;
  title: string;
};

export const homeStudentAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const studentId = formData.get('studentId') as string;

  if (!studentId) return null;

  try {
    const res = await client.api.students[':studentId'].$get({
      param: { studentId },
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.student;
  } catch (error) {
    console.error(error);
  }
};

export const attendanceAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const key = formData.get('key') as string;

  if (key === 'fetch-students') {
    const classId = formData.get('classId') as string;
    const res = await client.api.students.class[':classId'].$get({
      param: {
        classId,
      },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.students;
  }

  if (key === 'submit-attendance') {
    const data = JSON.parse(formData.get('jsonData') as string);
    const res = await client.api.attendances['add-new'].$post({ json: data });
    if (!res.ok) {
      return { success: false, error: 'Không thể lưu điểm danh' };
    }
    const result = await res.json();
    return result;
  }
};

export const scoreAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const key = formData.get('key') as string;

  if (key === 'fetch-students') {
    const courseId = formData.get('courseId') as string;
    const classId = formData.get('classId') as string;
    const testId = formData.get('testId') as string;
    const res = await client.api.students.score[':courseId'][':classId'][
      ':testId'
    ].$get({
      param: { courseId, classId, testId },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.students;
  }

  if (key === 'submit-score') {
    const data = JSON.parse(formData.get('jsonData') as string);
    const res = await client.api.scores['add-new'].$post({ json: data });
    if (!res.ok) {
      return { success: false, error: 'Không thể lưu điểm' };
    }
    const result = await res.json();
    return result;
  }
};
