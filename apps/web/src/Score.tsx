/**
 * @copyright 2026 Nguyen Viet Tien
 * @license Apache-2.0
 */

import { useFetcher, useLoaderData } from 'react-router';
import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { useForm, Controller } from 'react-hook-form';

import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { Loading03Icon } from 'hugeicons-react';

interface AttendanceFormData {
  records: Record<string, number>;
}

interface PayloadFormData {
  courseId: string;
  testId: string;
  scores: { studentId: string; score: number }[];
}

const Score = () => {
  const { classes, courses, tests } = useLoaderData();
  const [courseId, setCourseId] = useState<string>('');
  const [classId, setClassId] = useState<string>('');
  const [testId, setTestId] = useState<string>('');

  const studentsFetcher = useFetcher();
  const scoresFetcher = useFetcher();
  const students = studentsFetcher.data;
  const isStudentsLoading = studentsFetcher.state === 'loading';

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AttendanceFormData>({
    defaultValues: {
      records: {},
    },
    mode: 'onChange', // Kích hoạt kiểm tra lỗi ngay khi thay đổi input
  });

  useEffect(() => {
    // Kiểm tra nghiêm ngặt xem students có tồn tại và có đúng là Mảng không
    if (students && Array.isArray(students)) {
      // reset toàn bộ thông tin điểm danh về giá trị mặc định
      reset({
        records: students.reduce((acc: any, student: any) => {
          acc[student.id] = student.score ?? 0;
          return acc;
        }, {}),
      });
    }
  }, [students, reset]);

  useEffect(() => {
    if (scoresFetcher.state === 'idle' && scoresFetcher.data) {
      if (scoresFetcher.data.message === 'success') {
        toast.success('Đã lưu điểm thành công!');
      } else {
        toast.error('Lưu điểm thất bại, vui lòng thử lại.');
      }
    }
  }, [scoresFetcher.state, scoresFetcher.data]);

  const handleFetchStudents = () => {
    studentsFetcher.submit(
      { courseId, classId, testId, key: 'fetch-students' },
      { method: 'POST', action: '.' },
    );
  };

  const onSubmit = async (data: AttendanceFormData) => {
    const scores = Object.entries(data.records).map(([studentId, score]) => ({
      studentId,
      score: Number(testId) !== 1 ? Number(score) : 8,
    }));

    const payload: PayloadFormData = {
      courseId,
      testId,
      scores,
    };
    scoresFetcher.submit(
      { jsonData: JSON.stringify(payload), key: 'submit-score' },
      {
        method: 'POST',
        action: '.',
      },
    );
  };

  return (
    <div className='pt-3 md:pt-6 px-8 flex flex-col h-[calc(100dvh-100px)] justify-start items-stretch w-full overflow-hidden'>
      <div className='grid grid-cols-[1fr_auto_2fr] items-stretch w-full h-full gap-4 flex-1 pt-10 overflow-hidden'>
        <div className='flex flex-col justify-start items-center gap-2'>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor='classId'>Môn</FieldLabel>
              <Select onValueChange={(value) => setCourseId(value)}>
                <SelectTrigger
                  className='w-full'
                  id='classId'
                >
                  <SelectValue placeholder='Chọn môn học' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {courses.map((item: any) => (
                      <SelectItem
                        key={item.id}
                        value={item.id}
                      >
                        {item.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor='classId'>Lớp</FieldLabel>
              <Select onValueChange={(value) => setClassId(value)}>
                <SelectTrigger
                  className='w-full'
                  id='classId'
                >
                  <SelectValue placeholder='Chọn lớp học' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {classes.map((item: any) => (
                      <SelectItem
                        key={item.id}
                        value={item.id}
                      >
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor='classId'>Điểm BP</FieldLabel>
              <Select onValueChange={(value) => setTestId(value)}>
                <SelectTrigger
                  className='w-full'
                  id='classId'
                >
                  <SelectValue placeholder='Chọn điểm BP' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {tests.map((item: any) => (
                      <SelectItem
                        key={item.id}
                        value={item.id}
                      >
                        {item.content}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Button
              className='w-80 justify-self-end md:w-full mt-3'
              onClick={handleFetchStudents}
            >
              {isStudentsLoading ? (
                <Loading03Icon className='animate-spin' />
              ) : (
                'Nhập điểm'
              )}
            </Button>
          </FieldGroup>
        </div>

        <Separator
          orientation='vertical'
          className='h-full mx-8'
        />

        <div className='w-full h-full flex flex-col justify-between items-stretch overflow-hidden'>
          <div className='flex flex-col w-full h-full overflow-hidden'>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='flex flex-col h-full w-full overflow-hidden justify-between'
            >
              <ScrollArea className='flex-1 w-full overflow-y-auto pr-2'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className='w-[20%] font-bold'>MSSV</TableHead>
                      <TableHead className='w-auto font-bold'>
                        Họ tên SV
                      </TableHead>
                      <TableHead className='w-[25%] font-bold'>Điểm</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students?.map((item: any) => {
                      return (
                        <TableRow key={item.id}>
                          <TableCell className='w-[20%]'>{item.id}</TableCell>
                          <TableCell className='w-auto'>
                            {item.fullName}
                          </TableCell>
                          <TableCell className='w-[25%] text-center'>
                            <Controller
                              name={`records.${item.id}`}
                              control={control}
                              rules={{
                                required: 'Điểm số phải từ 0 đến 10',
                                min: {
                                  value: 0,
                                  message: 'Điểm số không được nhỏ hơn 0',
                                },
                                max: {
                                  value: 10,
                                  message: 'Điểm số không được lớn hơn 10',
                                },
                              }}
                              render={({ field }) => {
                                const inputError = errors.records?.[item.id];
                                return (
                                  <Tooltip open={!!inputError}>
                                    <TooltipTrigger asChild>
                                      <Input
                                        value={field.value ?? 0}
                                        onChange={field.onChange}
                                      />
                                    </TooltipTrigger>
                                    {inputError && (
                                      <TooltipContent
                                        side='left'
                                        className='text-xs italic'
                                      >
                                        {inputError.message}
                                      </TooltipContent>
                                    )}
                                  </Tooltip>
                                );
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </ScrollArea>

              {students && (
                <div className='pt-4 pb-2 bg-background w-full flex justify-end sticky bottom-0 z-10 border-t mt-2'>
                  <Button
                    type='submit'
                    className='w-full md:w-auto my-2'
                    disabled={!!errors.records}
                  >
                    {Number(testId) === 1 ? 'Tạo tự động' : 'Lưu điểm'}
                  </Button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Score;
