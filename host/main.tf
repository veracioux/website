locals {
  diskname        = "${terraform.workspace}-data"
  apex_domain     = terraform.workspace == "prod" ? "veracioux.me." : "${terraform.workspace}.veracioux.me."
  wildcard_domain = "*.${local.apex_domain}"
}

output "external_ip" {
  value = google_compute_instance.instance.network_interface.0.access_config.0.nat_ip
}

terraform {
  backend "gcs" {
    bucket = "veracioux-tfstate"
  }

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "6.8.0"
    }
  }
}

provider "google" {
  project = "veracioux"
  region  = "europe-west1"
  zone    = "europe-west1-b"
}

resource "google_compute_disk" "data" {
  labels = {
    managed-by-cnrm = "true"
  }

  name                      = local.diskname
  physical_block_size_bytes = 4096
  project                   = "veracioux"
  size                      = 50
  type                      = "pd-balanced"
  zone                      = "europe-west1-b"
}

resource "google_compute_instance" "instance" {
  name = "${terraform.workspace}-vm"

  attached_disk {
    device_name = "data"
    mode        = "READ_WRITE"
    source      = google_compute_disk.data.id
  }

  boot_disk {
    auto_delete = true
    device_name = "boot"

    initialize_params {
      image = "https://www.googleapis.com/compute/beta/projects/debian-cloud/global/images/debian-13-trixie-v20251111"
      size  = 10
      type  = "pd-balanced"
    }

    mode = "READ_WRITE"
  }

  # confidential_instance_config {
  #   enable_confidential_compute = false
  # }

  labels = {
    managed-by-cnrm = "true"
  }

  machine_type = "e2-small"

  metadata = {
    ssh-keys = "harisgusic.dev:ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIITlRNFuNc+CCq4n71WHLjDnJDKX216TjfleRtROwfJu harisgusic.dev@gmail.com"
  }

  network_interface {
    access_config {
      # empty block → ephemeral external IP
    }

    network    = "default"
    subnetwork = "default"
  }

  project = "veracioux"

  reservation_affinity {
    type = "ANY_RESERVATION"
  }

  scheduling {
    automatic_restart   = true
    on_host_maintenance = "MIGRATE"
    provisioning_model  = "STANDARD"
  }

  shielded_instance_config {
    enable_integrity_monitoring = true
    enable_vtpm                 = true
  }

  service_account {
    email = "stg-vm@veracioux.iam.gserviceaccount.com"
    scopes = [
      "https://www.googleapis.com/auth/devstorage.read_only",
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring.write",
      "https://www.googleapis.com/auth/service.management.readonly",
      "https://www.googleapis.com/auth/servicecontrol",
      "https://www.googleapis.com/auth/trace.append",
    ]
  }

  tags = ["http-server", "https-server"]
  zone = "europe-west1-b"
}

resource "google_dns_record_set" "a_record" {
  name         = local.apex_domain
  managed_zone = "veracioux"
  type         = "A"
  ttl          = 300
  rrdatas      = [google_compute_instance.instance.network_interface.0.access_config.0.nat_ip]
}

resource "google_dns_record_set" "cname_wildcard_record" {
  name         = local.wildcard_domain
  managed_zone = "veracioux"
  type         = "CNAME"
  ttl          = 300
  rrdatas      = [local.apex_domain]
}
