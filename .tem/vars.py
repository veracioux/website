from tem.var import *

#db_name = Variant(default="veracioux-website", from_env="DB_NAME")
#db_user = Variant(default="veracioux", from_env="DB_USER")
#db_user = Variant(default="veracioux", from_env="DB_USER")

target = Variable(["dev", "local", "prod"], default="dev")

target.doc = (
    "The server that is the target of ad-hoc tests.\n"
    "For example use this variable to set whether the $url shell variable "
    "points to the dev, local or production server."
)
target.doc["dev"] = "Use development server"
target.doc["local"] = "Use local server with production config"
target.doc["prod"] = "Use production server"

device = Variable(["dev", "server"], default="dev")
device.doc = (
    "The current device type."
)
device.doc["dev"] = "Development device."
device.doc["server"] = "Actual server the site is deployed to."
