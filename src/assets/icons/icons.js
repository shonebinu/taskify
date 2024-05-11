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
  allTask: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>order-bool-ascending-variant</title><path d="M4 13C2.89 13 2 13.89 2 15V19C2 20.11 2.89 21 4 21H8C9.11 21 10 20.11 10 19V15C10 13.89 9.11 13 8 13M8.2 14.5L9.26 15.55L5.27 19.5L2.74 16.95L3.81 15.9L5.28 17.39M4 3C2.89 3 2 3.89 2 5V9C2 10.11 2.89 11 4 11H8C9.11 11 10 10.11 10 9V5C10 3.89 9.11 3 8 3M4 5H8V9H4M12 5H22V7H12M12 19V17H22V19M12 11H22V13H12Z" /></svg>
  `,
  today: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>calendar-today-outline</title><path d="M19 3H18V1H16V3H8V1H6V3H5C3.9 3 3 3.89 3 5V19C3 20.11 3.9 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.89 20.11 3 19 3M19 19H5V9H19V19M19 7H5V5H19M7 11H12V16H7" /></svg>
  `,
  overdue: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>clock-alert-outline</title><path d="M11 7V13L16.2 16.1L17 14.9L12.5 12.2V7H11M20 12V18H22V12H20M20 20V22H22V20H20M18 20C16.3 21.3 14.3 22 12 22C6.5 22 2 17.5 2 12S6.5 2 12 2C16.8 2 20.9 5.4 21.8 10H19.7C18.8 6.6 15.7 4 12 4C7.6 4 4 7.6 4 12S7.6 20 12 20C14.4 20 16.5 18.9 18 17.3V20Z" /></svg>
  `,
  archive: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>archive-outline</title><path d="M20 21H4V10H6V19H18V10H20V21M3 3H21V9H3V3M9.5 11H14.5C14.78 11 15 11.22 15 11.5V13H9V11.5C9 11.22 9.22 11 9.5 11M5 5V7H19V5H5Z" /></svg>    
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
