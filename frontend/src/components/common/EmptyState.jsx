import { FiInbox } from 'react-icons/fi';
import Button from './Button';

const EmptyState = ({ icon: Icon = FiInbox, title = 'No data found', description = '', actionLabel, onAction }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-20 h-20 bg-light-gray rounded-full flex items-center justify-center mb-6">
        <Icon className="text-3xl text-slate-custom" />
      </div>
      <h3 className="text-xl font-semibold text-navy mb-2">{title}</h3>
      {description && <p className="text-slate-custom mb-6 max-w-md">{description}</p>}
      {actionLabel && onAction && (
        <Button variant="primary" onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  );
};

export default EmptyState;
