/**
 * @copyright 2026 Nguyen Viet Tien
 * @license Apache-2.0
 */

/**
 * Components
 */
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

/**
 * Assets
 */
import { Download04Icon } from 'hugeicons-react';

const DocsPage = () => {
  return (
    <div className='pt-3 md:pt-8 px-8 gap-4 flex flex-col justify-start items-stretch w-full overflow-hidden'>
      <div className='container w-full md:w-8xl justify-center'>
        <p className='text-xl font-semibold my-6'>GIÁO TRÌNH/BÀI GIẢNG</p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[60%] font-bold'>
                Tên Giáo trình/Bài giảng
              </TableHead>
              <TableHead className='w-[20%] font-bold'>Tác giả</TableHead>
              <TableHead className='w-[20%] font-bold'>Link tải về</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className='border-b-0'>
              <TableCell className='w-[60%] whitespace-normal'>
                Bài giảng Hệ thống thông tin quản lý (2019)
              </TableCell>
              <TableCell className='w-[20%] whitespace-normal'>
                Lê Thị Ngọc Diệp
              </TableCell>
              <TableCell className='w-[20%]'>
                <Button
                  asChild
                  variant='outline'
                >
                  <a href='https://drive.google.com/uc?export=download&id=1VtbE3O93wU7KUTgfgA5S9q07qbrdDLbJ'>
                    <Download04Icon />
                    Tải về
                  </a>
                </Button>
              </TableCell>
            </TableRow>
            <TableRow className='border-b-0'>
              <TableCell className='w-[60%] whitespace-normal'>
                Slide bài giảng Hệ thống thông tin quản lý
              </TableCell>
              <TableCell className='w-[20%] whitespace-normal'>
                Nguyễn Việt Tiên
              </TableCell>
              <TableCell className='w-[20%]'>
                <Button
                  asChild
                  variant='outline'
                >
                  <a href='https://drive.google.com/uc?export=download&id=1eGSa0e8MPJV_rg5Ts6SRWhUFV87phddX'>
                    <Download04Icon />
                    Tải về
                  </a>
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <p className='text-xl font-semibold my-6'>TÀI LIỆU THAM KHẢO</p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[60%] font-bold'>Tên tài liệu</TableHead>
              <TableHead className='w-[20%] font-bold'>Tác giả</TableHead>
              <TableHead className='w-[20%] font-bold'>Link tải về</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className='border-b-0'>
              <TableCell className='w-[60%] whitespace-normal'>
                Management Information Systems Managing The Digital Firm (17th
                Edition - 2019)
              </TableCell>
              <TableCell className='w-[20%] whitespace-normal'>
                Kenneth C. Laudon - Jane P. Laudon
              </TableCell>
              <TableCell className='w-[20%]'>
                <Button
                  asChild
                  variant='outline'
                >
                  <a href='https://drive.google.com/uc?export=download&id=15SdRGtfdKzOo-u3oIRJcABvBRBfi9ypL'>
                    <Download04Icon />
                    Tải về
                  </a>
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DocsPage;
