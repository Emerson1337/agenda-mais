resource "aws_s3_bucket" "agendamais-assets" {
  bucket = "agendamais-assets-${var.env}"
}

resource "aws_s3_bucket_policy" "link-policy-agendamais-assets" {
  bucket = aws_s3_bucket.agendamais-assets.id
  policy = data.aws_iam_policy_document.allow_public_access_to_assets.json
}

data "aws_iam_policy_document" "allow_public_access_to_assets" {
  statement {
    principals {
      type        = "AWS"
      identifiers = ["*"]
    }

    actions = [
      "s3:GetObject",
    ]

    resources = [
      "${aws_s3_bucket.agendamais-assets.arn}/*",
    ]
  }
}

resource "aws_s3_bucket_public_access_block" "agendamais-assets-public-access" {
  bucket = aws_s3_bucket.agendamais-assets.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}