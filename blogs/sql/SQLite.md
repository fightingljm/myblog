### 常用函数

```sqlite
sqlite3_open      ----------------------> 打开数据库
sqlite3_close     ----------------------> 关闭数据库
sqlite3_exec      ----------------------> 执行数据库语句
sqlite3_prepare_v2
sqlite3_step      ----------------------> 循环
sqlite3_column_text
```

### 增删改查语句

```sqlite

 create table person(id integer primary key autoincrement, name text, phone text, address text)
 
 insert into person(name, phone, address) values ('%@', '%@', '%@')
 
 delete from person where name = '%@'
 
 update person set phone = '%@', address = '%@' where name = '%@'
 
 select phone, address from person where name = '%@'

```

