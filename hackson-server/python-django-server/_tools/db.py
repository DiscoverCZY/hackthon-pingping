import pymysql
from datetime import datetime
from pymysql import OperationalError
from dbutils.pooled_db import PooledDB


class MySQLClient:
    def __init__(self, host, port, user, password, database, charset='utf8mb4', max_connections=5):
        self.cursor = None
        try:
            self.pool = PooledDB(
                creator=pymysql,
                host=host,
                port=port,
                user=user,
                password=password,
                database=database,
                charset=charset,
                autocommit=False,
                maxconnections=max_connections,
                cursorclass=pymysql.cursors.DictCursor
            )
        except OperationalError as e:
            print(f"Cannot connect to database: {e}")

    @staticmethod
    def __dict_datetime_obj_to_str(result_dict):
        if result_dict:
            result_replace = {k: v.__str__() for k, v in result_dict.items() if isinstance(v, datetime)}
            result_dict.update(result_replace)
        return result_dict

    def execute(self, sql, params=None):
        conn = self.pool.connection()
        cursor = conn.cursor()
        self.cursor = cursor

        try:
            if params is None:
                cursor.execute(sql)
            else:
                cursor.execute(sql, params)
            return [self.__dict_datetime_obj_to_str(row_dict) for row_dict in cursor.fetchall()]
        except Exception as e:
            print(f"Cannot execute query all: {e}")
            return None
        finally:
            cursor.close()
            conn.close()

    def execute_many(self, sql, params):
        conn = self.pool.connection()
        cursor = conn.cursor()
        self.cursor = cursor

        try:
            cursor.executemany(sql, params)
            conn.commit()
        except Exception as e:
            conn.rollback()
            print(f"Cannot execute query: {e}")
            return None
        finally:
            cursor.close()
            conn.close()

    def query_one(self, sql, params=None):
        conn = self.pool.connection()
        cursor = conn.cursor()
        self.cursor = cursor

        try:
            if params is None:
                cursor.execute(sql)
            else:
                cursor.execute(sql, params)
            result = cursor.fetchone()
            return self.__dict_datetime_obj_to_str(result)
        except Exception as e:
            print(f"Cannot execute query one: {e}")
            return None
        finally:
            cursor.close()
            conn.close()

    def insert(self, table, data):
        columns = ", ".join(data.keys())
        values_template = ", ".join(["%s"] * len(data))
        sql = f"INSERT INTO {table} ({columns}) VALUES ({values_template})"
        params = tuple(data.values())
        self.execute_many(sql, [params])

    def batch_insert(self, table, data_list):
        columns = ", ".join(data_list[0].keys())
        values_template = ", ".join(["%s"] * len(data_list[0]))
        sql = f"INSERT INTO {table} ({columns}) VALUES ({values_template})"
        params_list = [tuple(data.values()) for data in data_list]
        self.execute_many(sql, params_list)

    def update(self, table, data, where_clause):
        set_clause = ", ".join([f"{key}=%s" for key in data.keys()])
        sql = f"UPDATE {table} SET {set_clause} WHERE {where_clause}"
        params = tuple(data.values())
        self.execute_many(sql, [params])

    def delete(self, table, where_clause):
        sql = f"DELETE FROM {table} WHERE {where_clause}"
        self.execute(sql)


connector = MySQLClient(
    host='111.231.166.157',
    port=3306,
    user='pingpong_web',
    password='p!ngpOng~2023',
    database='pingpong_web'
)