import { mis } from '@/assets/mis-program';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { CircleIcon } from 'hugeicons-react';

const MisPage = () => {
  return (
    <div className='pt-3 md:pt-6 px-8 gap-4 flex flex-col h-[calc(100dvh-100px)] justify-start items-stretch w-full overflow-hidden'>
      <div className='text-2xl'>{mis.title}</div>
      <div className='w-full grid grid-cols-[1fr_50px_1.5fr] mt-8 items-end'>
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
      <div className=''>
        <ul className='space-y-3'>
          {[mis.intro1, mis.intro2, mis.intro3].map((text, index) => (
            <li
              key={index}
              className='flex items-start gap-2.5 text-sm'
            >
              <CircleIcon
                size={18}
                className='text-emerald-500 shrink-0 mt-0.5'
              />
              <span className='text-muted-foreground leading-relaxed'>
                {text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MisPage;
