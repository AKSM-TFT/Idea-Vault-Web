import api from './api'

const IdeasService = {
  async listIdeas() {
    const res = await api.get('/ideas');
    return res.data;
  },
 
  async getIdea(id) {
    const res = await api.get(`/ideas/${id}`);
    return res.data;
  },
 
  async updateIdea(id, updates) {
    const res = await api.patch(`/ideas/${id}`, updates);
    return res.data;
  },

  async deleteIdea(id) {
    const res = await api.delete(`/ideas/${id}`);
    return res.data;
  },
 
};
 
export default IdeasService;