
import { totalProfitArr } from "../data/data.js";

const barChart = document.getElementById('barChart');

totalProfitArr.forEach(item => {
    const bar = document.createElement('div');
    bar.className = 'bar ' + item.type;
    bar.style.height = (item.amount * 7) + 'px'; // Scale to 10
    bar.title = `${item.type.charAt(0).toUpperCase() + item.type.slice(1)}: ${item.amount}/10`;
    barChart.appendChild(bar);
});

