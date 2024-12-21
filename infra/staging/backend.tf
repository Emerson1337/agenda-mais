provider "aws" {
  region = "sa-east-1"
  profile = "agendazap"
}

terraform {
  backend "s3" {
    bucket = "agendazap-terraform-state-staging"
    key    = "agendazap.tfstate"
    region = "sa-east-1"
    // Same as above
    profile = "agendazap"
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
