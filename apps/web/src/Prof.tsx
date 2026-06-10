import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail02Icon, Call02Icon, MailAccount01Icon } from 'hugeicons-react';

const Prof = () => {
  return (
    <Card className='w-full overflow-hidden py-2 px-4 bg-transparent'>
      <div className='flex flex-row gap-4 md:gap-8 py-2 items-start lg:items-center'>
        <div className='w-14 h-14 rounded-full overflow-hidden shrink-0 bg-muted'>
          <img
            src='https://res.cloudinary.com/dgnvqqwdh/image/upload/v1775565814/user_avatars/okeh8dle7dgvwgyrg6ox.jpg'
            alt='Nguyễn Việt Tiên avatar'
            className='w-full h-full object-cover'
          />
        </div>
        <div className='flex flex-col gap-2 lg:grid lg:grid-cols-[1fr_250px_80px] flex-1 min-w-0 w-full lg:items-center'>
          <CardHeader className='p-0'>
            <CardTitle className='font-semibold text-left whitespace-nowrap'>
              Nguyễn Việt Tiên
            </CardTitle>
            <CardDescription className='text-left whitespace-nowrap'>
              Thạc sỹ Quản trị kinh doanh
            </CardDescription>
          </CardHeader>

          {/* Đưa thông tin liên hệ về dạng danh sách dọc gọn gàng */}
          <CardContent className='px-0 flex flex-col text-sm text-muted-foreground items-start'>
            <div className='flex gap-3 line-clamp-1 italic items-end'>
              <Call02Icon
                size={18}
                className='text-green-500/75 shrink-0'
              />
              0913928188
            </div>
            <div className='flex gap-3 line-clamp-1 italic items-end'>
              <Mail02Icon
                size={18}
                className='text-blue-500/75 shrink-0'
              />
              nguyenviettien79@hotmail.com
            </div>
          </CardContent>

          <Button
            className='max-w-sm'
            onClick={() =>
              (window.location.href = 'mailto:nguyenviettien79@hotmail.com')
            }
          >
            <MailAccount01Icon />
            Liên hệ
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Prof;
