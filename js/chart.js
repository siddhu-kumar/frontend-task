
import { revenue, expense } from "../data/data.js";

let yearExpenseData = expense
    .filter(ele => ele.year === 2025)
    .map(ele => ele.expense);

let yearRevenueData = revenue
    .filter(ele => ele.year === 2025)
    .map(ele => ele.revenue);

console.log(yearExpenseData,yearRevenueData);

const yearSelected = document.getElementById('year-data');

const ctx = document.getElementById('myLineChart').getContext('2d');
const myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: '', 
                data: yearExpenseData, 
                fill: true,
                backgroundColor: 'transparent',
                borderColor: '#CB3CFF',
                tension: 0.4,
                pointBackgroundColor: '#CB3CFF',
                pointBorderColor: '#CB3CFF',
            },
            {
                label: '',
                data: yearRevenueData,
                fill: true,
                backgroundColor: 'transparent',
                borderColor: '#00C2FF',
                tension: 0.4,
                pointBackgroundColor: '#00C2FF',
                pointBorderColor: '#00C2FF',
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            x: {
                grid: {
                    display: false 
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    display: false 
                }
            }
        },
        plugins: {
            legend: {
                display: false 
            }
        }
    }
});

yearSelected.addEventListener('change', (event) => {
    console.log('call')
    const selectedValue = Number(event.target.value);
    let e = expense.filter((ele) => ele.year === selectedValue).map(ele => ele.expense);
    let r = revenue.filter((ele) => ele.year === selectedValue).map(ele => ele.revenue);
    console.log(r, selectedValue);

    myLineChart.data.datasets[0].data = e;
    myLineChart.data.datasets[1].data = r; 
    myLineChart.update(); 
});
