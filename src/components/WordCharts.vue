<template>
  <div ref="chart" style="width: 800px;height: 700px">
  </div>
</template>
<script>
import request from "../utils/request";

export default {
  name: "WordCharts",
  // props: ['id'],
  data() {
    return {
      url: '',
      name:'',
      names: [],
      data: [],
      max: 0,
      option: {},
      chart: {}
    }
  },
  methods: {
    getData() {
      if (this.limit === undefined) {
        this.limit = 15;
      }
      this.url = 'words/' + this.$route.params.id + '/' + this.limit;
      this.names = [];
      this.data = [];
      request.get(this.url).then(res => {
        const words = res.data;
        for (const word of words) {
          this.names.push(word.name);
          this.data.push(parseInt(word.frequency));
          this.max = Math.max(word.frequency, this.max);
        }
        this.draw();
      })
    },
    draw() {
      const that = this;
      this.option = {
        xAxis: {
          max: that.max
        },
        yAxis: {
          type: 'category',
          data: that.names,
          inverse: true,
        },
        series: [
          {
            realtimeSort: true,
            name: that.name,
            type: 'bar',
            data: that.data,
            label: {
              show: true,
              position: 'right',
              valueAnimation: true
            }
          }
        ],
        legend: {
          show: true
        },
      };
    }
  },
  mounted() {
    request.get('masters/' + this.$route.params.id).then(res => {
      this.name = res.data.name + '岗位技术词频';
      this.getData();
      setTimeout(() => {
        this.chart = this.$charts.init(this.$refs.chart);
        this.chart.setOption(this.option, true);
      }, 300)
    })

  },
  watch: {
    $route: function clearSelectionRow() {
      this.chart.clear();
      request.get('masters/' + this.$route.params.id).then(res => {
        this.name = res.data.name + '岗位技术词频';
        this.getData();
        setTimeout(() => {
          this.chart.setOption(this.option, true);
        }, 300)
      })
    },
  }
}
</script>
