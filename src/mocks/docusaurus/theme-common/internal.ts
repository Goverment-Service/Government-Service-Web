export function splitNavbarItems(items: any[]) {
  const left = items.filter((item) => item.position === 'left' || !item.position);
  const right = items.filter((item) => item.position === 'right');
  return [left, right];
}

export function useNavbarMobileSidebar() {
  return { toggle: () => {}, shouldRender: false };
}
