import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Text } from '../text';

interface CardDescriptionProps {
  title: string;
  className?: string;
}

export const CardDescription = ({ title, className }: CardDescriptionProps) => {
  const classes = twMerge(clsx('text-center py-2', className));

  return (
    <div className={classes}>
      <Text fontSize='md' fontWeight='bold'>
        {title}
      </Text>
    </div>
  );
};
