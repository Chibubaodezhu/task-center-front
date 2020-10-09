import {Component, OnInit} from '@angular/core';
import {PassportService} from '../../../resources/service/passport.service';
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import * as echarts from 'echarts';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
  providers: [DatePipe]
})
export class DashboardComponent implements OnInit {

  frequentlyMenu = [
    {
      id: '1',
      name: '系统管理',
      icon: 'appstore'
    },
    {
      id: '2',
      name: '用户管理',
      icon: 'user'
    },
    {
      id: '3',
      name: '角色管理',
      icon: 'user-switch'
    },
    {
      id: '4',
      name: '菜单管理',
      icon: 'bars'
    },
    {
      id: '5',
      name: '用印管理',
      icon: 'audit'
    },
    {
      id: '6',
      name: '个人中心',
      icon: 'solution'
    }
  ];
  messageList = [];
  pieChart;
  taskChart;
  date;
  calendar = [];
  constructor(
    private passportService: PassportService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.date = new Date();
    for (let i = 30; i < 45; i++) {
      const message = {
        id: i,
        title: '任务提醒' + i + '，暗卡仕达撒的哈撒大声地感觉了哈的老客户撒旦哈哈是打算看的',
        content: '会计师大赛的航空撒谎的卡萨丁哈萨克领导好奥施康定喀斯柯达施工打开沮丧的就是噶的斯卡迪该' +
          '卡是高端送给大家奥施康定噶速度快奥施康定噶开始搞对抗时看到',
        creator: '李思',
        createdAt: new Date()
      };
      this.messageList.push(message);
      const event = {
        content: '奥斯卡后大叔大叔的撒哈拉打卡啥都哈市刘德华拉丝带回来sad哈拉少打卡落实到拉上来看打好三大' + i,
        date: '2020-09-21',
        time: '14:' + i,
        status: 'todo'
      };
      this.calendar.push(event);
    }
    this.initChart();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.frequentlyMenu, event.previousIndex, event.currentIndex);
  }

  initChart() {
    this.pieChart = {
      title: {
        text: '今日任务统计',
        left: 'center',
        textStyle: {
          color: '#ccc'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        right: 10,
        data: ['未开始', '进行中', '暂停', '已完成', '停止']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          left: 10,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '30',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            {value: 335, name: '未开始'},
            {value: 310, name: '进行中'},
            {value: 234, name: '暂停'},
            {value: 135, name: '已完成'},
            {value: 1548, name: '停止'}
          ]
        }
      ]
    };
    this.taskChart = {
      title: {
        text: '本周任务统计'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['任务总量', '完成量']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '任务总量',
          type: 'bar',
          barCategoryGap: '20%',
          itemStyle: {
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                {offset: 0, color: '#FFFFF0'},
                {offset: 0.5, color: '#87CEEB'},
                {offset: 1, color: '#00BFFF'}
              ]
            )
          },
          emphasis: {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  {offset: 0, color: '#C1FFC1'},
                  {offset: 0.7, color: '#C1FFC1'},
                  {offset: 1, color: '#C1FFC1'}
                ]
              )
            }
          },
          data: [7, 8, 9, 8, 7, 2, 1]
        },
        {
          name: '完成量',
          type: 'line',
          stack: '总量',
          data: [7, 6, 9, 8, 6, 2, 1]
        }
      ]
    };
  }

  getTimeColor(item) {
    if (item.status == 'finished') {
      return '#00CD00';
    }
    let date = new Date();
    let currentDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    let currentTime = this.datePipe.transform(date, 'HH:mm');
    if (item.date < currentDate) {
      return '#FF4500';
    } else if (item.date == currentDate) {
      if (item.time <= currentTime) {
        return '#FF4500';
      } else {
        return '#6495ED';
      }
    } else {
      return '#6495ED';
    }
  }

  taskFinished(item) {
    item.status = 'finished';
  }

  recoverTask(item) {
    item.status = 'todo';
  }
}
