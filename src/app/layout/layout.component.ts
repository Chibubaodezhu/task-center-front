import { Component, OnInit } from '@angular/core';
import {fromEvent} from 'rxjs';
import {NzMessageService} from "ng-zorro-antd";
import {SystemService} from "../common/service/system.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less'],
  providers: [NzMessageService]
})
export class LayoutComponent implements OnInit {

  pageHeight = window.innerHeight;
  pageWidth = window.innerWidth;
  year;
  userId;
  socket;
  constructor(
    private message: NzMessageService,
    private systemService: SystemService
  ) { }

  ngOnInit(): void {
    const date = new Date();
    this.year = date.getFullYear();
    fromEvent(window, 'resize').subscribe(() => {
      this.pageWidth = window.innerWidth;
      this.pageHeight = window.innerHeight;
    });
    this.userId = localStorage.getItem('userId');
    if (this.userId) {
      if (typeof (WebSocket) == "undefined") {
        this.message.warning('您的浏览器不支持WebSocket，推荐使用Chrome');
      } else {
        var socketUrl = this.systemService.urlPre + "websocket/" + this.userId;
        socketUrl = socketUrl.replace("https", "ws").replace("http", "ws");
        if (this.socket != null) {
          this.socket.close();
          this.socket = null;
        }
        this.socket = new WebSocket(socketUrl);
        //打开事件
        this.socket.onopen = function () {
          console.log("websocket已打开");
          //socket.send("这是来自客户端的消息" + location.href + new Date());
        };
        //获得消息事件
        this.socket.onmessage = function (msg) {
          console.log(msg.data);
          //发现消息进入    开始处理前端触发逻辑
        };
        //关闭事件
        this.socket.onclose = function () {
          console.log("websocket已关闭");
        };
        //发生了错误事件
        this.socket.onerror = function () {
          console.log("websocket发生了错误");
        }
      }
    }
  }

}
