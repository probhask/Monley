export const range = (start: number, end: number): number[] => {
  const arr = [];
  for (let i = start; i <= end; i++) {
    arr.push(i);
  }
  return arr;
};
export const returnPaginationRange = (
  totalPage: number,
  page: number,
  sibling: number
) => {
  const totalPageNumberArray = 5 + sibling;
  if (totalPageNumberArray >= totalPage) {
    return range(1, totalPage);
  }
  const leftSiblingIndex = Math.max(page - sibling, 1);
  const rightSiblingIndex = Math.min(page + sibling, totalPage);

  const showLeftDot = leftSiblingIndex > 2; //then left dot
  const showRightDot = rightSiblingIndex < totalPage - 2;

  if (!showLeftDot && showRightDot) {
    const leftItemCount = 2 + sibling;
    const leftRange = range(1, leftItemCount + 1);
    return [...leftRange, "...", totalPage];
  } else if (showLeftDot && !showRightDot) {
    const rightItemContent = 2 + sibling;
    const rightRange = range(totalPage - rightItemContent, totalPage);
    return [1, "...", ...rightRange];
  } else {
    const middleRange = range(leftSiblingIndex, rightSiblingIndex);
    return [1, "...", ...middleRange, "...", totalPage];
  }
};