import { TPerson } from '../models/Person';
import api from '../http-commons';

class ApiService {
  async getPersons(): Promise<TPerson[]> {
    try {
      const response = await api.get('/persons');

      return response.data;
    } catch (error) {
      throw new Error('Error while fetching persons');
    }
  }

  async getPerson(person_id: string): Promise<TPerson> {
    try {
      person_id;
      const response = await api.get(`/persons/${person_id}`);
      return response.data;
    } catch (error) {
      throw new Error('Error while fetching person');
    }
  }
}

const apiService = new ApiService();

export default apiService;
