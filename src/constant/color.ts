const COLORS = [
  'black',
  '#FF862E',
  '#299BFE',
  '#00C4DF',
  '#FF9BE6',
  '#FFF763',
  '#66EFB1',
  '#5FEAFF',
] as const

export type ColorType = (typeof COLORS)[number]

export default COLORS
