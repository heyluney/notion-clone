import { computeEmoji
 } from "./compute_emojis";
 
export const generateFavicon = hexcode => 
    `data:image/svg+xml,
    <svg xmlns=%22http://www.w3.org/2000/svg%22 
    viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>
      ${computeEmoji(hexcode)}
    </text></svg>`;
