export function getAssetPath(path: string): string {
  // Remove /src/ prefix if it exists
  const cleanPath = path.replace(/^\/src\//, '');
  // Use import.meta.env.BASE_URL to get the correct base path for GitHub Pages
  return `${import.meta.env.BASE_URL}${cleanPath}`;
}

export default getAssetPath;
