const IconsSvg = {
  folderPoundOutline: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>folder-pound-outline</title><path d="M20,18H4V8H20M20,6H12L10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6M19,12V11H17.5L18,9H17L16.5,11H14.5L15,9H14L13.5,11H12V12H13.25L12.75,14H11V15H12.5L12,17H13L13.5,15H15.5L15,17H16L16.5,15H18V14H16.75L17.25,12H19M15.75,14H13.75L14.25,12H16.25L15.75,14Z" /></svg>
  `,
  renameOutline: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>rename-outline</title><path d="M15 16L11 20H21V16H15M12.06 7.19L3 16.25V20H6.75L15.81 10.94L12.06 7.19M5.92 18H5V17.08L12.06 10L13 10.94L5.92 18M18.71 8.04C19.1 7.65 19.1 7 18.71 6.63L16.37 4.29C16.17 4.09 15.92 4 15.66 4C15.41 4 15.15 4.1 14.96 4.29L13.13 6.12L16.88 9.87L18.71 8.04Z" /></svg>
  `,
  deleteOutline: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>delete-outline</title><path d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" /></svg>
  `,
  plusCircle: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>plus-circle</title><path d="M17,13H13V17H11V13H7V11H11V7H13V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>
  `,
};

const Icons = {};

Object.keys(IconsSvg).forEach(iconName => {
  Object.defineProperty(Icons, iconName, {
    get() {
      return renderSvg(IconsSvg[iconName]);
    },
  });
});

function renderSvg(svg) {
  const svgContainer = document.createElement("span");
  svgContainer.innerHTML = svg;
  return svgContainer;
}

export default Icons;
