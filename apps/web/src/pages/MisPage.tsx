/**
 * @copyright 2026 Nguyen Viet Tien
 * @license Apache-2.0
 */

/**
 * Modules
 */
import { Link } from 'react-router';

/**
 * Components
 */
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Separator } from '@/components/ui/separator';

/**
 * Custom components
 */
import ProfCard from '@/components/custom/ProfCard';

/**
 * Assets
 */
import { CircleIcon, SquareIcon } from 'hugeicons-react';
import { mis } from '@/assets/mis-program';

const MisPage = () => {
  return (
    <div className='pt-3 md:pt-8 px-8 gap-4 flex flex-col justify-start items-stretch w-full overflow-hidden'>
      <div className='container w-full md:w-8xl justify-center py-8'>
        <div className='text-2xl font-semibold'>{mis.title}</div>
        <div className='w-full flex flex-col-reverse gap-3 lg:grid lg:grid-cols-[1fr_50px_1.5fr] mt-8 items-center'>
          <blockquote className='border-l-4 border-amber-500 pl-4 italic text-muted-foreground my-4'>
            {mis.brief}
          </blockquote>
          <div></div>
          <AspectRatio
            ratio={21 / 9}
            className='rounded-lg bg-muted'
          >
            <img
              src={mis.image}
              alt='mis-cover'
              className='w-full rounded-lg object-cover'
            />
          </AspectRatio>
        </div>

        <div className='text-xl mt-8'>TÓM TẮT HỌC PHẦN</div>
        <ul className='space-y-3 ml-6 my-3'>
          {[mis.intro1, mis.intro2, mis.intro3, mis.intro4].map(
            (text, index) => (
              <li
                key={index}
                className='flex items-start gap-2.5 text-sm'
              >
                <CircleIcon
                  size={8}
                  className='text-emerald-500 shrink-0 mt-2 fill-emerald-500'
                />
                <span className='text-muted-foreground leading-relaxed'>
                  {text}
                </span>
              </li>
            ),
          )}
        </ul>

        <div className='text-xl mt-8'>YÊU CẦU KỸ NĂNG</div>
        <ul className='space-y-3 ml-6 my-3'>
          {[mis.hardskill, mis.softskill].map((text, index) => (
            <li
              key={index}
              className='flex items-start gap-2.5 text-sm'
            >
              <CircleIcon
                size={8}
                className='text-emerald-500 shrink-0 mt-2 fill-emerald-500'
              />
              <span className='text-muted-foreground leading-relaxed'>
                {text}
              </span>
            </li>
          ))}
        </ul>

        <div className='text-xl mt-8'>NỘI DUNG HỌC PHẦN</div>
        <ul className='space-y-3 ml-6 my-3'>
          {mis.lesson_contents.map((chapter, index) => {
            const [title, lessons] = Object.entries(chapter)[0] || [];
            return (
              <li
                key={index}
                className='flex items-start gap-2.5 text-sm'
              >
                <CircleIcon
                  size={8}
                  className='text-emerald-500 shrink-0 mt-2 fill-emerald-500'
                />
                <ul className='leading-relaxed flex flex-col gap-2 w-full'>
                  <span className='font-semibold'>{title}</span>
                  {lessons.map((text: string, index: number) => (
                    <li
                      key={index}
                      className='flex items-start gap-2.5 text-sm w-full'
                    >
                      <SquareIcon
                        size={6}
                        className='text-blue-500 shrink-0 mt-2 fill-blue-500'
                      />
                      <span className='text-muted-foreground leading-relaxed'>
                        {text}
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>

        <div className='text-xl mt-8'>BÀI TẬP LỚN</div>
        <ul className='space-y-3 ml-6 my-3'>
          {mis.test_contents.map((test, index) => (
            <li
              key={index}
              className='flex items-start gap-2.5 text-sm'
            >
              <CircleIcon
                size={8}
                className='text-emerald-500 shrink-0 mt-2 fill-emerald-500'
              />
              <ul className='leading-relaxed flex flex-col gap-2 w-full'>
                <span className='font-semibold'>{test.title}</span>
                <li className='flex items-start gap-2.5 text-sm w-full'>
                  <SquareIcon
                    size={6}
                    className='text-blue-500 shrink-0 mt-2 fill-blue-500'
                  />
                  <span className='text-muted-foreground leading-relaxed'>
                    Mục tiêu: {test.purpose}
                  </span>
                </li>
                <li className='flex items-start gap-2.5 text-sm w-full'>
                  <SquareIcon
                    size={6}
                    className='text-blue-500 shrink-0 mt-2 fill-blue-500'
                  />
                  <span className='text-muted-foreground leading-relaxed'>
                    Yêu cầu: {test.required}
                  </span>
                </li>
                <li className='flex items-start gap-2.5 text-sm w-full'>
                  <SquareIcon
                    size={6}
                    className='text-blue-500 shrink-0 mt-2 fill-blue-500'
                  />
                  <span className='text-muted-foreground leading-relaxed'>
                    Kết quả: {test.result}
                  </span>
                </li>
                <li className='flex items-start gap-2.5 text-sm w-full'>
                  <SquareIcon
                    size={6}
                    className='text-blue-500 shrink-0 mt-2 fill-blue-500'
                  />
                  <span className='text-muted-foreground leading-relaxed'>
                    Hình thức báo cáo kết quả: {test.submit_form}
                  </span>
                </li>
                <li className='flex items-start gap-2.5 text-sm w-full'>
                  <SquareIcon
                    size={6}
                    className='text-blue-500 shrink-0 mt-2 fill-blue-500'
                  />
                  <span className='text-muted-foreground leading-relaxed'>
                    Thời gian thực hiện (dự kiến): {test.duration}
                  </span>
                </li>
                <li className='flex items-start gap-2.5 text-sm w-full'>
                  <SquareIcon
                    size={6}
                    className='text-blue-500 shrink-0 mt-2 fill-blue-500'
                  />
                  <span className='text-muted-foreground leading-relaxed'>
                    Điểm số: {test.score}
                  </span>
                </li>
              </ul>
            </li>
          ))}
        </ul>

        <div className='text-xl mt-8'>GIÁO TRÌNH/BÀI GIẢNG</div>
        <ul className='space-y-3 ml-6 my-3'>
          {mis.docs.map((text, index) => (
            <li
              key={index}
              className='flex items-start gap-2.5 text-sm'
            >
              <CircleIcon
                size={8}
                className='text-emerald-500 shrink-0 mt-2 fill-emerald-500'
              />
              <Link
                to='docs'
                className='text-muted-foreground leading-relaxed'
              >
                {text}
              </Link>
            </li>
          ))}
        </ul>

        <div className='text-xl mt-8'>TÀI LIỆU THAM KHẢO</div>
        <ul className='space-y-3 ml-6 my-3'>
          {mis.refs.map((text, index) => (
            <li
              key={index}
              className='flex items-start gap-2.5 text-sm'
            >
              <CircleIcon
                size={8}
                className='text-emerald-500 shrink-0 mt-2 fill-emerald-500'
              />
              <Link
                to='docs'
                className='text-muted-foreground leading-relaxed'
              >
                {text}
              </Link>
            </li>
          ))}
        </ul>

        <Separator />

        <div className='text-lg mt-8 text-muted-foreground italic mb-4'>
          THÔNG TIN VỀ GIẢNG VIÊN
        </div>
        <ProfCard />
      </div>
    </div>
  );
};

export default MisPage;
