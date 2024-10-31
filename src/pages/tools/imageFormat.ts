export const getImageUrl = (imageName: string, width: number, height: number, extra?: string) => {
  const defaultUrl = 'https://static.hamu.site/mini/default-image.png';

  if (!imageName) {
    return defaultUrl;
  }

  let baseUrl = 'https://static.hamu.site/mini/';
  if (imageName.indexOf('http') === 0) {
    baseUrl = '';
  }
  let url = baseUrl + imageName + '?imageView2/1/w/' + width + '/h/' + height;
  if (extra) {
    url += '/' + extra;
  }

  url += '/format/webp/q/100';

  return url;
};
