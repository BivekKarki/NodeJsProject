const codeitUrl = "https://codeit.com.np/search-course?q=React+with+Next+JS"

const urlObj = new URL(codeitUrl);

console.log(urlObj)

const params = new URLSearchParams(urlObj.search);
console.log(params);

params.set('q', ' Node with express');
console.log(params);

params.append('date', '2025-10-25');
console.log(params);