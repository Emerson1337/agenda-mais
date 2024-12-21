resource "aws_iam_user" "terraform_cli_credentials" {
  name = "terraform-cli"
}

resource "aws_iam_access_key" "terraform_cli_credentials" {
  user = aws_iam_user.terraform_cli_credentials.name
}

resource "aws_iam_user_policy_attachment" "terraform_cli_administrator_access" {
  user   = aws_iam_user.terraform_cli_credentials.name
  policy_arn = "arn:aws:iam::aws:policy/AdministratorAccess"
}
