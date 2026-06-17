import { Header } from './Header';

export const Layout = ({ children, onNewIdea }) => {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      <Header onNewIdea={onNewIdea} />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};
