/**
 * @copyright 2026 Nguyen Viet Tien
 * @license Apache-2.0
 */

/**
 * Modules
 */
import { useFetcher, useLoaderData } from 'react-router';
import { useState, useEffect } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import { format } from 'date-fns';

/**
 * Components
 */
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import {
  Table,
  TableBody,
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
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

/**
 * Assets
 */
import { Loading03Icon, Calendar02Icon } from 'hugeicons-react';

/**
 * Interfaces
 */
interface AttendanceFormData {
  records: Record<string, { absent: boolean; permission: boolean }>;
}
interface PayloadFormData {
  courseId: string;
  attendDate: string;
  attendances: { studentId: string; absent: boolean; permission: boolean }[];
}

const AttendancePage = () => {
  // loading classes and courses
  const { classes, courses } = useLoaderData();
  // save selected courseId
  const [courseId, setCourseId] = useState<string>('');
  // save selected classId
  const [classId, setClassId] = useState<string>('');
  // save selected attendance date
  const [attendDate, setAttendDate] = useState<Date>(new Date());
  // fetch students with classId and courseId
  const studentsFetcher = useFetcher();
  // fetch attendance of students in attendance date
  const attendancesFetcher = useFetcher();

  const students = studentsFetcher.data;
  const isStudentsLoading = studentsFetcher.state === 'loading';

  // fetch students
  const handleFetchStudents = () => {
    const formattedDate = format(attendDate, 'yyyy-MM-dd');
    studentsFetcher.submit(
      {
        classId,
        courseId,
        attendDate: formattedDate,
        key: 'fetch-students',
      },
      { method: 'POST', action: '.' },
    );
  };

  // display toast if error on fetching student
  useEffect(() => {
    if (studentsFetcher.state === 'idle' && studentsFetcher.data === null) {
      toast.error('Vui lòng chọn đầy đủ thông tin');
    }
  }, [studentsFetcher.state, studentsFetcher.data]);

  // react-hook-form initiation with empty student records
  const { handleSubmit, control, setValue, reset } =
    useForm<AttendanceFormData>({
      defaultValues: {
        records: {},
      },
    });

  // use to watch absent state of each student
  const watchedRecords =
    useWatch({
      control,
      name: 'records',
    }) || {};

  // reset toàn bộ thông tin điểm danh về giá trị mặc định
  // absent: false, permission: false
  useEffect(() => {
    if (students && Array.isArray(students)) {
      console.log(students);
      reset({
        records: students.reduce((acc: any, student: any) => {
          acc[student.id] = {
            absent: student.absent,
            permission: student.permission,
          };
          return acc;
        }, {}),
      });
    }
  }, [students, reset]);

  // display toast after fetching attendance data
  useEffect(() => {
    if (attendancesFetcher.state === 'idle' && attendancesFetcher.data) {
      if (attendancesFetcher.data.message === 'success') {
        toast.success('Đã lưu dữ liệu điểm danh thành công!');
      } else {
        toast.error('Lưu điểm danh thất bại, vui lòng thử lại.');
      }
    }
  }, [attendancesFetcher.state, attendancesFetcher.data]);

  // submit attendance data
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
      attendDate: format(attendDate, 'yyyy-MM-dd'),
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
    <div className='pt-3 md:pt-6 px-4 md:px-8 flex flex-col h-auto lg:h-[calc(100vh-100px)] justify-start items-stretch w-full overflow-y-auto lg:overflow-hidden'>
      <div className='flex flex-col lg:grid lg:grid-cols-[350px_auto_1fr] items-stretch w-full h-auto lg:h-full gap-4 pt-4 lg:pt-10'>
        <div className='flex flex-col justify-start items-center gap-2 shrink-0 w-full h-auto'>
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
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    data-empty={!attendDate}
                    className='w-70 justify-start text-left font-normal data-[empty=true]:text-muted-foreground'
                  >
                    <Calendar02Icon />
                    {attendDate ? (
                      <span>
                        {attendDate.toLocaleDateString('vi-VN', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                        })}
                      </span>
                    ) : (
                      <span>Chọn ngày học</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0'>
                  <Calendar
                    mode='single'
                    selected={attendDate}
                    onSelect={setAttendDate}
                    required={true}
                  />
                </PopoverContent>
              </Popover>
            </Field>
            <Button
              className='w-full mt-3'
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
          className='hidden lg:block h-full mx-8'
        />

        <div className='w-full h-auto lg:h-full flex flex-col justify-between items-stretch lg:overflow-hidden'>
          <div className='flex flex-col w-full h-auto lg:h-full lg:overflow-hidden'>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='flex flex-col h-auto lg:h-full w-full justify-between'
            >
              <ScrollArea className='flex-1 min-h-0 w-full overflow-y-auto pr-2'>
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
                            {item.fullName}
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
                <div className='pt-4 pb-2 bg-background w-full flex justify-end shrink-0 border-t mt-4 sticky bottom-0 z-10 box-border'>
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

export default AttendancePage;
