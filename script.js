(function () {
  'use strict';

  var SIZE_MULTIPLIERS = { KB: 1024, MB: 1024 * 1024, GB: 1024 * 1024 * 1024, TB: 1024 * 1024 * 1024 * 1024 };

  var sizeInput = document.getElementById('sizeInput');
  var sizeUnitSelect = document.getElementById('sizeUnitSelect');
  var speedInput = document.getElementById('speedInput');
  var speedUnitSelect = document.getElementById('speedUnitSelect');

  var timeOut = document.getElementById('timeOut');
  var sizeBytesOut = document.getElementById('sizeBytesOut');
  var speedBytesOut = document.getElementById('speedBytesOut');

  function num(input) {
    var v = parseFloat(input.value);
    return isNaN(v) ? 0 : v;
  }

  function speedToBytesPerSec(value, unit) {
    // Network speeds (Mbps/Gbps/MB-s-as-displayed-by-transfer-tools) are kept on the same
    // decimal (SI) base so "100 Mbps" and "12.5 MB/s" are exactly equivalent, matching the
    // divide-by-8 rule of thumb shown in the UI tip. File size above stays binary (1024-based)
    // since that's how OS file managers display KB/MB/GB.
    if (unit === 'mbps') return (value * 1000000) / 8;
    if (unit === 'gbps') return (value * 1000000000) / 8;
    return value * 1000 * 1000; // MBps (decimal, consistent with Mbps/8)
  }

  function formatBytes(bytes) {
    if (bytes >= 1024 * 1024 * 1024) return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
    if (bytes >= 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    if (bytes >= 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return bytes.toFixed(0) + ' B';
  }

  function formatTime(seconds) {
    if (!isFinite(seconds) || seconds <= 0) return '--';
    if (seconds < 60) return seconds.toFixed(1) + ' 秒';
    if (seconds < 3600) return (seconds / 60).toFixed(1) + ' 分钟';
    if (seconds < 86400) return (seconds / 3600).toFixed(2) + ' 小时';
    return (seconds / 86400).toFixed(2) + ' 天';
  }

  function calc() {
    var sizeBytes = num(sizeInput) * SIZE_MULTIPLIERS[sizeUnitSelect.value];
    var speedBytesPerSec = speedToBytesPerSec(num(speedInput), speedUnitSelect.value);

    if (speedBytesPerSec <= 0) {
      timeOut.textContent = '--';
      sizeBytesOut.textContent = formatBytes(sizeBytes);
      speedBytesOut.textContent = '--';
      return;
    }

    var seconds = sizeBytes / speedBytesPerSec;
    timeOut.textContent = formatTime(seconds);
    sizeBytesOut.textContent = formatBytes(sizeBytes);
    speedBytesOut.textContent = formatBytes(speedBytesPerSec) + '/s';
  }

  [sizeInput, sizeUnitSelect, speedInput, speedUnitSelect].forEach(function (el) {
    el.addEventListener('input', calc);
    el.addEventListener('change', calc);
  });

  calc();
})();
