/**
 * @copyright 2026 Nguyen Viet Tien
 * @license Apache-2.0
 */

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { hc } from 'hono/client';
import type { AppTypes } from '@repo/api';
import type { InferResponseType } from 'hono';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { User02Icon } from 'hugeicons-react';
import { toast } from 'sonner';

const client = hc<AppTypes>(
  import.meta.env.VITE_API_URL || 'http://localhost:3000',
);

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

type Student = {
  fullName: string;
  className: string;
  totalAbsent: number;
  totalPermission: number;
  scores: CourseScoreRow[];
};

type StudentResponse = InferResponseType<
  (typeof client.api.students)[':studentId']['$get']
>;

type SuccessfulStudentData = Extract<
  StudentResponse,
  { student: Student }
>['student'];

const HomePage = () => {
  const [student, setStudent] = useState<SuccessfulStudentData>();
  const [, setSearchParams] = useSearchParams();

  const [studentId, setStudentId] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return (
      urlParams.get('studentId') || localStorage.getItem('studentId') || ''
    );
  });

  const handleSubmit = async () => {
    if (!studentId) return;
    const result = await client.api.students[':studentId'].$get({
      param: {
        studentId,
      },
    });
    if (!result.ok) {
      toast.error('Không tìm thấy sinh viên');
      return null;
    }
    const data = await result.json();
    setStudent(data.student);
    setSearchParams(
      (prev) => {
        prev.set('studentId', studentId);
        return prev;
      },
      { replace: true },
    );
    localStorage.setItem('studentId', studentId);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const initialId =
      urlParams.get('studentId') || localStorage.getItem('studentId');
    if (initialId) {
      const fetchInitialData = async () => {
        const result = await client.api.students[':studentId'].$get({
          param: { studentId: initialId },
        });
        if (!result.ok) return;
        const data = await result.json();
        setStudent(data.student);
      };

      fetchInitialData();
    }
  });

  return (
    <div className='container max-w-7xl pt-6 md:pt-10 flex flex-col min-h-[calc(100vh-var(--header-height)-var(--footer-height))] justify-start items-stretch w-full'>
      <div className='text-2xl'> Xem điểm </div>

      <div className='grid grid-cols-[1fr_auto_2fr] items-stretch w-full h-full gap-4 flex-1 pt-10'>
        <div className='flex flex-col justify-start items-center gap-2'>
          <Field className='max-w-sm'>
            <FieldLabel htmlFor='studentId'>Mã số SV</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id='studentId'
                placeholder='mssv'
                value={studentId || ''}
                onChange={(e) => setStudentId(e.target.value)}
              />
              <InputGroupAddon align='inline-start'>
                <User02Icon className='text-muted-foreground' />
              </InputGroupAddon>
            </InputGroup>
            <FieldDescription className='italic text-right'>
              Nhập mã số sinh viên
            </FieldDescription>
          </Field>
          <Button
            className='w-80 justify-self-end md:w-full mt-3'
            onClick={handleSubmit}
          >
            Xem điểm
          </Button>
        </div>

        <Separator
          orientation='vertical'
          className='h-full mx-8'
        />

        <div className='w-full h-full flex flex-col justify-start items-start gap-6'>
          <div className='w-full h-full grid grid-cols-[1fr_3fr] items-stretch gap-3'>
            <p className=''>Sinh viên</p>
            <p className='font-bold'>{student?.fullName ?? '-'}</p>
            <p>Số ngày nghỉ</p>
            <p>{student?.totalAbsent ?? '-'}</p>
            <p>Số ngày nghỉ có phép</p>
            <p>{student?.totalPermission ?? '-'}</p>
          </div>
          <div className='flex flex-col w-full h-full'>
            <p>Điểm số</p>
            <Table>
              <TableCaption className='text-left pl-4 mt-10'>
                <p className='italic underline'>Ghi chú:</p>
                <div className='flex flex-col gap-1 pt-2 pl-4'>
                  <p className='pl-4'>- Thường xuyên: 20%.</p>
                  <p className='pl-4'>- Bài tập 1: 40%.</p>
                  <p className='pl-4'>- Bài tập 2: 40%.</p>
                  <p className='pl-4'>- Điểm cộng: 20%, cao nhất: +2</p>
                </div>
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-[32%]'>Môn học</TableHead>
                  <TableHead className='w-[12%] text-center'>
                    Thường xuyên
                  </TableHead>
                  <TableHead className='w-[12%] text-center'>
                    Bài tập 1
                  </TableHead>
                  <TableHead className='w-[12%] text-center'>
                    Bài tập 2
                  </TableHead>
                  <TableHead className='w-[12%] text-center'>
                    Điểm cộng
                  </TableHead>
                  <TableHead className='w-[20%] text-center font-semibold'>
                    Trung bình
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {!student && (
                  <TableRow>
                    <TableCell className='w-[32%]'>---</TableCell>
                    <TableCell className='w-[12%] text-center'>-</TableCell>
                    <TableCell className='w-[12%] text-center'>-</TableCell>
                    <TableCell className='w-[12%] text-center'>-</TableCell>
                    <TableCell className='w-[12%] text-center'>-</TableCell>
                    <TableCell className='w-[20%] text-center'>-</TableCell>
                  </TableRow>
                )}
                {student?.scores?.map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell className='w-[32%] whitespace-nowrap'>
                      {item.name ?? '-'}
                    </TableCell>
                    <TableCell className='w-[12%] text-center'>
                      {item.TX?.toFixed(2) ?? '-'}
                    </TableCell>
                    <TableCell className='w-[12%] text-center'>
                      {item.BT1?.toFixed(2) ?? '-'}
                    </TableCell>
                    <TableCell className='w-[12%] text-center'>
                      {item.BT2?.toFixed(2) ?? '-'}
                    </TableCell>
                    <TableCell className='w-[12%] text-center'>
                      {item.BN?.toFixed(2) ?? '-'}
                    </TableCell>
                    <TableCell className='w-[20%] text-center font-semibold'>
                      {Number(item.avgScore)?.toFixed(2) ?? '-'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
