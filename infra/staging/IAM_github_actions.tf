resource "aws_iam_user" "github_actions_credentials" {
  name = "github-actions"
    tags = {
    "AKIAUJFKL2ENEYVS2U3H" = "access-key-github-actions-setup-1"
  }
}

resource "aws_iam_access_key" "github_actions_credentials" {
  user = aws_iam_user.github_actions_credentials.name
}

resource "aws_iam_user_policy_attachment" "github_actions_administrator_access_amplify" {
  user   = aws_iam_user.github_actions_credentials.name
  policy_arn = "arn:aws:iam::aws:policy/AdministratorAccess-Amplify"
}

resource "aws_iam_user_policy_attachment" "github_actions_administrator_access_s3" {
  user   = aws_iam_user.github_actions_credentials.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonS3FullAccess"
}

resource "aws_iam_user_policy_attachment" "github_actions_administrator_access_backend_deploy" {
  user   = aws_iam_user.github_actions_credentials.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmplifyBackendDeployFullAccess"
}


