import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner = ({ message = "Chargement des héros..." }: LoadingSpinnerProps) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-12">
      <div className="relative">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
        <div className="absolute inset-0 w-8 h-8 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin" 
             style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
      </div>
      <p className="text-muted-foreground font-medium">{message}</p>
      <div className="flex space-x-1">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-primary rounded-full animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingSpinner;