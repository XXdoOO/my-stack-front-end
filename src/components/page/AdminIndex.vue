<template>
  <div class="charts">
    <v-chart class="chart" :option="option" />
    <v-chart class="chart" :option="option2" />
  </div>
</template>

<script>
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref, defineComponent } from '@vue/composition-api';

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

export default defineComponent({
  name: 'HelloWorld',
  components: {
    VChart,
  },
  provide: {
    [THEME_KEY]: 'dark',
  },
  setup() {
    const option = ref({
      title: {
        text: '博客情况',
        left: 'center',
        padding: 60,
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['已发布', '待审核', '不通过', '已删除'],
        padding: 40,
      },
      series: [
        {
          name: '博客数量',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            { value: 222, name: '已发布' },
            { value: 87, name: '待审核' },
            { value: 21, name: '不通过' },
            { value: 232, name: '已删除' },
          ],
          label: {
            normal: {
              formatter: '{b} {c}',
              textStyle: {
                fontWeight: 'normal',
                fontSize: 15
              }
            }
          },
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    })

    const option2 = ref({
      title: {
        text: '用户情况',
        left: 'center',
        padding: 60,
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['在线', '离线（正常）', '离线（小黑屋）', '已注销'],
        padding: 40,
      },
      series: [
        {
          name: '博客数量',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            { value: 335, name: '在线' },
            { value: 310, name: '离线（正常）' },
            { value: 310, name: '离线（小黑屋）' },
            { value: 135, name: '已注销' },
          ],
          label: {
            normal: {
              formatter: '{b} {c}',
              textStyle: {
                fontWeight: 'normal',
                fontSize: 15
              }
            }
          },
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    });

    return { option, option2 };
  },
  created() {
    this.$axios.myRequest.getWatchData().then((res) => {
      console.log(res)
      console.log(this.option)
      this.option.series[0].data[0].value = res.data.blogStatus.passCount
      this.option.series[0].data[1].value = res.data.blogStatus.auditingCount
      this.option.series[0].data[2].value = res.data.blogStatus.noPassCount
      this.option.series[0].data[3].value = res.data.blogStatus.deletedCount

      this.option2.series[0].data[0].value = res.data.userStatus.onlineCount
      this.option2.series[0].data[1].value = res.data.userStatus.offlineCount
      this.option2.series[0].data[2].value = res.data.userStatus.offlineCount2
      this.option2.series[0].data[3].value = res.data.userStatus.deletedCount
    })
  }
});
</script>

<style scoped lang="less">
.charts {
  display: flex;
  width: 100%;
}

.chart {
  width: 100%;
  height: 100%;
}
</style>
