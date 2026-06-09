/**
 * @copyright 2026 Nguyen Viet Tien
 * @license Apache-2.0
 */

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { useForm, Controller, useWatch } from 'react-hook-form';

import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { useFetcher, useLoaderData } from 'react-router';
import { useState, useEffect } from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { Loading03Icon } from 'hugeicons-react';

interface AttendanceFormData {
  records: Record<string, { absent: boolean; permission: boolean }>;
}

interface PayloadFormData {
  courseId: string;
  attendDate: string;
  attendances: { studentId: string; absent: boolean; permission: boolean }[];
}

const Attendance = () => {
  const { classes, courses } = useLoaderData();
  const [courseId, setCourseId] = useState<string>('');
  const [classId, setClassId] = useState<string>('');
  const [attendDate, setAttendDate] = useState<string>(
    new Date().toISOString(),
  );

  const studentsFetcher = useFetcher();
  const attendancesFetcher = useFetcher();
  const students = studentsFetcher.data;
  const isStudentsLoading = studentsFetcher.state === 'loading';

  const { handleSubmit, control, setValue, reset } =
    useForm<AttendanceFormData>({
      defaultValues: {
        records: {},
      },
    });

  const watchedRecords =
    useWatch({
      control,
      name: 'records',
    }) || {};

  useEffect(() => {
    // Kiểm tra nghiêm ngặt xem students có tồn tại và có đúng là Mảng không
    if (students && Array.isArray(students)) {
      // reset toàn bộ thông tin điểm danh về giá trị mặc định
      reset({
        records: students.reduce((acc: any, student: any) => {
          acc[student.id] = { absent: false, permission: false };
          return acc;
        }, {}),
      });
    }
  }, [students, reset]);

  useEffect(() => {
    // Khi attendancesFetcher chạy xong xuôi và trả về kết quả
    if (attendancesFetcher.state === 'idle' && attendancesFetcher.data) {
      if (attendancesFetcher.data.message === 'success') {
        toast.success('Đã lưu dữ liệu điểm danh thành công!');
      } else {
        toast.error('Lưu điểm danh thất bại, vui lòng thử lại.');
      }
    }
  }, [attendancesFetcher.state, attendancesFetcher.data]);

  const handleFetchStudents = () => {
    studentsFetcher.submit(
      { classId, key: 'fetch-students' },
      { method: 'POST', action: '.' },
    );
  };

  const onSubmit = async (data: AttendanceFormData) => {
    const attendances = Object.entries(data.records).map(
      ([studentId, status]) => ({
        studentId,
        absent: status.absent,
        permission: status.permission,
      }),
    );

    const payload: PayloadFormData = {
      courseId,
      attendDate,
      attendances,
    };
    attendancesFetcher.submit(
      { jsonData: JSON.stringify(payload), key: 'submit-attendance' },
      {
        method: 'POST',
        action: '.',
      },
    );
  };

  return (
    <div className='pt-3 md:pt-6 px-8 flex flex-col h-[calc(100dvh-100px)] justify-start items-stretch w-full overflow-hidden'>
      <div className='grid grid-cols-[350px_auto_1fr] items-stretch w-full h-full gap-4 flex-1 pt-10 overflow-hidden'>
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
              <FieldLabel htmlFor='attendDate'>Ngày học</FieldLabel>
              <Calendar
                id='attendDate'
                mode='single'
                className='rounded-lg border max-w-max'
                onDayClick={(value) => setAttendDate(value.toISOString())}
              />
            </Field>
            <Button
              className='w-80 justify-self-end md:w-full mt-3'
              onClick={handleFetchStudents}
            >
              {isStudentsLoading ? (
                <Loading03Icon className='animate-spin' />
              ) : (
                'Điểm danh'
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
                    <TableRow className='font-bold'>
                      <TableHead className='w-[20%]'>MSSV</TableHead>
                      <TableHead className='w-auto'>Họ tên SV</TableHead>
                      <TableHead className='w-[25%] text-center'>
                        Vắng
                      </TableHead>
                      <TableHead className='w-[25%] text-center'>
                        Có phép
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students?.map((item: any) => {
                      const isAbsent = watchedRecords[item.id]?.absent || false;
                      return (
                        <TableRow key={item.id}>
                          <TableCell className='w-[20%]'>{item.id}</TableCell>
                          <TableCell className='w-auto'>
                            {item.firstName} {item.lastName}
                          </TableCell>
                          <TableCell className='w-[25%] text-center'>
                            <Controller
                              name={`records.${item.id}.absent`}
                              control={control}
                              render={({ field }) => (
                                <Switch
                                  checked={field.value || false}
                                  onCheckedChange={(checked) => {
                                    field.onChange(checked);
                                    if (!checked)
                                      setValue(
                                        `records.${item.id}.permission`,
                                        false,
                                      );
                                  }}
                                />
                              )}
                            />
                          </TableCell>
                          <TableCell className='w-[25%] text-center'>
                            <Controller
                              name={`records.${item.id}.permission`}
                              control={control}
                              render={({ field }) => (
                                <Switch
                                  checked={field.value || false}
                                  onCheckedChange={field.onChange}
                                  disabled={!isAbsent}
                                />
                              )}
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
                  >
                    Lưu điểm danh
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

export default Attendance;
