import { useState, useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { IdeaList } from '../components/ideas/IdeaList';
import IdeasService from '../services/ideasService';

export const Dashboard = () => {
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    loadIdeas();
  }, []);

  const loadIdeas = async () => {
    const data = await IdeasService.listIdeas();
    setIdeas(data);
  };

  const handleDeleteIdea = async (id) => {
    if (window.confirm('Are you sure you want to delete this idea?')) {
      await IdeasService.deleteIdea(id);
      loadIdeas();
    }
  };

  return (
    <Layout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-black mb-2">Your Vault</h1>
          <p className="text-gray-600">Capture, organize, and refine your next big ideas.</p>
        </div>

        <IdeaList
          ideas={ideas}
          onDelete={handleDeleteIdea}
        />
      </div>
    </Layout>
  );
};
