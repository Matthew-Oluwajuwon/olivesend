const pinSvg = ({ color }: { color: string }) => {
    const svgData = `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.5002 14.1668C12.5002 14.3878 12.4124 14.5998 12.2561 14.7561C12.0998 14.9124 11.8878 15.0001 11.6668 15.0001H8.33348C8.11247 15.0001 7.90051 14.9124 7.74423 14.7561C7.58795 14.5998 7.50015 14.3878 7.50015 14.1668C7.50015 13.9458 7.58795 13.7338 7.74423 13.5776C7.90051 13.4213 8.11247 13.3335 8.33348 13.3335H11.6668C11.8878 13.3335 12.0998 13.4213 12.2561 13.5776C12.4124 13.7338 12.5002 13.9458 12.5002 14.1668ZM12.256 6.07765C12.0997 5.92142 11.8878 5.83366 11.6668 5.83366C11.4458 5.83366 11.2339 5.92142 11.0777 6.07765L10.0001 7.15515L8.92265 6.07765C8.84578 5.99806 8.75382 5.93457 8.65215 5.8909C8.55048 5.84722 8.44113 5.82424 8.33048 5.82327C8.21983 5.82231 8.1101 5.8434 8.00769 5.8853C7.90527 5.9272 7.81223 5.98908 7.73399 6.06732C7.65574 6.14556 7.59387 6.23861 7.55197 6.34102C7.51006 6.44343 7.48898 6.55317 7.48994 6.66382C7.4909 6.77447 7.51389 6.88382 7.55756 6.98549C7.60124 7.08716 7.66472 7.17911 7.74432 7.25598L8.82182 8.33348L7.74432 9.41098C7.66472 9.48786 7.60124 9.57981 7.55756 9.68148C7.51389 9.78315 7.4909 9.8925 7.48994 10.0031C7.48898 10.1138 7.51006 10.2235 7.55197 10.3259C7.59387 10.4284 7.65574 10.5214 7.73399 10.5996C7.81223 10.6779 7.90527 10.7398 8.00769 10.7817C8.1101 10.8236 8.21983 10.8447 8.33048 10.8437C8.44113 10.8427 8.55048 10.8197 8.65215 10.7761C8.75382 10.7324 8.84578 10.6689 8.92265 10.5893L10.0001 9.51182L11.0777 10.5893C11.2348 10.7411 11.4453 10.8251 11.6638 10.8232C11.8823 10.8213 12.0913 10.7337 12.2458 10.5792C12.4003 10.4247 12.488 10.2156 12.4899 9.99715C12.4918 9.77865 12.4078 9.56815 12.256 9.41098L11.1785 8.33348L12.256 7.25598C12.4122 7.09971 12.5 6.88779 12.5 6.66682C12.5 6.44585 12.4122 6.23392 12.256 6.07765ZM18.3335 13.3335H15.0002C14.7791 13.3335 14.5672 13.4213 14.4109 13.5776C14.2546 13.7338 14.1668 13.9458 14.1668 14.1668C14.1668 14.3878 14.2546 14.5998 14.4109 14.7561C14.5672 14.9124 14.7791 15.0001 15.0002 15.0001H18.3335C18.5545 15.0001 18.7665 14.9124 18.9227 14.7561C19.079 14.5998 19.1668 14.3878 19.1668 14.1668C19.1668 13.9458 19.079 13.7338 18.9227 13.5776C18.7665 13.4213 18.5545 13.3335 18.3335 13.3335ZM17.8452 8.33348L18.9227 7.25598C19.0022 7.17911 19.0657 7.08716 19.1094 6.98549C19.1531 6.88382 19.1761 6.77447 19.177 6.66382C19.178 6.55317 19.1569 6.44343 19.115 6.34102C19.0731 6.23861 19.0112 6.14556 18.933 6.06732C18.8547 5.98908 18.7617 5.9272 18.6593 5.8853C18.5569 5.8434 18.4471 5.82231 18.3365 5.82327C18.2258 5.82424 18.1165 5.84722 18.0148 5.8909C17.9131 5.93457 17.8212 5.99806 17.7443 6.07765L16.6668 7.15515L15.5893 6.07765C15.5124 5.99806 15.4205 5.93457 15.3188 5.8909C15.2172 5.84722 15.1078 5.82424 14.9972 5.82327C14.8865 5.82231 14.7768 5.8434 14.6744 5.8853C14.5719 5.9272 14.4789 5.98908 14.4007 6.06732C14.3224 6.14556 14.2605 6.23861 14.2186 6.34102C14.1767 6.44343 14.1556 6.55317 14.1566 6.66382C14.1576 6.77447 14.1806 6.88382 14.2242 6.98549C14.2679 7.08716 14.3314 7.17911 14.411 7.25598L15.4885 8.33348L14.411 9.41098C14.3314 9.48786 14.2679 9.57981 14.2242 9.68148C14.1806 9.78315 14.1576 9.8925 14.1566 10.0031C14.1556 10.1138 14.1767 10.2235 14.2186 10.3259C14.2605 10.4284 14.3224 10.5214 14.4007 10.5996C14.4789 10.6779 14.5719 10.7398 14.6744 10.7817C14.7768 10.8236 14.8865 10.8447 14.9972 10.8437C15.1078 10.8427 15.2172 10.8197 15.3188 10.7761C15.4205 10.7324 15.5124 10.6689 15.5893 10.5893L16.6668 9.51182L17.7443 10.5893C17.9015 10.7411 18.112 10.8251 18.3305 10.8232C18.549 10.8213 18.758 10.7337 18.9125 10.5792C19.067 10.4247 19.1546 10.2156 19.1565 9.99715C19.1584 9.77865 19.0745 9.56815 18.9227 9.41098L17.8452 8.33348ZM5.00015 13.3335H1.66682C1.4458 13.3335 1.23384 13.4213 1.07756 13.5776C0.92128 13.7338 0.833482 13.9458 0.833482 14.1668C0.833482 14.3878 0.92128 14.5998 1.07756 14.7561C1.23384 14.9124 1.4458 15.0001 1.66682 15.0001H5.00015C5.22116 15.0001 5.43312 14.9124 5.58941 14.7561C5.74569 14.5998 5.83348 14.3878 5.83348 14.1668C5.83348 13.9458 5.74569 13.7338 5.58941 13.5776C5.43312 13.4213 5.22116 13.3335 5.00015 13.3335ZM5.58932 6.07765C5.43304 5.92142 5.22112 5.83366 5.00015 5.83366C4.77918 5.83366 4.56726 5.92142 4.41098 6.07765L3.33348 7.15515L2.25598 6.07765C2.17911 5.99806 2.08716 5.93457 1.98549 5.8909C1.88382 5.84722 1.77447 5.82424 1.66382 5.82327C1.55317 5.82231 1.44343 5.8434 1.34102 5.8853C1.23861 5.9272 1.14556 5.98908 1.06732 6.06732C0.989076 6.14556 0.927198 6.23861 0.885298 6.34102C0.843397 6.44343 0.822312 6.55317 0.823274 6.66382C0.824235 6.77447 0.847224 6.88382 0.890898 6.98549C0.934572 7.08716 0.998057 7.17911 1.07765 7.25598L2.15515 8.33348L1.07765 9.41098C0.998057 9.48786 0.934572 9.57981 0.890898 9.68148C0.847224 9.78315 0.824235 9.8925 0.823274 10.0031C0.822312 10.1138 0.843397 10.2235 0.885298 10.3259C0.927198 10.4284 0.989076 10.5214 1.06732 10.5996C1.14556 10.6779 1.23861 10.7398 1.34102 10.7817C1.44343 10.8236 1.55317 10.8447 1.66382 10.8437C1.77447 10.8427 1.88382 10.8197 1.98549 10.7761C2.08716 10.7324 2.17911 10.6689 2.25598 10.5893L3.33348 9.51182L4.41098 10.5893C4.48786 10.6689 4.57981 10.7324 4.68148 10.7761C4.78315 10.8197 4.8925 10.8427 5.00315 10.8437C5.1138 10.8447 5.22353 10.8236 5.32594 10.7817C5.42836 10.7398 5.5214 10.6779 5.59965 10.5996C5.67789 10.5214 5.73977 10.4284 5.78167 10.3259C5.82357 10.2235 5.84465 10.1138 5.84369 10.0031C5.84273 9.8925 5.81974 9.78315 5.77607 9.68148C5.73239 9.57981 5.66891 9.48786 5.58932 9.41098L4.51182 8.33348L5.58932 7.25598C5.74554 7.09971 5.8333 6.88779 5.8333 6.66682C5.8333 6.44585 5.74554 6.23392 5.58932 6.07765Z" fill=${color}/>
    </svg>`;
  
    return svgData;
  };
  
  export default pinSvg;
  