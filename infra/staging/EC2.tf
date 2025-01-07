resource "aws_security_group" "agendazap-security-group" {
  name = "agendazap-security-group"
  description  = "Allow HTTP and allow Internet access"

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "agendazap-web-server" {
  ami           = "ami-03c4a8310002221c7" # Amazon Linux 2 AMI
  instance_type = "t2.small"
  user_data = file("./user_data.sh")
  vpc_security_group_ids = [aws_security_group.agendazap-security-group.id]
}