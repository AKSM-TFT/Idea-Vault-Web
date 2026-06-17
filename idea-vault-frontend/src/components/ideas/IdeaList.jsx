import { IdeaCard } from './IdeaCard';

export const IdeaList = ({ ideas, onDelete }) => {
  if (ideas.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-gray-300">
        <svg className="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-1">No ideas yet</h3>
        <p className="text-gray-500 max-w-sm">
          Your vault is empty. Capture your next big idea.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {ideas.map((idea) => (
        <IdeaCard
          key={idea.id}
          idea={idea}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
