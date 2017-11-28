### 后台管理系统 -- 商品规格SKU

启发于这段代码

```js
<!DOCTYPE html>  
<html>  
    <head>  
        <title></title>  
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">  
        <style type="text/css">   
        * { padding: 0; margin: 0; }  
        .demo { padding: 10px; }  
        .demo table { border-collapse: collapse; }  
        .demo table tr td { border: 1px solid #ccc; padding: 4px; }  
        </style>  
    </head>  
    <body>  
        <div id="demo" class="demo">  

        </div>  
        <script type="text/javascript">   
            function combine(arr) {  
                var r = [];  
                (function f(t, a, n) {  
                    if (n == 0) return r.push(t);  
                    for (var i = 0; i < a[n-1].length; i++) {  
                        f(t.concat(a[n-1][i]), a, n - 1);  
                    }  
                })([], arr, arr.length);  
                return r;  
            }  
            var arr = [  
                ['1','2', '3'],  
                ['a','b', 'c'],  
                ['x','y']];  
            var res = combine(arr);  

             //合并单元格  
            var row = [];  
            var rowspan = res.length;  
            for(var n=arr.length-1; n>-1; n--) {  
                row[n] = parseInt(rowspan/arr[n].length);  
                rowspan = row[n];  
            }  
            row.reverse();  

            //table tr td  
            var str = "";  
            var len = res[0].length;  
            for (var i=0; i<res.length; i++) {  
                var tmp = "";  
                for(var j=0; j<len; j++) {  
                    if(i%row[j]==0 && row[j]>1) {  
                        tmp += "<td rowspan='"+ row[j] +"'>"+res[i][j]+"</td>";  
                    }else if(row[j]==1){  
                        tmp += "<td>"+res[i][j]+"</td>";  
                    }  
                }  
                str += "<tr>" + tmp + "<td>xxx</td>" + "<td>xxx</td>" + "</tr>";  
            }  

            //thead  
            var th = "";  
            for(var k=0; k<len; k++) {  
                th += "<th>"+ k +"</th>";  
            }  
            th = "<thead>"+th+"<th>价格</th>" + "<th>数量</th>" +"</thead>";  
            str = "<table>" + th + str + "</table>";  

            document.getElementById('demo').innerHTML = str;  
        </script>  
    </body>  
</html>  
```

- 效果图

![效果图](https://github.com/fightingljm/myblog/blob/master/src/image/sku.png?raw=true)

为了后台管理系统的前后台分离重构，集成了很多网站的思想

- [Due West Education 途西教育](https://duewest.teamwork.com/launchpad/login/projects)
- [有赞技术团队](https://tech.youzan.com/)
- [微盟-智能商业服务提供商](http://www.weimob.com/website/index.html)
- [Worktile-更好的企业协作平台](https://worktile.com/)
- [EC+ 到家-同城上门O2O解决方案](http://demodaojia.ecjia.com/index.php)
