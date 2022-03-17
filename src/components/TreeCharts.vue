<template>
  <div id="tree" style="width: 900px;height: 650px;">
  </div>
</template>
<script>
import request from "../utils/request";

export default {
  name: "TreeCharts",
  data() {
    return {
      option:{},
      tree: {},
      name:'',
      data: {},
      chart:{}
    }
  },
  methods: {
    draw() {
      const that = this;
      this.option = {
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        legend: {
          top: '2%',
          left: '20%',
          orient: 'vertical',
          data: [
            {
              name: that.name,
              icon: 'rectangle'
            },
          ],
          borderColor: '#DCDFE6'
        },
        series: [
          {
            type: 'tree',
            name: that.name,
            data: [that.data],
            top: '5%',
            left: '20%',
            bottom: '0%',
            right: '40%',
            symbolSize: 5,
            label: {
              position: 'left',
              verticalAlign: 'middle',
              align: 'right'
            },
            leaves: {
              label: {
                position: 'right',
                verticalAlign: 'middle',
                align: 'left'
              }
            },
            emphasis: {
              focus: 'descendant'
            },
            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
          },
        ]
      }
    }
  },
  mounted() {
    const that = this;
    request.get('courses/queryById/' + this.$route.params.id).then(res => {
      this.name = res.data.name;
      request.get('courses/' + this.$route.params.id).then(res => {
        this.data = res.data;
        this.draw();
        const myChart = this.$charts.init(document.getElementById('tree'));
        this.chart = myChart;
        this.chart.setOption(that.option, true);
      })
    })
  },
  watch: {
    $route: function clearSelectionRow() {
      this.chart.clear();
      request.get('courses/queryById/' + this.$route.params.id).then(res => {
        this.name = res.data.name;
        this.draw();
        this.chart.setOption(this.option, true);
      })
    },
  }
}
</script>

<style scoped>

</style>