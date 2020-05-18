import http from './config';

export const loadTags = async () => {
  try {
    const response = await http.get('/tags');
    return response.data;
  } catch (err) {
    return [];
  }
};

export const loadBoundingBoxes = async () => {
  try {
    const response = await http.get('/boundingBoxes');
    return response.data;
  } catch (err) {
    return [];
  }
};

export const createBoundingBox = async (boundingBox) => {
  try {
    const response = await http.post('/boundingBoxes', boundingBox);
    return response.data;
  } catch (err) {
    return undefined;
  }
};

export const updateBoundingBox = async (boundingBox) => {
  try {
    const response = await http.put(`/boundingBoxes/${boundingBox.id}`, boundingBox);
    return response.data;
  } catch (err) {
    return undefined;
  }
};

export const deleteBoundingBox = async (boundingBox) => {
  try {
    const response = await http.delete(`/boundingBoxes/${boundingBox.id}`);
    return response.data;
  } catch (err) {
    return undefined;
  }
};

export default {};
