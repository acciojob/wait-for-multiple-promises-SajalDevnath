const getRandomDelay = () => Math.floor(Math.random() * 2000) + 1000;

const promises = Array.from({ length: 3 }, (_, i) => {
  const delay = getRandomDelay();
  return new Promise(resolve => {
    const start = Date.now();
    setTimeout(() => {
      const timeTaken = (Date.now() - start) / 1000;
      resolve({ name: `Promise ${i + 1}`, time: timeTaken });
    }, delay);
  });
});

document.getElementById('output').innerHTML = `
  <tr>
    <td colspan="2">Loading...</td>
  </tr>
`;

Promise.all(promises).then(results => {
  document.getElementById('output').innerHTML = '';

  results.forEach(result => {
    document.getElementById('output').innerHTML += `
      <tr>
        <td>${result.name}</td>
        <td>${result.time.toFixed(3)}</td>
      </tr>
    `;
  });

  const totalTime = results.reduce((sum, result) => sum + result.time, 0).toFixed(3);
  document.getElementById('output').innerHTML += `
    <tr>
      <td>Total</td>
      <td>${totalTime}</td>
    </tr>
  `;
}).catch(error => {
  console.error('An error occurred:', error);
});
