from databricks_api import DatabricksAPI


# Provide a host and token

def connect_workspace():
        db = DatabricksAPI(
                    host="adb-8728304164668675.15.azuredatabricks.net",
                    token="dapi12e93279816c5caf6fdc86b7089dc6ca")

        return db