//递归TreeData
export function getTreeData(source) {
  var rootParnets = source.filter(
    (x) => !x.parentId || x.parentId === 0 || x.parentId === "0"
  );
  var cycleData = cycleBuild(rootParnets, source);
  return cycleData;
}

export function cycleBuild(list, source) {
  var sortList = list.sort((x1, x2) => x1.sort - x2.sort);
  sortList.map((item, index) => {
    var children = source.filter((x) => x.parentId === item.id);
    if (children.length > 0) {
      item.children = children;
      cycleBuild(children, source);
    } else {
      return item;
    }
  });
  return sortList;
}

export function getAllData(treeData) {
  let root = treeData.filter(
    (x) => !x.parentId || x.parentId === 0 || x.parentId === "0"
  );
  let allData = [];
  cycleAll(allData, root);
  return allData;
}

export function cycleAll(allData, root) {
  if (root.children && root.children.length > 0) {
    root.children.map((item) => {
      allData.push(item);
    });
  } else {
    cycleAll(allData, root.children);
  }
  return allData;
}
