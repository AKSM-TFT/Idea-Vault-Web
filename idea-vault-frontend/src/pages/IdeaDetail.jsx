import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { IdeaForm } from '../components/ideas/IdeaForm';
import IdeasService from '../services/ideasService';

export const IdeaDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const loadIdea = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await IdeasService.getIdea(id);
      setIdea(data);
    } catch (err) {
      setError(err?.response?.data?.detail || 'Failed to load idea.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadIdea();
  }, [loadIdea]);

  const handleSaveEdit = async (updates) => {
    try {
      const updated = await IdeasService.updateIdea(id, updates);
      setIdea(updated);
      setIsEditOpen(false);
    } catch (err) {
      console.error('Failed to update idea:', err);
    }
  };

  const handleDownload = () => {
    const formattedDate = new Date(idea.created_at).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    const fileContent = [
      `# ${idea.title}`,
      ``,
      `**Date:** ${formattedDate}`,
      ``,
      `## Summary`,
      ``,
      idea.brief_summary,
      ``,
      `## Content`,
      ``,
      idea.content,
    ].join('\n');

    const blob = new Blob([fileContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${idea.slug || idea.title.toLowerCase().replace(/\s+/g, '-')}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto flex flex-col gap-8 animate-pulse">
          <div className="h-8 bg-gray-100 w-1/3 rounded" />
          <div className="h-4 bg-gray-100 w-2/3 rounded" />
          <div className="space-y-3">
            <div className="h-4 bg-gray-100 rounded" />
            <div className="h-4 bg-gray-100 rounded" />
            <div className="h-4 bg-gray-100 w-4/5 rounded" />
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !idea) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-red-600 font-medium mb-4">{error || 'Idea not found.'}</p>
          <Button variant="secondary" onClick={() => navigate('/')}>
            ← Back to Vault
          </Button>
        </div>
      </Layout>
    );
  }

  const formattedDate = new Date(idea.created_at).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const formattedUpdated = new Date(idea.updated_at).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        {/* Back + Actions bar */}
        <div className="flex items-center justify-between mb-10">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors focus:outline-none focus:underline"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Vault
          </button>

          <div className="flex items-center gap-3">
            <Button variant="secondary" onClick={() => setIsEditOpen(true)}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </Button>
            <Button variant="secondary" onClick={handleDownload}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download .md
            </Button>
          </div>
        </div>

        {/* Header */}
        <div className="border-b border-black pb-6 mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-black mb-4 leading-tight">
            {idea.title}
          </h1>
          <div className="flex items-center gap-4 text-xs text-gray-400 font-mono">
            <span>Created {formattedDate}</span>
            {idea.updated_at !== idea.created_at && (
              <span>· Updated {formattedUpdated}</span>
            )}
          </div>
        </div>

        {/* Summary */}
        {idea.brief_summary && (
          <div className="bg-gray-50 border border-gray-200 p-5 mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">Summary</p>
            <p className="text-gray-700 leading-relaxed">{idea.brief_summary}</p>
          </div>
        )}

        {/* Full content */}
        <div>
          <p className="text-gray-800 leading-relaxed whitespace-pre-wrap text-base">
            {idea.content}
          </p>
        </div>
      </div>

      {/* Edit modal */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit Idea"
      >
        <IdeaForm
          idea={idea}
          onSubmit={handleSaveEdit}
          onCancel={() => setIsEditOpen(false)}
        />
      </Modal>
    </Layout>
  );
};
