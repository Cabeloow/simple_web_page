import pyodbc

# def bd():
#     driver = 'ODBC Driver 17 for SQL Server'
#     address= '186.223.62.47,20798'

#     cnxn_str = ";".join(
#         [
#             f"DRIVER={driver}",
#             f"SERVER={address}",
#             "DATABASE={lola}",
#             "UID={lola_user}",
#             "PWD={lollapalooza}",
#         ],
#     )

#     connection = pyodbc.connect(cnxn_str)

#     cursor = connection.cursor()

#     return connection, cursor

def bd():
    cnxn_str = ("Driver={SQL Server Native Client 11.0};"
                "Server=CABELOOW\SQLEXPRESS;"
                "Database=lola;"
                "Trusted_Connection=yes;")
    connection = pyodbc.connect(cnxn_str)

    cursor = connection.cursor()
   
    return connection, cursor

