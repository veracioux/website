from tem.var import *

#db_name = Variant(default="veracioux-website", from_env="DB_NAME")
#db_user = Variant(default="veracioux", from_env="DB_USER")
#db_user = Variant(default="veracioux", from_env="DB_USER")

env = Variable(["dev", "local", "prod"], default="dev")

env.doc = (
    "The target environment.\n"
    "This is used to control which version of the server is started using `up` "
    "and similar commands. This variable also controls some of the shell "
    "variables, for example $url that determines the URL pointing to the "
    "target website."
)
env.doc["dev"] = "Use development server"
env.doc["local"] = "Use local server with production config"
env.doc["prod"] = "Use production server"
