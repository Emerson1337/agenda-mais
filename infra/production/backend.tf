provider "aws" {
  region = "sa-east-1"
  profile = "agendamais"
}

terraform {
  backend "s3" {
    bucket = "agendamais-terraform-state-production"
    key    = "agendamais.tfstate"
    region = "sa-east-1"
    // Same as above
    profile = "agendamais"
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.66.0"
    }
    archive = {
      source  = "hashicorp/archive"
      version = "~> 2.6.0"
    }
  }

  required_version = ">= 1.5.7"
}
