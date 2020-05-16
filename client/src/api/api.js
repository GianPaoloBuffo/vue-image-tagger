import http from './config';

export const loadTags = () => http.get('/tags');

export const loadBoundingBoxes = () => http.get('/boundingBoxes');

export const saveBoundingBox = (boundingBox) => http.put(`/boundingBoxes/${boundingBox.id}`, boundingBox);

export const deleteBoundingBox = (boundingBox) => http.delete(`/boundingBoxes/${boundingBox.id}`);

export default {};
