<script>
import { Bar } from 'vue-chartjs';
import 'chartjs-plugin-labels';
// import { min } from 'moment';

export default {
	extends: Bar,
	props: { chartData: { type: Object, required: true } },
	data() {
		return {
			dataLabels: [],
			dataItems: [],
		};
	},
	mounted() {
		this.updateChart(this.chartData);
	},
	methods: {
		updateChart(data) {
			const maxPrice = data.max_price;
			const minPrice = data.min_price;
			const unit = data.unit;
			const Price = maxPrice - minPrice;
			const startRange = data.chart.data[0].start_range;
			const endRange = data.chart.data[0].end_range;
			const rangeUnit = endRange - startRange;
			const index = Price / rangeUnit;
			this.dataLabels = [];
			this.dataItems = [];
			for (let i = 0; i < index; i++) {
				const s = minPrice + i * rangeUnit;
				const e = minPrice + i * rangeUnit + rangeUnit;
				const label =
					(s / unit) * (unit / 1000) +
					'k' +
					'-' +
					(e / unit) * (unit / 1000) +
					'k';
				const compare = data.chart.data.findIndex(
					el => parseInt(el.start_range) === s,
				);
				let count = 0;
				if (compare !== -1) {
					count = data.chart.data[compare].count;
				}
				this.dataLabels.push(label);
				this.dataItems.push(count);
			}
			this.renderChart(
				{
					labels: this.dataLabels,
					datasets: [
						{
							label: 'ratio',
							backgroundColor: 'rgba(34, 34, 34, 0.5)',
							data: this.dataItems,
						},
					],
				},
				{
					responsive: true,
					maintainAspectRatio: false,
					plugins: {
						labels: {
							render(args) {
								return args.value + '%';
							},
						},
					},
					legend: {
						display: false,
					},
					scales: {
						xAxes: [
							{
								barThickness: 20,
								maxBarThickness: 20,
								gridLines: {
									drawBorder: false,
									display: false,
								},
								ticks: {
									scaleShowLabels: false,
								},
							},
						],
						yAxes: [
							{
								display: false,
								stacked: true,
								gridLines: {
									drawBorder: false,
									display: false,
								},
								ticks: {
									scaleShowLabels: true,
								},
							},
						],
					},
				},
			);
		},
	},
};
</script>
