locals {
  environment = toset(["stg", "prod"])
}

# Service Accounts

resource "google_service_account" "cd_deployer" {
  for_each     = local.environment
  account_id   = "${each.value}-deployer"
  description  = "Service account for deploying ${each.value} environment"
  display_name = "${each.value} Deployer"
  project      = "veracioux"
}

resource "google_service_account" "vm_internal_service_account" {
  for_each     = local.environment
  account_id   = "${each.value}-vm"
  description  = "Service account for ${each.value} environment VM"
  display_name = "${each.value} Internal Service Account"
  project      = "veracioux"
}

# Custom Roles

resource "google_project_iam_custom_role" "cd_deployer" {
  project     = "veracioux"
  role_id     = "cd_deployer"
  title       = "cd_deployer"
  description = "A user with least privileges for CD deployment"
  permissions = [
    "compute.disks.create",
    "compute.disks.delete",
    "compute.disks.get",
    "compute.disks.setLabels",
    "compute.disks.use",
    "compute.instances.create",
    "compute.instances.delete",
    "compute.instances.get",
    "compute.instances.setLabels",
    "compute.instances.setMetadata",
    "compute.instances.setServiceAccount",
    "compute.instances.setTags",
    "compute.subnetworks.use",
    "compute.subnetworks.useExternalIp",
    "compute.zones.get",
    "storage.objects.create",
    "storage.objects.delete",
    "storage.objects.get",
  ]
}

resource "google_project_iam_custom_role" "storage_objects_list_tfstate" {
  project     = "veracioux"
  role_id     = "storage_objects_list_tfstate"
  title       = "storage_objects_list_tfstate"
  description = "Role to allow listing storage objects in veracioux-tfstate bucket"
  permissions = [
    "storage.objects.list"
  ]
}

# IAM Bindings

resource "google_project_iam_member" "cd_deployer" {
  for_each = local.environment

  project = "veracioux"
  role    = google_project_iam_custom_role.cd_deployer.id
  member  = "serviceAccount:${each.value}-deployer@veracioux.iam.gserviceaccount.com"

  condition {
    title       = "Restrict operations to ${each.value} environment"
    description = "Allow compute operations only on ${each.value} resources, storage operations only on veracioux-${each.value}-tfstate bucket"
    expression  = <<EOF
resource.name.endsWith("/${each.value}.tfstate") ||
resource.name.endsWith("/${each.value}.tflock") ||
resource.name.endsWith("/${each.value}-vm") ||
resource.name.endsWith("/${each.value}-data") ||
resource.name.startsWith("projects/veracioux/zones") ||
resource.name.endsWith("/subnetworks/default")
EOF
  }
}

resource "google_project_iam_member" "cd_deployer_storage_objects_list_tfstate" {
  for_each = local.environment

  project = "veracioux"
  role    =google_project_iam_custom_role.storage_objects_list_tfstate.id
  member  = "serviceAccount:${each.value}-deployer@veracioux.iam.gserviceaccount.com"

  condition {
    title       = "Allow Storage Object List operations on veracioux-tfstate bucket"
    expression  = <<EOF
resource.name.startsWith("projects/_/buckets/veracioux-tfstate")
EOF
  }
}
