interface AlertProps {
  message: string;
  type?: 'error' | 'success' | 'info';
}

export const Alert = ({ message, type = 'info' }: AlertProps) => {
  const styleMap: Record<typeof type, string> = {
    error: 'bg-red-100 text-red-800 border border-red-200',
    success: 'bg-green-100 text-green-800 border border-green-200',
    info: 'bg-blue-100 text-blue-800 border border-blue-200'
  };

  return <div className={`rounded px-4 py-2 text-sm ${styleMap[type]}`}>{message}</div>;
};
