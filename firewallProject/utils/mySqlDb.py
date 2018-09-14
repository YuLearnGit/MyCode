import pymysql
from utils.myConfigUtil import MyConfig
import testTool


class MySqlDbUtil:
    def __new__(cls, *args, **kwargs):
        if not hasattr(cls, '_inst'):
            cls._inst = super(MySqlDbUtil, cls).__new__(cls)
        return cls._inst

    def __init__(self):
        if not hasattr(self, "_init_complete"):
            self._init_complete = True
            self.myConfig = MyConfig()
            self.host = self.myConfig.getConf("mysql_host")
            self.port = int(self.myConfig.getConf("mysql_port"))
            self.user = self.myConfig.getConf("mysql_user")
            self.password = self.myConfig.getConf("mysql_password")
            self.charset = self.myConfig.getConf("mysql_charset")
            self.conn = pymysql.connect(host=self.host, port=self.port,
                                        user=self.user, password=self.password, charset=self.charset)
            self.cursor = self.conn.cursor()
        pass

    def flush(self):
        self.conn = pymysql.connect(host=self.host, port=self.port,
                                    user=self.user, password=self.password, charset=self.charset)
        self.cursor = self.conn.cursor()

    def close(self):
        self.cursor.close()
        self.conn.close()

    @testTool.mydecorator.showParameter
    @testTool.mydecorator.showReturn
    def createDb(self, target_database_name):
        try:
            sql = " create database if not exists %s " % target_database_name
            self.cursor.execute(sql)
            self.conn.commit()
            return [True, "数据库建立成功"]
        except Exception as e:
            self.conn.rollback()
            return [False, str(e)]

    @testTool.mydecorator.showParameter
    @testTool.mydecorator.showReturn
    def isDbExisted(self, target_database_name):
        list_rst = self.listDbs()
        if list_rst[0]:
            if target_database_name in list_rst[1]:
                return True
            return False
        raise Exception(list_rst[1])
        # return False

    @testTool.mydecorator.showParameter
    @testTool.mydecorator.showReturn
    def listDbs(self):
        try:
            sql = "show databases"
            self.cursor.execute(sql)
            sql_rst = self.cursor.fetchall()
            dbs_name = [db_name[0] for db_name in sql_rst]
            return [True, dbs_name]
        except Exception as e:
            return [False, str(e)]

    def dropDb(self, drop_db_sql):
        return [False, "Error:No method to drop db!"]

    def createTable(self, create_table_sql):
        """

        :param create_table_sql: 
            "create table if not exists %s.%s(
                id int primary key auto_increment,
                _rule varchar(1000),
                _comment varchar(100))" \ 
                % ( target_database_name, target_table_name)
        :return: 
        """
        try:
            self.cursor.execute(create_table_sql)
            self.conn.commit()
            return [True, "表建立成功"]
        except Exception as e:
            self.conn.rollback()
            return [False, str(e)]
        pass

    @testTool.mydecorator.showParameter
    @testTool.mydecorator.showReturn
    def isTableExisted(self, target_database_name, target_table_name):
        list_rst = self.listTables(target_database_name)
        if list_rst[0]:
            if target_table_name in list_rst[1]:
                return True
            return False
        raise Exception(list_rst[1])
        # return False

    @testTool.mydecorator.showParameter
    @testTool.mydecorator.showReturn
    def listTables(self, target_database_name):
        try:
            sql = "show tables from %s" % target_database_name
            # sql = "show tables from _snortrules"
            self.cursor.execute(sql)
            sql_rst = self.cursor.fetchall()
            tables_name = [target_table_name[0] for target_table_name in sql_rst]
            return [True, tables_name]
        except Exception as e:
            return [False, str(e)]

    @testTool.mydecorator.showParameter
    @testTool.mydecorator.showReturn
    def dropTable(self, target_database_name, target_table_name):
        try:
            sql = "drop table %s.%s" % (target_database_name, target_table_name)
            self.cursor.execute(sql)
            self.conn.commit()
            return [True, "表已删除"]
        except Exception as e:
            self.conn.rollback()
            return [False, str(e)]

    @testTool.mydecorator.showParameter
    @testTool.mydecorator.showReturn
    def renameTable(self,target_database_name,old_target_table_name, new_tables_name):
        try:
            sql = "rename table %s.%s to %s.%s" % (
                target_database_name, old_target_table_name, target_database_name, new_tables_name)
            self.cursor.execute(sql)
            self.conn.commit()
            return [True, "表已重命名"]
        except Exception as e:
            self.conn.rollback()
            return [False, str(e)]

    @testTool.mydecorator.showReturn
    def insert(self, insert_sql):
        """

        :param insert_sql: 
            "insert into _%s._%s (_rule,_comment) values('%s','%s')" % (
                target_database_name, target_table_name, iptablesRule.rule, iptablesRule.comment)
        :return: 
        """
        try:
            self.cursor.execute(insert_sql)
            self.conn.commit()
            return [True, "插入成功"]
        except Exception as e:
            self.conn.rollback()
            return [False, str(e)]

    @testTool.mydecorator.showReturn
    def update(self, update_sql):
        """

        :param update_sql: 
            "update %s.%s " % (target_database_name, target_table_name)
                   + " SET "
                   + " DataName='%s'," % (daqVariable.dataName)
                   + " DeviceAddress='%s'," % (daqVariable.deviceAddress)
                   + " DataUnit='%s'," % (daqVariable.dataUnit)
                   + ...
                   + " where id=%d " % (int(daqVariable.id)
        :return: 
        """
        try:
            self.cursor.execute(update_sql)
            self.conn.commit()
            return [True, "更新成功"]
        except Exception as e:
            self.conn.rollback()
            return [False, str(e)]

    @testTool.mydecorator.showReturn
    def delete(self, target_database_name, target_table_name, _id):
        try:
            sql = "delete from %s.%s where id=%d" % (target_database_name, target_table_name, int(_id))
            self.cursor.execute(sql)
            self.conn.commit()
            return [True, "删除成功"]
        except Exception as e:
            self.conn.rollback()
            return [False, str(e)]

    @testTool.mydecorator.showReturn
    def select(self, target_database_name, target_table_name, _id):
        try:
            sql = "select * from %s.%s where id=%d" % (target_database_name, target_table_name, int(_id))
            self.cursor.execute(sql)
            sql_rst = self.cursor.fetchone()
            # print(sql_rst[0])
            return [True, sql_rst]
        except Exception as e:
            return [False, str(e)]

    @testTool.mydecorator.showReturn
    def selectLast(self, target_database_name, target_table_name):
        try:
            sql = "SELECT * from %s.%s where ID = (SELECT max(ID) FROM %s.%s)" % (
            target_database_name, target_table_name, target_database_name, target_table_name)
            self.cursor.execute(sql)
            rst = self.cursor.fetchone()
            return [True, rst]
        except Exception as e:
            return [False, str(e)]

    @testTool.mydecorator.showReturn
    def selectAll(self, target_database_name, target_table_name):
        try:
            sql = "select * from %s.%s" % (target_database_name, target_table_name)
            self.cursor.execute(sql)
            list_rst = self.cursor.fetchall()
            return [True, list_rst]
        except Exception as e:
            return [False, str(e)]

    @testTool.mydecorator.showParameter
    def execute(self, sql):
        self.cursor.execute(sql)
        return self.cursor

