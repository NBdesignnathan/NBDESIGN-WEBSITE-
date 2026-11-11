// Sign catalogue: ready-made designs customers can order as their artwork.
// To add a design, copy a line and give it a new code. type sets the colours (see SIGN_TYPES);
// head overrides the header word; lines are the body text (capitals print best).
export const SIGN_TYPES = {
  danger: { bg: '#FFFFFF', band: '#000000', oval: '#D52B1E', head: 'DANGER', headCol: '#FFFFFF', text: '#000000', frame: '#000000' },
  warning: { bg: '#FFD200', band: '#000000', head: 'WARNING', headCol: '#FFD200', text: '#000000', frame: '#000000' },
  caution: { bg: '#FFD200', band: '#FFD200', head: 'CAUTION', headCol: '#000000', text: '#000000', frame: '#000000', rule: true },
  mandatory: { bg: '#FFFFFF', band: '#005BAC', head: 'MANDATORY', headCol: '#FFFFFF', text: '#000000', frame: '#005BAC' },
  notice: { bg: '#FFFFFF', band: '#005BAC', head: 'NOTICE', headCol: '#FFFFFF', text: '#000000', frame: '#005BAC' },
  prohibition: { bg: '#FFFFFF', band: '#D52B1E', head: '', headCol: '#FFFFFF', text: '#000000', frame: '#D52B1E' },
  emergency: { bg: '#FFFFFF', band: '#007A3D', head: 'EMERGENCY', headCol: '#FFFFFF', text: '#000000', frame: '#007A3D' },
  property: { bg: '#FFFFFF', band: '#C8102E', head: '', headCol: '#FFFFFF', text: '#151515', frame: '#C8102E' },
  info: { bg: '#FFFFFF', band: '#151515', head: '', headCol: '#FFFFFF', text: '#151515', frame: '#151515' }
};
export const SIGN_CATS = [['construction', 'Construction & safety'], ['property', 'Property'], ['business', 'Business'], ['events', 'Events']];
export const CATALOGUE = [
  { code: 'C01', cat: 'construction', type: 'danger', title: 'Construction site, keep out', lines: ['CONSTRUCTION SITE', 'KEEP OUT'] },
  { code: 'C02', cat: 'construction', type: 'danger', title: 'Authorised personnel only', lines: ['AUTHORISED', 'PERSONNEL ONLY'] },
  { code: 'C03', cat: 'construction', type: 'danger', title: 'Deep excavation, keep clear', lines: ['DEEP EXCAVATION', 'KEEP CLEAR'] },
  { code: 'C04', cat: 'construction', type: 'warning', title: 'Trucks entering and exiting', lines: ['TRUCKS ENTERING', 'AND EXITING'] },
  { code: 'C05', cat: 'construction', type: 'caution', title: 'Site speed limit 10 km/h', lines: ['SITE SPEED LIMIT', '10 KM/H'] },
  { code: 'C06', cat: 'construction', type: 'mandatory', title: 'PPE must be worn on site', lines: ['HARD HATS, HI-VIS AND', 'SAFETY BOOTS MUST BE', 'WORN ON THIS SITE'] },
  { code: 'C07', cat: 'construction', type: 'notice', title: 'Visitors report to site office', lines: ['ALL VISITORS MUST REPORT', 'TO THE SITE OFFICE'] },
  { code: 'C08', cat: 'construction', type: 'notice', title: 'Deliveries this way', lines: ['DELIVERIES', 'THIS WAY →'] },
  { code: 'C09', cat: 'construction', type: 'prohibition', head: 'NO SMOKING', title: 'No smoking on this site', lines: ['ON THIS SITE'] },
  { code: 'C10', cat: 'construction', type: 'emergency', title: 'Emergency assembly area', lines: ['ASSEMBLY AREA'] },
  { code: 'C11', cat: 'construction', type: 'emergency', head: 'FIRST AID', title: 'First aid kit in site office', lines: ['FIRST AID KIT', 'IN SITE OFFICE'] },
  { code: 'P01', cat: 'property', type: 'property', head: 'FOR SALE', title: 'For sale', lines: ['YOUR DETAILS HERE'] },
  { code: 'P02', cat: 'property', type: 'property', head: 'FOR LEASE', title: 'For lease', lines: ['YOUR DETAILS HERE'] },
  { code: 'P03', cat: 'property', type: 'property', head: 'OPEN HOME', title: 'Open home this way', lines: ['THIS WAY →'] },
  { code: 'P04', cat: 'property', type: 'property', head: 'SOLD', title: 'Sold', lines: ['YOUR DETAILS HERE'] },
  { code: 'B01', cat: 'business', type: 'warning', title: 'CCTV in operation', lines: ['CCTV IN OPERATION', '24 HOURS'] },
  { code: 'B02', cat: 'business', type: 'warning', title: 'Private property, no trespassing', lines: ['PRIVATE PROPERTY', 'NO TRESPASSING'] },
  { code: 'B03', cat: 'business', type: 'prohibition', head: 'NO PARKING', title: 'No parking, driveway in use', lines: ['DRIVEWAY IN USE'] },
  { code: 'B04', cat: 'business', type: 'info', head: 'CUSTOMER PARKING', title: 'Customer parking only', lines: ['CUSTOMERS ONLY', 'WHILE IN STORE'] },
  { code: 'B05', cat: 'business', type: 'warning', title: 'Beware of the dog', lines: ['BEWARE', 'OF THE DOG'] },
  { code: 'B06', cat: 'business', type: 'info', head: 'ENTRANCE', title: 'Please use other door', lines: ['PLEASE USE', 'OTHER DOOR →'] },
  { code: 'E01', cat: 'events', type: 'info', head: 'EVENT PARKING', title: 'Event parking this way', lines: ['THIS WAY →'] },
  { code: 'E02', cat: 'events', type: 'info', head: 'TOILETS', title: 'Toilets this way', lines: ['THIS WAY →'] },
  { code: 'E03', cat: 'events', type: 'info', head: 'REGISTRATION', title: 'Registration this way', lines: ['THIS WAY →'] }
];
