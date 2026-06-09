import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
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
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

import {
  CheckmarkCircle02Icon,
  AlertDiamondIcon,
  Alert02Icon,
} from 'hugeicons-react';

import { useFetcher, useLoaderData } from 'react-router';
import { useState } from 'react';

const Summary = () => {
  const [courseId, setCourseId] = useState<string>('');
  const [classId, setClassId] = useState<string>('');

  const loaderData = useLoaderData();
  const { classes, courses } = loaderData;

  const summaryFetcher = useFetcher();
  const summaryData = summaryFetcher.data;
  const dateHeaders = summaryData?.dateHeaders;
  const attendanceSummary = summaryData?.attendanceSummary;
  const testHeaders = summaryData?.testHeaders;
  const scoreSummary = summaryData?.scoreSummary;

  const handleSubmit = () => {
    summaryFetcher.submit(
      { courseId, classId },
      {
        method: 'GET',
        action: '.',
      },
    );
  };

  return (
    <div className='pt-3 md:pt-6 px-8 flex flex-col h-[calc(100dvh-100px)] justify-start items-stretch w-full overflow-hidden'>
      <div className='w-full h-full'>
        <Tabs
          defaultValue='attendance'
          className='w-full h-full flex flex-col overflow-hidden'
        >
          <div className='flex justify-between w-full shrink-0'>
            <TabsList variant='line'>
              <TabsTrigger
                value='attendance'
                className='text-md data-[state=active]:text-primary!'
              >
                Xem điểm danh
              </TabsTrigger>
              <TabsTrigger
                value='score'
                className='text-md data-[state=active]:text-primary!'
              >
                Xem điểm BP
              </TabsTrigger>
            </TabsList>
            <Sheet>
              <SheetTrigger asChild>
                <Button>Chọn lớp</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Chọn lớp</SheetTitle>
                  <SheetDescription>
                    Chọn lớp và môn học, sau đó nhấn Lưu để chấp nhận thay đổi
                  </SheetDescription>
                </SheetHeader>
                <div className='grid flex-1 auto-rows-min gap-6 px-4'>
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
                            {courses?.map((item: any) => (
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
                            {classes?.map((item: any) => (
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
                  </FieldGroup>
                </div>
                <SheetFooter>
                  <Button
                    type='button'
                    onClick={handleSubmit}
                  >
                    Lưu thay đổi
                  </Button>
                  <SheetClose asChild>
                    <Button variant='outline'>Đóng</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>

          <TabsContent
            value='attendance'
            className='mt-4 flex-1 flex flex-col h-full w-full overflow-hidden'
          >
            <div className='w-full shrink-0 border-b bg-background pr-4'>
              <Table className='table-fixed w-full'>
                <TableHeader>
                  <TableRow className='hover:bg-transparent border-none h-full'>
                    <TableHead className='w-22 font-bold'>MSSV</TableHead>
                    <TableHead className='w-55 whitespace-nowrap font-bold'>
                      Họ tên SV
                    </TableHead>
                    {dateHeaders?.map((h: string) => (
                      <TableHead
                        key={h}
                        className='w-22 text-center whitespace-nowrap font-bold'
                      >
                        {h}
                      </TableHead>
                    ))}
                    <TableHead className='w-auto' />
                    <TableHead className='w-22 text-center font-bold'>
                      Buổi vắng
                    </TableHead>
                    <TableHead className='w-22 text-center font-bold'>
                      Có phép
                    </TableHead>
                  </TableRow>
                </TableHeader>
              </Table>
            </div>
            <ScrollArea className='flex-1 w-full h-1 pr-2'>
              <Table className='table-fixed w-full'>
                <TableBody>
                  {attendanceSummary?.map((student: any) => (
                    <TableRow key={student.id}>
                      <TableCell className='w-22'>{student.id}</TableCell>
                      <TableCell className='w-55 whitespace-nowrap'>
                        {student.fullName}
                      </TableCell>

                      {dateHeaders?.map((date: string) => {
                        const status = student.attendances[date];
                        if (!status)
                          return (
                            <TableCell
                              key={date}
                              className='w-22 text-center'
                            >
                              -
                            </TableCell>
                          );
                        if (!status.absent) {
                          return (
                            <TableCell
                              key={date}
                              className='w-22'
                            >
                              <CheckmarkCircle02Icon className='mx-auto w-5 h-5 text-green-600' />
                            </TableCell>
                          );
                        }
                        return (
                          <TableCell
                            key={date}
                            className='w-22'
                          >
                            {status.permission ? (
                              <AlertDiamondIcon className='mx-auto w-5 h-5 text-amber-600' />
                            ) : (
                              <Alert02Icon className='mx-auto w-5 h-5 text-destructive' />
                            )}
                          </TableCell>
                        );
                      })}
                      <TableCell />
                      <TableCell className='w-22 text-center'>
                        {student.totalAbsent}
                      </TableCell>
                      <TableCell className='w-22 text-center'>
                        {student.totalPermission}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </TabsContent>

          <TabsContent
            value='score'
            className='mt-4 flex-1 flex flex-col h-full w-full overflow-hidden'
          >
            <div className='w-full shrink-0 border-b bg-background pr-4'>
              <Table className='table-fixed w-full'>
                <TableHeader>
                  <TableRow className='hover:bg-transparent border-none h-full font-bold'>
                    <TableHead className='w-22 font-bold'>MSSV</TableHead>
                    <TableHead className='w-55 whitespace-nowrap font-bold'>
                      Họ tên SV
                    </TableHead>
                    <TableCell className='w-30 font-bold'>Ngày sinh</TableCell>
                    <TableCell className='w-30 font-bold'>Quê quán</TableCell>
                    {testHeaders?.map((test: string) => (
                      <TableHead
                        key={test}
                        className='w-22 text-center whitespace-nowrap font-bold'
                      >
                        {test}
                      </TableHead>
                    ))}
                    <TableHead />
                    <TableHead className='w-35 text-center font-bold'>
                      Điểm TB-BP
                    </TableHead>
                  </TableRow>
                </TableHeader>
              </Table>
            </div>
            <ScrollArea className='flex-1 w-full h-1 pr-2'>
              <Table className='table-fixed w-full'>
                <TableBody>
                  {scoreSummary?.map((student: any) => (
                    <TableRow key={student.id}>
                      <TableCell className='w-22'>{student.id}</TableCell>
                      <TableCell className='w-55 whitespace-nowrap'>
                        {student.fullName}
                      </TableCell>
                      <TableCell className='w-30'>{student.dob}</TableCell>
                      <TableCell className='w-30'>{student.address}</TableCell>
                      {testHeaders?.map((test: string) => (
                        <TableCell
                          key={test}
                          className='w-22 text-center'
                        >
                          {student.scores[test]?.toFixed(2) ?? 0}
                        </TableCell>
                      ))}
                      <TableCell />
                      <TableCell className='w-35 text-center'>
                        {student.avgScore?.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Summary;
