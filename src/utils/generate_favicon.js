import { computeEmoji } from "../data/compute_emojis";
 

// Updates the tab to display emoji as a favicon.
// If this fails, the default is the notion logo.
export const generateFavicon = hexcode => 
    `data:image/svg+xml,
    <svg xmlns=%22http://www.w3.org/2000/svg%22 
    viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>
      ${computeEmoji(hexcode)}
    </text></svg>`;

export const addFaviconToPage = (icon) => {
  const link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.href = generateFavicon(icon);
}