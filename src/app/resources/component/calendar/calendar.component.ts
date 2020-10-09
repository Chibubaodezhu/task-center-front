import { Component, OnInit } from '@angular/core';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [DatePipe]
})
export class CalendarComponent implements OnInit {

  date = new Date(); // 时间
  dateDisplay; // 时间展示文本
  dayList = []; // 日期列表
  constructor(
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.dateDisplay = this.datePipe.transform(this.date, 'yyyy 年 M 月');
    this.generateDayList();
  }

  preMonth() {
    this.date.setMonth(this.date.getMonth() - 1);
    this.dateDisplay = this.datePipe.transform(this.date, 'yyyy 年 M 月');
    this.generateDayList();
  }
  nextMonth() {
    this.date.setMonth(this.date.getMonth() + 1);
    this.dateDisplay = this.datePipe.transform(this.date, 'yyyy 年 M 月');
    this.generateDayList();
  }
  backToToday() {
    this.date = new Date();
    this.dateDisplay = this.datePipe.transform(this.date, 'yyyy 年 M 月');
    this.generateDayList();
  }
  // 生成日历列表
  generateDayList() {
    let today = this.date.getDate();
    let todayMonth = new Date().getMonth();
    let year = this.date.getFullYear();
    let month = this.date.getMonth();
    let res = [];
    let currentMonth = this.getMonthCount(year, month);
    let preMonth = this.getPreMonthCount(year, month);
    let nextMonth = this.getNextMonthCount(year, month);
    let whereMonday = this.getWeekday(year, month);
    if (whereMonday === 0) { // month对应月份的1号是周日
      whereMonday = 7;
    }
    let preArr = [];
    if (whereMonday != 1) {
      preArr = preMonth.slice(-whereMonday + 1);
    }
    let nextArr = [];
    let count = currentMonth.length + preArr.length;
    // 如果上个月天数加这个月天数小于35，截取下个月前面几天，补齐到35， 分5行展示
    // 如果刚好35天则不做操作
    // 如果大于35，还是截取下个月前面几天，补齐到42， 分6行展示
    if (count < 35) {
      nextArr = nextMonth.slice(0, 35 - count);
    } else if (count > 35) {
      nextArr = nextMonth.slice(0, 42 - count);
    }
    // 将上月、本月、下月合并在一起，总数应为35或42
    res = [].concat(preArr, currentMonth, nextArr);
    // 将日期转化为二维数组，一行7个，对应周一到周日
    let rows = res.length / 7;
    this.dayList = [];
    for (let i = 0; i < rows; i++) {
      this.dayList.push([]);
    }
    for (let i = 0; i < res.length; i++) {
      // 将年月日写到对象中
      let m = i < preArr.length ? (month - 1) : (i < count ? month : (month + 1));
      let y = year;
      if (m == -1) {
        y -= 1;
        m = 11;
      } else if (m == 12) {
        y += 1;
        m = 0;
      }
      let currentMonth = i >= preArr.length && i < count;
      this.dayList[Math.floor(i/7)].push({
        year: y,
        month: m,
        date: res[i],
        full: y + '-' + m + '-' + res[i],
        today: todayMonth == m && res[i] == today,
        currentMonth: currentMonth
      });
    }
  }
  // 1.判断是否为闰年
  isLeapYear(year) {
    return (year % 400 === 0) || (year % 100 !== 0 && year % 4 === 0);
  };
  // 2.获得每个月的日期有多少，注意 month - [0-11]
  getMonthCount(year, month) {
    let arr = [
      31, null, 31, 30,
      31, 30, 31, 31,
      30, 31, 30, 31
    ];
    let count = arr[month] || (this.isLeapYear(year) ? 29 : 28);
    return Array.from(new Array(count), (item, value) => value + 1);
  };
  // 3.获得某年某月的 1号 是星期几，这里要注意的是 JS 的 API-getDay() 是从 [日-六](0-6)，返回 number
  getWeekday(year, month) {
    let date = new Date(year, month, 1);
    return date.getDay();
  };
  // 4.获得上个月的天数
  getPreMonthCount(year, month) {
    if (month === 0) {
      return this.getMonthCount(year - 1, 11);
    } else {
      return this.getMonthCount(year, month - 1);
    }
  };
  // 5.获得下个月的天数
  getNextMonthCount(year, month) {
    if (month === 11) {
      return this.getMonthCount(year + 1, 0);
    } else {
      return this.getMonthCount(year, month + 1);
    }
  };
}
