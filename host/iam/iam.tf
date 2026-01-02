locals {
  environment = toset(["stg", "prod"])
}

resource "google_service_account" "cd_deployer" {
  for_each = local.environment
  account_id   = "${each.value}-deployer"
  description  = "Service account for deploying ${each.value} environment"
  display_name = "${each.value} Deployer"
  project      = "veracioux"
}

resource "google_project_iam_custom_role" "cd_deployer" {
  project     = "veracioux"
  role_id     = "cd_deployer"
  title       = "cd_deployer"
  description = "A user with least privileges for CD deployment"
  permissions = [
    "compute.disks.create",
    "compute.instances.create",
    "compute.instances.delete",
    "compute.instances.get",
    "compute.instances.setMetadata",
    "compute.instances.setTags",
    "compute.disks.setLabels",
    # "compute.subnetworks.use",
    # "compute.subnetworks.useExternalIp",
    "compute.zones.get"
  ]
}

resource "google_project_iam_member" "cd_deployer" {
  for_each = local.environment

  project = "veracioux"
  role    = google_project_iam_custom_role.cd_deployer.id
  member  = "serviceAccount:${each.value}-deployer@veracioux.iam.gserviceaccount.com"

  condition {
    title       = "Restrict operations to ${each.value} environment"
    description = "Allow non-read-only instance operations only on instances named ${each.value}-vm"
    expression  = <<EOF
resource.name.endsWith("/${each.value}-vm") ||
resource.name.endsWith("/${each.value}-data")
EOF
  }
}
