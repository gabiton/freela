import { v4 as uuid } from "uuid";

export const cleanAndTransformBlocks = (blocksJSON) => {
  if (!blocksJSON) return;

  let blocks = false;

  try {
    blocks = JSON.parse(JSON.stringify(blocksJSON));
  } catch (err) {
    return false;
  }

  if (!blocks) return [];

  const assignId = (b) => {
    b.forEach((block) => {
      block.id = uuid();
      if (block.innerBlocks?.length) {
        assignId(block.innerBlocks);
      }
    });
  };

  assignId(blocks);

  return blocks;
};
