export const loadTags = () => [{ id: 1, text: 'dog' }];

export const loadBoundingBoxes = () => [{
  id: 1,
  top: 100,
  left: 100,
  height: 50,
  width: 50,
}];

export const saveBoundingBox = (boundingBox, tag) => ({ ...boundingBox, tag });

export const deleteBoundingBox = (boundingBox) => boundingBox;

export default {};
