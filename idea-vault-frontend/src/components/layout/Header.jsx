import { Button } from '../ui/Button';

export const Header = ({ onNewIdea }) => {
  return (
    <header className="sticky top-0 z-30 w-full bg-white border-b border-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold tracking-tighter text-black uppercase">
              Idea Vault
            </span>
          </div>
          <div className="flex items-center space-x-4">
          </div>
        </div>
      </div>
    </header>
  );
};
