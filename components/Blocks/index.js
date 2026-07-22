const blocksContext = require.context("./", true, /^\.\/[^/]+\/index\.js$/);

export const gutenbergBlocks = blocksContext.keys().reduce((blocks, path) => {
  const blockName = path.split("/")[1];
  const blockModule = blocksContext(path);

  if (blockModule[blockName]) {
    blocks[blockName] = blockModule[blockName];
  }

  return blocks;
}, {});
