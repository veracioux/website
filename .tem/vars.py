from tem.var import *

#db_name = Variant(default="veracioux-website", from_env="DB_NAME")
#db_user = Variant(default="veracioux", from_env="DB_USER")
#db_user = Variant(default="veracioux", from_env="DB_USER")

# TODO: rename the variables to be more consistent

env = Variable(["dev", "staging", "prod"], default="dev")

env.doc = (
    "The environment configuration that should be used. \n"
    "This is used to control which version of the server is started using `up` "
    "and similar commands. This variable also controls some of the shell "
    "variables, for example $url that determines the URL pointing to the "
    "target website."
)
env.doc["dev"] = "Use development server"
env.doc["staging"] = "Use staging server"
env.doc["prod"] = "Use production server"

is_server = Variant(False)
is_server.doc = (
    "Indicates whether the current device is the deployment server."
)

