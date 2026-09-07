export default function useBaseUrl(url: string) { return url.startsWith('/') ? url : '/' + url; }
