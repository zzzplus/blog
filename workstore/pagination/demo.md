### [demo1](http://jsbin.com/debece/2/edit?html,css,output)
```html
<div class="page-nav dib">
    <span class="page-total">共183个</span>
    <span class="page-time">页次1/10</span>
    <a class="page-first z-disabled" href="#">&lt;&lt;</a>
    <a class="page-prev z-disabled" href="#">&lt;</a>
    <a class="page-num z-active" href="#">1</a>
    <a class="page-num" href="#">2</a>
    <a class="page-num" href="#">3</a>
    <a class="page-num" href="#">4</a>
    <a class="page-num" href="#">5</a>
    <a class="page-next" href="#">&gt;</a>
    <a class="page-last" href="#">&gt;&gt;</a>
</div>
```
```css
.page-nav { margin-bottom: 30px; font-family: \5b8b\4f53; }
.page-total,
.page-time,
.page-first,
.page-prev,
.page-num,
.page-next,
.page-last { padding: 0 5px; height: 18px; border: 1px solid #ddd; background: #eee; color: #666; font-size: 13px; line-height: 16px; }
.page-total,
.page-time { margin-right: 12px; }
.page-first,
.page-prev,
.page-num,
.page-next,
.page-last { margin-right: 12px; color: #036cb4; }
.page-first:hover,
.page-prev:hover,
.page-num:hover,
.page-next:hover,
.page-last:hover,
.page-nav .z-active { border-color: #036cb4; background: #036cb4; color: #fff; text-decoration: none; }
.page-nav .z-disabled { color: #ddd; cursor: not-allowed; }
.page-nav .z-disabled:hover { border-color: #ddd; background: #eee; }
```
