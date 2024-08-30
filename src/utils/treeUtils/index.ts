export function buildTree(nodes) {
  const nodeMap = new Map();
  const rootNodes = [];
  nodes.forEach(node => {
    node.children = [];
    nodeMap.set(node.node_id, node);
  });
  nodes.forEach(node => {
    if (node.parent_id === null) {
      rootNodes.push(node);
    } else {
      const parentNode = nodeMap.get(node.parent_id);
      if (parentNode) {
        parentNode.children.push(node);
      }
    }
  });
  return rootNodes;
}