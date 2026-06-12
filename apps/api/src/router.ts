import { Hono } from 'hono';
import { prisma } from '@repo/db';
import { format } from 'date-fns';

import { z } from 'zod';
import { authen } from './authen.js';
import { roleGuard } from './role-guard.js';
import { zValidator } from '@hono/zod-validator';

interface CourseScoreRow {
  id: string;
  name: string;
  BT1: number;
  BT2: number;
  TX: number;
  BN: number;
  avgScore: number;
  [testName: string]: any;
}

export const studentRouter = new Hono()
  .get('/', authen, roleGuard(['admin']), async (c) => {
    const students = await prisma.student.findMany({
      orderBy: {
        id: 'asc',
      },
    });
    return c.json({ message: 'success', students });
  })
  .get(
    '/:studentId',
    zValidator(
      'param',
      z.object({
        studentId: z.string().min(8, 'Invalid student id'),
      }),
    ),
    async (c) => {
      const { studentId } = c.req.valid('param');
      const result = await prisma.student.findUnique({
        where: {
          id: studentId,
        },
        include: {
          myclass: {
            select: {
              name: true,
            },
          },
          score: {
            include: {
              test: true,
              course: true,
            },
          },
          attendance: true,
        },
      });
      if (!result) {
        return c.json(
          {
            message: 'Student not found',
          },
          404 as const,
        );
      }

      const scores = Object.values(
        result.score.reduce(
          (acc, current) => {
            const { course, test, score } = current;
            const name = course.title;
            const id = course.id;
            const weightedScore = Number(score);

            if (!acc[name]) {
              acc[name] = {
                id,
                name,
                BT1: 0,
                BT2: 0,
                TX: 0,
                BN: 0,
                avgScore: 0,
              };
            }
            acc[name][test.name] = weightedScore;
            acc[name].avgScore += weightedScore * Number(test.weight);
            return acc;
          },
          {} as Record<string, CourseScoreRow>,
        ),
      );
      const student = {
        fullName: `${result.firstName} ${result.lastName}`,
        className: result.myclass.name,
        totalAbsent: result.attendance.filter((at) => at.absent === true)
          .length,
        totalPermission: result.attendance.filter(
          (per) => per.permission === true,
        ).length,
        scores,
      };
      return c.json(
        {
          message: 'success',
          student,
        },
        200,
      );
    },
  )
  .get(
    '/class/:classId',
    authen,
    roleGuard(['admin']),
    zValidator(
      'param',
      z.object({
        classId: z.string().min(3, 'Invalid class id'),
      }),
    ),
    async (c) => {
      const { classId } = c.req.valid('param');
      const students = await prisma.student.findMany({
        where: {
          classId,
        },
      });
      return c.json(
        {
          message: 'success',
          students,
        },
        200,
      );
    },
  )
  .get(
    '/score/:courseId/:classId/:testId',
    authen,
    roleGuard(['admin']),
    zValidator(
      'param',
      z.object({
        courseId: z.string().min(4, 'Invalid course id'),
        classId: z.string().min(3, 'Invalid class id'),
        testId: z.coerce.number(),
      }),
    ),
    async (c) => {
      const { courseId, classId, testId } = c.req.valid('param');
      const results = await prisma.student.findMany({
        where: {
          classId,
        },
        include: {
          score: {
            where: {
              courseId,
              testId,
            },
            select: {
              score: true,
            },
          },
        },
      });
      return c.json({
        message: 'success',
        students: results.map((s) => ({
          id: s.id,
          fullName: `${s.firstName} ${s.lastName}`,
          score: s.score.length > 0 ? s.score[0].score : null, // return null if not score yet
        })),
      });
    },
  )
  .get(
    '/attendance/:courseId/:classId/:attendDate',
    authen,
    roleGuard(['admin']),
    zValidator(
      'param',
      z.object({
        courseId: z.string().min(4, 'Invalid course id'),
        classId: z.string().min(3, 'Invalid class id'),
        attendDate: z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
      }),
    ),
    async (c) => {
      const { courseId, classId, attendDate } = c.req.valid('param');
      const results = await prisma.student.findMany({
        where: {
          classId,
        },
        include: {
          attendance: {
            where: {
              courseId,
              attendDate: new Date(attendDate),
            },
          },
        },
      });
      return c.json({
        message: 'success',
        students: results.map((s) => ({
          id: s.id,
          fullName: `${s.firstName} ${s.lastName}`,
          absent: s.attendance.length > 0 ? s.attendance[0].absent : false,
          permission:
            s.attendance.length > 0 ? s.attendance[0].permission : false,
        })),
      });
    },
  );

export const myclassRouter = new Hono().get(
  '/',
  authen,
  roleGuard(['admin']),
  async (c) => {
    const classes = await prisma.myClass.findMany();
    return c.json(
      {
        message: 'success',
        classes,
      },
      200,
    );
  },
);

export const courseRouter = new Hono().get(
  '/',
  authen,
  roleGuard(['admin']),
  async (c) => {
    const courses = await prisma.course.findMany();
    return c.json(
      {
        message: 'success',
        courses,
      },
      200,
    );
  },
);

export const attendanceRouter = new Hono()
  .post(
    '/add-new',
    authen,
    roleGuard(['admin']),
    zValidator(
      'json',
      z.object({
        courseId: z.string().min(4, 'Invalid course id'),
        attendDate: z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
        attendances: z
          .array(
            z.object({
              studentId: z.string().min(8, 'Invalid student id'),
              absent: z.coerce.boolean('Invalid absent'),
              permission: z.coerce.boolean('Invalid permission'),
            }),
          )
          .nonempty('Attendances empty'),
      }),
    ),
    async (c) => {
      const jsonData = c.req.valid('json');
      try {
        const upsertOperations = jsonData.attendances.map((item) => {
          return prisma.attendance.upsert({
            // Điều kiện tìm kiếm bản ghi cũ dựa trên Composite Unique Key
            where: {
              attendance_identifier: {
                studentId: item.studentId,
                courseId: jsonData.courseId,
                attendDate: new Date(jsonData.attendDate),
              },
            },
            // Hành vi 1: Nếu ĐÃ CÓ điểm danh -> Chỉ cập nhật lại cột absent/permission
            update: {
              absent: item.absent,
              permission: item.permission,
            },
            // Hành vi 2: Nếu CHƯA CÓ điểm danh -> Tạo mới hoàn toàn một hàng dữ liệu
            create: {
              studentId: item.studentId,
              courseId: jsonData.courseId,
              attendDate: new Date(jsonData.attendDate),
              absent: item.absent,
              permission: item.permission,
            },
          });
        });

        await prisma.$transaction(upsertOperations);
        return c.json(
          {
            message: 'success',
          },
          200,
        );
      } catch (error) {
        console.log(error);
        return c.json(
          {
            message: 'failed',
          },
          500 as const,
        );
      }
    },
  )
  .get(
    '/summary/:courseId/:classId',
    authen,
    roleGuard(['admin']),
    zValidator(
      'param',
      z.object({
        courseId: z.string().min(4, 'Invalid course id'),
        classId: z.string().min(3, 'Invalid class id'),
      }),
    ),
    async (c) => {
      const { courseId, classId } = c.req.valid('param');
      const results = await prisma.student.findMany({
        where: {
          classId,
        },
        include: {
          attendance: {
            where: {
              courseId,
            },
            select: {
              attendDate: true,
              absent: true,
              permission: true,
            },
          },
        },
        orderBy: {
          id: 'asc',
        },
      });
      if (!results) {
        return c.json(
          {
            message: 'Attendance empty',
          },
          404 as const,
        );
      }

      const dateHeaders = Array.from(
        new Set(
          results.flatMap((s) =>
            s.attendance.map((at) => at.attendDate.toISOString().split('T')[0]),
          ),
        ),
      ).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

      return c.json(
        {
          message: 'success',
          dateHeaders: dateHeaders.map((date) => format(date, 'dd-MM-yy')),
          summary: results.map((r) => ({
            id: r.id,
            fullName: `${r.firstName} ${r.lastName}`,
            attendances: r.attendance.reduce(
              (acc, current) => {
                const dateStr = format(current.attendDate, 'dd-MM-yy');
                acc[dateStr] = {
                  absent: current.absent,
                  permission: current.permission,
                };
                return acc;
              },
              {} as Record<string, { absent: boolean; permission: boolean }>,
            ),
            totalAbsent: r.attendance.reduce(
              (acc, current) => acc + (current.absent ? 1 : 0),
              0,
            ),
            totalPermission: r.attendance.reduce(
              (acc, current) => acc + (current.permission ? 1 : 0),
              0,
            ),
          })),
        },
        200,
      );
    },
  );

export const testRouter = new Hono().get(
  '/',
  authen,
  roleGuard(['admin']),
  async (c) => {
    const results = await prisma.test.findMany({
      orderBy: {
        id: 'asc',
      },
    });
    return c.json({
      message: 'success',
      tests: results,
    });
  },
);

export const scoreRouter = new Hono()
  .post(
    '/add-new',
    authen,
    roleGuard(['admin']),
    zValidator(
      'json',
      z.object({
        courseId: z.string().min(4, 'Invalid course id'),
        testId: z.coerce.number(),
        scores: z
          .array(
            z.object({
              studentId: z.string().min(8, 'Invalid student id'),
              score: z.coerce.number(),
            }),
          )
          .nonempty('Scores empty'),
      }),
    ),
    async (c) => {
      const { courseId, testId, scores } = c.req.valid('json');
      try {
        const upsertOperations = scores.map((item) => {
          return prisma.score.upsert({
            // Điều kiện tìm kiếm bản ghi cũ dựa trên Composite Unique Key
            where: {
              courseId_testId_studentId: {
                studentId: item.studentId,
                courseId: courseId,
                testId: testId,
              },
            },
            // Hành vi 1: Nếu ĐÃ CÓ điểm -> Chỉ cập nhật lại cột score
            update: {
              score: item.score,
            },
            // Hành vi 2: Nếu CHƯA CÓ điểm -> Tạo mới hoàn toàn một hàng dữ liệu
            create: {
              studentId: item.studentId,
              courseId: courseId,
              testId: testId,
              score: item.score,
            },
          });
        });

        await prisma.$transaction(upsertOperations);
        return c.json(
          {
            message: 'success',
          },
          200,
        );
      } catch (error) {
        return c.json(
          {
            message: 'failed',
          },
          500 as const,
        );
      }
    },
  )
  .get(
    '/summary/:courseId/:classId',
    zValidator(
      'param',
      z.object({
        courseId: z.string().min(4, 'Invalid course id'),
        classId: z.string().min(3, 'Invalid class id'),
      }),
    ),
    async (c) => {
      const { courseId, classId } = c.req.valid('param');
      const results = await prisma.student.findMany({
        where: {
          classId,
        },
        include: {
          score: {
            where: {
              courseId,
            },
            include: {
              test: true,
            },
          },
        },
      });

      if (!results) {
        return c.json(
          {
            message: 'Scores empty',
          },
          404 as const,
        );
      }

      const testHeaders = await prisma.test.findMany({
        select: {
          name: true,
        },
        orderBy: {
          id: 'asc',
        },
      });

      return c.json({
        message: 'success',
        testHeaders: testHeaders.flatMap((test) => test.name),
        results: results.map((student) => ({
          id: student.id,
          fullName: `${student.firstName} ${student.lastName}`,
          dob: student.dob ? format(student.dob, 'dd-MM-yyyy') : '-',
          address: student.address,
          scores: student.score.reduce(
            (acc, current) => {
              const testName = current.test.name;
              acc[testName] = Number(current.score);
              return acc;
            },
            testHeaders.reduce(
              (acc, current) => ({
                ...acc,
                [current.name]: 0,
              }),
              {} as any,
            ),
          ),
          avgScore: student.score.reduce(
            (acc, current) =>
              acc + Number(current.score) * Number(current.test.weight),
            0,
          ),
        })),
      });
    },
  );

// .get(
//   '/classes/:classId',
//   authen,
//   roleGuard(['admin']),
//   zValidator(
//     'param',
//     z.object({
//       classId: z.string().min(3, 'Invalid class id'),
//     }),
//   ),
//   async (c) => {
//     const { classId } = c.req.valid('param');
//     const classes = await prisma.myClass.findUnique({
//       where: {
//         id: classId,
//       },
//     });
//     return c.json(
//       {
//         message: 'success',
//         classes,
//       },
//       200,
//     );
//   },
// )
// .post(
//   '/attendances/add-new',
//   authen,
//   roleGuard(['admin']),
//   zValidator(
//     'json',
//     z
//       .array(
//         z.object({
//           studentId: z.string().min(8, 'Invalid class id'),
//           courseId: z.string().min(4, 'Invalid class id'),
//           attendDate: z.coerce.date('Invalid date'),
//           absent: z.coerce.boolean('Invalid absent'),
//           permission: z.coerce.boolean('Invalid permission'),
//         }),
//       )
//       .nonempty('Attendance empty'),
//   ),
//   async (c) => {
//     const attendData = c.req.valid('json');
//     try {
//       await prisma.attendance.createMany({
//         data: attendData,
//         skipDuplicates: true,
//       });
//       return c.json(
//         {
//           message: 'success',
//         },
//         201,
//       );
//     } catch (error) {
//       return c.json(
//         {
//           message: 'failed',
//         },
//         500 as const,
//       );
//     }
//   },
// )
// .post(
//   '/attendances/:courseId/:classId',
//   authen,
//   roleGuard(['admin']),
//   zValidator(
//     'param',
//     z.object({
//       courseId: z.string().min(4, 'Invalid course id'),
//       classId: z.string().min(3, 'Invalid course id'),
//     }),
//   ),
//   zValidator(
//     'json',
//     z.object({
//       attendDate: z.coerce.date('Invalid date'),
//     }),
//   ),
//   async (c) => {
//     const { courseId, classId } = c.req.valid('param');
//     const { attendDate } = c.req.valid('json');
//     const results = await prisma.attendance.findMany({
//       where: {
//         attendDate,
//         courseId,
//         student: {
//           classId,
//         },
//       },
//       include: {
//         student: true,
//       },
//     });
//     const attendanceList = results.map((res) => ({
//       id: res.student.id,
//       fullname: `${res.student.firstName} ${res.student.lastName}`,
//       attendDate: res.attendDate,
//       absent: res.absent,
//       permission: res.permission,
//     }));
//     return c.json(
//       {
//         message: 'success',
//         attendanceList,
//       },
//       200,
//     );
//   },
// )
// .get(
//   '/attendances/fulldate/:courseId',
//   authen,
//   roleGuard(['admin']),
//   zValidator(
//     'param',
//     z.object({
//       courseId: z.string().min(4, 'Invalid course id'),
//     }),
//   ),
//   async (c) => {
//     const { courseId } = c.req.valid('param');
//     const results = await prisma.attendance.findMany({
//       where: {
//         courseId,
//       },
//       include: {
//         student: true,
//       },
//     });
//     if (!results) {
//       return c.json(
//         {
//           message: 'Attendance empty',
//         },
//         404 as const,
//       );
//     }
//     const attendanceList = results.map((res) => ({
//       id: res.student.id,
//       fullname: `${res.student.firstName} ${res.student.lastName}`,
//       attendDate: res.attendDate,
//       absent: res.absent,
//       permission: res.permission,
//     }));
//     const attendDateHeaders = results
//       .map((res) => res.attendDate.toISOString().split('T')[0])
//       .sort();
//     const wideTransform = Object.values(
//       attendanceList.reduce(
//         (acc, current) => {
//           const { id, fullname, attendDate, absent, permission } = current;
//           const dateKey = attendDate.toISOString().split('T')[0];
//           if (!acc[id]) {
//             acc[id] = { id, fullname, attendances: {} };
//           }
//           acc[id].attendances[dateKey] = { absent, permission };
//           return acc;
//         },
//         {} as Record<
//           string,
//           {
//             id: string;
//             fullname: string;
//             attendances: Record<
//               string,
//               { absent: boolean; permission: boolean }
//             >;
//           }
//         >,
//       ),
//     );
//     const wideResults = wideTransform.map((student) => {
//       const totalAbsents = Object.values(student.attendances).filter(
//         (s) => s.absent === true,
//       ).length;
//       const totalPermission = Object.values(student.attendances).filter(
//         (s) => s.permission === true,
//       ).length;
//       return {
//         ...student,
//         totalAbsents,
//         totalPermission,
//         absentWithoutPermission: totalAbsents - totalPermission,
//       };
//     });

//     return c.json(
//       {
//         message: 'success',
//         data: wideResults,
//         attendDateHeaders,
//       },
//       200,
//     );
//   },
// )
// .get(
//   '/scores/fullscore/:courseId',
//   zValidator(
//     'param',
//     z.object({
//       courseId: z.string().min(4, 'Invalid course id'),
//     }),
//   ),
//   async (c) => {
//     const { courseId } = c.req.valid('param');
//     const results = await prisma.score.findMany({
//       where: {
//         courseId,
//       },
//       include: {
//         test: true,
//         student: true,
//       },
//     });

//     if (!results) {
//       throw new Error('Scores not found');
//     }

//     const scores = results.map((score) => ({
//       id: score.studentId,
//       fullname: `${score.student.firstName} ${score.student.lastName}`,
//       testId: score.test.id,
//       testName: score.test.name,
//       testWeight: score.test.weight,
//       score: score.score,
//     }));

//     const wideTransform = Object.values(
//       scores.reduce(
//         (acc, current) => {
//           const { id, fullname, testId, testName, testWeight, score } =
//             current;
//           if (!acc[id]) {
//             acc[id] = { id, fullname, scores: {} };
//           }
//           acc[id].scores[testName] = Number(score) * Number(testWeight);
//           return acc;
//         },
//         {} as Record<
//           string,
//           {
//             id: string;
//             fullname: string;
//             scores: Record<string, number>;
//           }
//         >,
//       ),
//     );

//     const wideResults = wideTransform.map((student) => {
//       const avgScore = Object.values(student.scores).reduce(
//         (acc, current) => acc + current,
//         0,
//       );

//       return {
//         ...student,
//         avgScore,
//       };
//     });
//     return c.json({
//       message: 'success',
//       data: wideResults,
//     });
//   },
// );
