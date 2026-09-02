# 文件传输时间计算器 · Transfer Time Calculator

**[在线体验 →](https://anna123123123-creator.github.io/transfer-time-calc/)**

免费开源、纯浏览器运行的文件传输时间计算器。输入文件大小和网速，正确处理"Mbps"（兆比特/秒）和"MB/s"（兆字节/秒）这两个最容易搞混的单位，估算上传或下载需要多久。纯前端计算，不联网。

![screenshot](screenshot.png)

## 试用方法

直接用浏览器打开 `index.html`，或用静态文件服务器跑起来：

```bash
python3 -m http.server 8000
```

## 单位说明

运营商宣传的"100M宽带"指的是 100 **Mbps**（兆比特/秒），而下载软件显示的进度通常是 **MB/s**（兆字节/秒）——1 字节 = 8 比特，所以 100 Mbps 理论峰值约等于 12.5 MB/s。这个工具里 Mbps/Gbps/MB/s 三个单位换算完全自洽，"除以 8"这条经验法则算出来的结果是精确一致的。

文件大小的 KB/MB/GB/TB 用的是操作系统文件管理器的 1024 进制换算方式。

## 协议

MIT。

## 相关项目

这个是做 **网盘系统**产品时顺手做的免费小工具，跟主产品关系比较松散。想要上传、预览、分享、会员一体的完整网盘系统？完整版在这：[全能源码 · 网盘系统源码](https://inzyxuashop.com/wangpan-yuanma.html)。
