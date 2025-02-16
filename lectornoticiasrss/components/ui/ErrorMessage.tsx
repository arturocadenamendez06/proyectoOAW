import { toast } from 'sonner';

const ErrorMessage = ({ message }: { message: string }) => {
  toast.error(message, {
    position: 'top-right',
    duration: 5000,
  });

  return null;
};

export default ErrorMessage;