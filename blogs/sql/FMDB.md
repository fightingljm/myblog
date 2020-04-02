### 常用函数

- executeUpdate       // 增、删、改
- executeQuery        // 查询

### 增删改查语句

```sql

create table t_stu(id integer primary key auto increment, name text, age integer, sex text)

inser into t_stu(name, age, sex) values (? ,? ,? )

delete from t_stu where name = ?

update t_stu set age = ? ,sex = ? where name = ?

select age, sex from t_stu where name = ?

```



