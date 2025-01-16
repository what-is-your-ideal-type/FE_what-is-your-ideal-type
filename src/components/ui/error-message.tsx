import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Text } from './text';

interface errorMessageProps {
  message: string;
  className?: string;
}

export const ErrorMessage = ({ message, className }: errorMessageProps) => {
  const classes = twMerge(clsx('mr-auto ml-2', className));

  return (
    <Text color='red' fontSize='sm' className={classes}>
      {message}
    </Text>
  );
};
