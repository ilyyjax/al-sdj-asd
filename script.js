// Landing page -> Main app with fade transition
const enterBtn = document.getElementById('enterBtn');
const landing = document.getElementById('landing');
const app = document.getElementById('app');
const chatBox = document.getElementById('chatBox');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');

enterBtn.addEventListener('click', () => {
  landing.classList.add('fade-out');
  setTimeout(() => {
    landing.classList.add('hidden');
    app.classList.remove('hidden');
    myChart.resize();
  }, 1000);
});

// Chart setup for WiggaLiquid (WL)
const chartDom = document.getElementById('chart');
const myChart = echarts.init(chartDom);

let data = [];
let value = 0.05;
let pointCount = 100;

for (let i = 0; i < pointCount; i++) {
  value += (Math.random() * 0.004) - 0.001;
  if (value < 0.01) value = 0.01;
  data.push(value.toFixed(4));
}

let option = {
  title: {
    text: 'WL / WiggaLiquid',
    left: 'center',
    textStyle: { color: '#ff9900' }
  },
  backgroundColor: '#1e1e1e',
  animationDuration: 800,
  animationEasing: 'cubicOut',
  grid: { left: 40, right: 20, bottom: 40, top: 60 },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: Array.from({ length: data.length }, (_, i) => i),
    axisLine: { lineStyle: { color: '#888' } }
  },
  yAxis: {
    type: 'value',
    min: () => Math.min(...data) - 0.002,
    max: () => Math.max(...data) + 0.002,
    axisLine: { lineStyle: { color: '#888' } }
  },
  series: [{
    data,
    type: 'line',
    smooth: true,
    lineStyle: { color: '#ff9900', width: 2 },
    areaStyle: { color: 'rgba(255,153,0,0.3)' },
    showSymbol: false
  }]
};
myChart.setOption(option);

setInterval(() => {
  let last = parseFloat(data[data.length - 1]);
  let next = last + (Math.random() * 0.004) - 0.001;
  if (next < 0.01) next = 0.01;

  data.push(next.toFixed(4));
  data.shift();

  myChart.setOption({
    xAxis: { data: Array.from({ length: data.length }, (_, i) => i) },
    yAxis: {
      min: Math.min(...data) - 0.002,
      max: Math.max(...data) + 0.002
    },
    series: [{ data }]
  });
}, 500);

window.addEventListener('resize', () => myChart.resize());

// Chat Enter key support
chatInput.addEventListener('keydown', function(e) {
  if (e.key === "Enter") sendBtn.click();
});

// Chat send button
sendBtn.addEventListener('click', () => {
  const msg = chatInput.value.trim();
  if (msg) {
    const p = document.createElement('p');
    p.textContent = msg;
    chatBox.appendChild(p);
    chatInput.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;
  }
});
