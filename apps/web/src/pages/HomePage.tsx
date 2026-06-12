/**
 * @copyright 2026 Nguyen Viet Tien
 * @license Apache-2.0
 */

/**
 * Modules
 */
import { useEffect, useState } from 'react';
import { useSearchParams, useFetcher } from 'react-router';
import { toast } from 'sonner';

/**
 * Components
 */
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

/**
 * Assets
 */
import { User02Icon, Loading02Icon } from 'hugeicons-react';

const HomePage = () => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === 'submitting';

  // get studentId from URL or localStorage
  const [searchParams, setSearchParams] = useSearchParams();
  const [studentId, setStudentId] = useState(() => {
    return (
      searchParams.get('studentId') || localStorage.getItem('studentId') || ''
    );
  });

  // submit and get student data
  // set studentId to url and save to localStorage
  const handleSubmit = () => {
    if (!studentId) return;
    localStorage.setItem('studentId', studentId);
    setSearchParams(
      (prev) => {
        prev.set('studentId', studentId);
        return prev;
      },
      { replace: true },
    );
    fetcher.submit(
      { studentId },
      {
        method: 'POST',
      },
    );
  };

  // get studentId from url or from storage on first load
  useEffect(() => {
    const initialId =
      searchParams.get('studentId') || localStorage.getItem('studentId');
    if (initialId && fetcher.state === 'idle' && !fetcher.data) {
      if (!searchParams.get('studentId')) {
        setSearchParams(
          (prev) => {
            prev.set('studentId', initialId);
            return prev;
          },
          { replace: true },
        );
      }

      fetcher.submit({ studentId: initialId }, { method: 'POST' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data === null) {
      toast.error('Không tìm thấy sinh viên');
    }
  }, [fetcher.data, fetcher.state]);

  const student = fetcher.data;

  return (
    <div className='container max-w-7xl pt-6 md:pt-10 flex flex-col min-h-[calc(100vh-var(--header-height)-var(--footer-height))] justify-start items-stretch w-full'>
      <div className='text-xl lg:text-2xl font-semibold'> Xem điểm </div>
      <div className='flex flex-col lg:grid lg:grid-cols-[1fr_auto_2fr] items-stretch w-full h-full gap-4 flex-1 py-4 lg:py-10'>
        <div className='flex flex-col justify-start items-center gap-2'>
          <Field className='w-full lg:max-w-sm'>
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
            <FieldDescription className='italic'>
              Nhập mã số sinh viên
            </FieldDescription>
          </Field>
          <Button
            className='w-full justify-self-end mt-3'
            onClick={handleSubmit}
          >
            {isSubmitting ? (
              <Loading02Icon className='animate-spin' />
            ) : (
              'Xem điểm'
            )}
          </Button>
        </div>

        <Separator
          orientation='vertical'
          className='hidden lg:block h-full mx-8'
        />

        <div className='w-full h-full flex flex-col justify-start items-start gap-6 py-4 lg:py-0'>
          <div className='w-full h-full grid grid-cols-[200px_1fr] items-stretch gap-3'>
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
