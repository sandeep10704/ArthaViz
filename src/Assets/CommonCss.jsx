
import ColorPalette from './ColorPalette'

const CommonCss=  {
  line:`0.5px solid ${ColorPalette.line}`
}
export const cardHoverStyle = {
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  '&:hover': {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
  },
};
export const imageHoverBoxStyle = {
  '& img': {
    transition: "transform 0.3s ease",
  },
  '&:hover img': {
    transform: "scale(1.05)",
  },
};



export default CommonCss;