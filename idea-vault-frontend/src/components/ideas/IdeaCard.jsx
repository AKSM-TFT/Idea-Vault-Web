import { useNavigate } from 'react-router-dom';

export const IdeaCard = ({ idea, onDelete }) => {
  const navigate = useNavigate();

  const formattedDate = new Date(idea.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const handleCardClick = (e) => {
    if (e.target.closest('[data-action]')) return;
    navigate(`/ideas/${idea.id}`);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={(e) => e.key === 'Enter' && handleCardClick(e)}
      className="group relative flex flex-col bg-white border border-gray-200 hover:border-black p-5 transition-all duration-200 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold leading-tight line-clamp-2 pr-2">
          {idea.title}
        </h3>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0" data-action>
          <button
            data-action
            onClick={() => onDelete(idea.id)}
            className="text-gray-400 hover:text-red-600 focus:outline-none"
            aria-label="Delete idea"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
        {idea.brief_summary}
      </p>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
        <span className="text-xs text-gray-300 font-medium group-hover:text-black transition-colors">
          Read more →
        </span>
        <span className="text-xs text-gray-400 font-mono">
          {formattedDate}
        </span>
      </div>
    </div>
  );
};
