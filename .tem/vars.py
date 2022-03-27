from tem.var import *

#db_name = Variant(default="veracioux-website", from_env="DB_NAME")
#db_user = Variant(default="veracioux", from_env="DB_USER")
#db_user = Variant(default="veracioux", from_env="DB_USER")

target = Variable(["production", "local"], default="local")
target.doc = (
    "The environment that is the target of ad-hoc tests.\n"
    "For example use this"
    "variable to set whether the $url shell variable points to the local or"
    "production server."
)

target.doc["production"] = "Use production server"
target.doc["local"] = "Use local development server"
