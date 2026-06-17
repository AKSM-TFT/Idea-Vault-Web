import { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Textarea } from '../ui/Input';

/**
 * Edit-only form — used on the detail page.
 * Editable fields: content, brief_summary (title is immutable via the API).
 */
export const IdeaForm = ({ idea, onSubmit, onCancel }) => {
  const [content, setContent] = useState('');
  const [briefSummary, setBriefSummary] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (idea) {
      setContent(idea.content || '');
      setBriefSummary(idea.brief_summary || '');
    }
  }, [idea]);

  const validate = () => {
    const newErrors = {};
    if (!content.trim()) newErrors.content = 'Content is required';
    if (!briefSummary.trim()) newErrors.briefSummary = 'Summary is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ content, brief_summary: briefSummary });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Textarea
        label="Summary"
        value={briefSummary}
        onChange={(e) => setBriefSummary(e.target.value)}
        placeholder="A short summary of the idea..."
        error={errors.briefSummary}
        className="min-h-[72px]"
        autoFocus
      />

      <Textarea
        label="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Full content of the idea..."
        error={errors.content}
        className="min-h-[160px]"
      />

      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          Save Changes
        </Button>
      </div>
    </form>
  );
};
