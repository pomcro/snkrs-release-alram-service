<script>
import { Line } from 'vue-chartjs';
// import { min } from 'moment';

export default {
	extends: Line,
	props: { chart: { type: Object, required: true } },
	data() {
		return {
			gradient: null,
			dataLabel: [],
			dataSet: [],
			targetChart: [],
		};
	},
	watch: {
		chart(newVal, oldVal) {
			// watch it
			this.updateChart(newVal);
		},
	},
	mounted() {
		this.updateChart(this.chart);
	},
	methods: {
		updateChart(value) {
			const targetChart = value.data.slice().reverse();
			// 차트 데이터 초기화
			this.dataLabel = [];
			this.dataSet = [];
			let pushData = false;
			for (let i = 0; i < targetChart.length; i++) {
				if (value.name === 'all' && targetChart[i].price === 0 && !pushData) {
					continue;
				}
				pushData = true;
				if (i !== 0) {
					if (targetChart[i].price === 0) {
						targetChart[i].price = targetChart[i - 1].price;
					}
				}
				this.dataLabel.push(targetChart[i].date);
				this.dataSet.push(targetChart[i].price);
			}
			this.gradient = this.$refs.canvas
				.getContext('2d')
				.createLinearGradient(0, 0, 0, 120);

			this.gradient.addColorStop(0, 'rgba(255, 0,0, 0.4)');
			this.gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.2)');
			this.gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');

			this.renderChart(
				{
					labels: this.dataLabel,
					datasets: [
						{
							label: '',
							borderColor: '#FC2525',
							borderWidth: 1,
							backgroundColor: this.gradient,
							data: this.dataSet,
							lineTension: 0,
							radius: 0,
						},
					],
				},
				{
					legend: {
						display: false,
					},
					scales: {
						yAxes: [
							{
								stacked: true,
								position: 'right',
								gridLines: {
									drawBorder: false,
								},
								ticks: {
									maxTicksLimit: 7,
								},
							},
						],
						xAxes: [
							{
								gridLines: {
									drawBorder: false,
									display: false,
								},
								ticks: {
									display: false, // this will remove only the label
								},
							},
						],
					},
					responsive: true,
					maintainAspectRatio: false,
				},
			);
		},
	},
};
</script>
