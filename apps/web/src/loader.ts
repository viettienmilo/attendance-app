import { hc } from 'hono/client';
import type { AppTypes } from '@repo/api';
// import type { InferResponseType } from 'hono';

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

export type Test = {
  id: number;
  name: string;
  content: string | null;
  timeInfo: string | null;
  weight: string | number;
};

// type MyClassResponse = InferResponseType<typeof client.api.classes.$get>;
// type SuccessfulMyClassData = Extract<
//   MyClassResponse,
//   { classes: MyClass[] }
// >['classes'];

export const attendanceLoader = async () => {
  const res1 = await client.api.classes.$get();
  const res2 = await client.api.courses.$get();
  if (!res1.ok || !res2.ok) return null;
  const data1 = await res1.json();
  const data2 = await res2.json();

  return { classes: data1.classes, courses: data2.courses } as {
    classes: MyClass[];
    courses: Course[];
  };
};

export const scoreLoader = async () => {
  const [res1, res2, res3] = await Promise.all([
    client.api.classes.$get(),
    client.api.courses.$get(),
    client.api.tests.$get(),
  ]);
  if (!res1.ok || !res2.ok || !res3.ok) return null;
  const [data1, data2, data3] = await Promise.all([
    res1.json(),
    res2.json(),
    res3.json(),
  ]);
  return {
    classes: data1.classes,
    courses: data2.courses,
    tests: data3.tests,
  } as {
    classes: MyClass[];
    courses: Course[];
    tests: Test[];
  };
};

export const summaryLoader = async ({ request }: { request: Request }) => {
  const [res1, res2] = await Promise.all([
    client.api.classes.$get(),
    client.api.courses.$get(),
  ]);

  if (!res1.ok || !res2.ok) return null;
  const [data1, data2] = await Promise.all([res1.json(), res2.json()]);

  const url = new URL(request.url);
  const classId = url.searchParams.get('classId') as string;
  const courseId = url.searchParams.get('courseId') as string;

  if (classId && courseId) {
    try {
      const attendanceSummary = await client.api.attendances.summary[
        ':courseId'
      ][':classId'].$get({
        param: { courseId, classId },
      });

      const scoreSummary = await client.api.scores.summary[':courseId'][
        ':classId'
      ].$get({
        param: { courseId, classId },
      });

      if (attendanceSummary.ok && scoreSummary.ok) {
        const attendanceSummaryData = await attendanceSummary.json();
        const scoreSummaryData = await scoreSummary.json();
        return {
          dateHeaders: attendanceSummaryData.dateHeaders,
          attendanceSummary: attendanceSummaryData.summary,
          testHeaders: scoreSummaryData.testHeaders,
          scoreSummary: scoreSummaryData.results,
        };
      }
    } catch (error) {
      console.error(error);
    }
  }

  return {
    classes: data1.classes,
    courses: data2.courses,
    dateHeaders: [],
    attendanceSummary: [],
    testHeaders: [],
    scoreSummary: [],
  } as {
    classes: MyClass[];
    courses: Course[];
  };
};
