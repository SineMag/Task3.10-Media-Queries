// Tab Switching
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const target = tab.dataset.tab;
    tabContents.forEach(content => {
      content.classList.remove('active');
      if (content.id === target) {
        content.classList.add('active');
      }
    });
  });
});

// File Transfer Calculator
function calculateTransferTime() {
  const size = parseFloat(document.getElementById('fileSize').value);
  const sizeUnit = document.getElementById('fileUnit').value;
  const speed = parseFloat(document.getElementById('speed').value);
  const speedUnit = document.getElementById('speedUnit').value;

  const sizeInBits = {
    KB: size * 1024 * 8,
    MB: size * 1024 * 1024 * 8,
    GB: size * 1024 * 1024 * 1024 * 8
  }[sizeUnit];

  const speedInBps = {
    Kbps: speed * 1000,
    Mbps: speed * 1000000,
    Gbps: speed * 1000000000
  }[speedUnit];

  const timeInSeconds = sizeInBits / speedInBps;
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.round(timeInSeconds % 60);

  const timeText = minutes > 0 ? `${minutes} min ${seconds} sec` : `${seconds} sec`;
  document.getElementById('transfer-time').textContent = timeText;
}

// Temperature Converter
function convertTemperature() {
  const value = parseFloat(document.getElementById('tempInput').value);
  const from = document.getElementById('tempFrom').value;
  const to = document.getElementById('tempTo').value;

  let result;

  if (from === to) {
    result = value;
  } else if (from === 'C') {
    result = to === 'F' ? (value * 9 / 5) + 32 : value + 273.15;
  } else if (from === 'F') {
    result = to === 'C' ? (value - 32) * 5 / 9 : ((value - 32) * 5 / 9) + 273.15;
  } else if (from === 'K') {
    result = to === 'C' ? value - 273.15 : ((value - 273.15) * 9 / 5) + 32;
  }

  document.getElementById('temp-result').textContent = result.toFixed(2);
}

// Scientific Notation Converter
function convertScientific() {
  const number = parseFloat(document.getElementById('sciInput').value);

  if (isNaN(number)) {
    document.getElementById('sci-result').textContent = 'Invalid input';
    return;
  }

  document.getElementById('sci-result').textContent = number.toExponential(2);
}

// Metric Unit Converter
function convertMetric() {
  const value = parseFloat(document.getElementById('metricInput').value);
  const from = document.getElementById('metricFrom').value;
  const to = document.getElementById('metricTo').value;

  const metricConversions = {
    m: 1,
    km: 1000,
    g: 1,
    kg: 1000
  };

  const isLength = ['m', 'km'].includes(from) && ['m', 'km'].includes(to);
  const isMass = ['g', 'kg'].includes(from) && ['g', 'kg'].includes(to);

  if (!isLength && !isMass) {
    document.getElementById('metric-result').textContent = 'Incompatible units';
    return;
  }

  const result = (value * metricConversions[from]) / metricConversions[to];
  document.getElementById('metric-result').textContent = result.toFixed(4);
}
