resource "aws_security_group" "agendazap-security-group" {
  name = "agendazap-security-group"
  description  = "Allow HTTP and allow Internet access"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }


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

resource "aws_lb" "agendazap_lb" {
  name               = "agendazap-lb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.agendazap-security-group.id]
  subnets            = ["subnet-0e5e9017a50b6e7b0", "subnet-011baa251d338c6ff", "subnet-0ce7f58bded769b33"]
}

resource "aws_lb_target_group" "agendazap_target_group" {
  name     = "agendazap-target-group"
  port     = 80
  protocol = "HTTP"
  vpc_id   = "vpc-0a315c5eae678cd2d"
}

resource "aws_lb_target_group" "agendazap_api_target_group" {
  name     = "agendazap-api-target-group"
  port     = 3000
  protocol = "HTTP"
  vpc_id   = "vpc-0a315c5eae678cd2d"
}

resource "aws_lb_target_group_attachment" "agendazap_api_attachment" {
  target_group_arn = aws_lb_target_group.agendazap_api_target_group.arn
  target_id        = aws_instance.agendazap-web-server.id
  port             = 3000
}


resource "aws_lb_target_group_attachment" "agendazap_attachment" {
  target_group_arn = aws_lb_target_group.agendazap_target_group.arn
  target_id        = aws_instance.agendazap-web-server.id
  port             = 80
}

resource "aws_lb_listener" "https_listener" {
  load_balancer_arn = aws_lb.agendazap_lb.arn
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-TLS13-1-2-2021-06"
  certificate_arn   = "arn:aws:acm:sa-east-1:294562550042:certificate/9986e96c-29d2-41f5-b860-3a062d7e098b"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.agendazap_target_group.arn
  }
}

resource "aws_lb_listener" "http_listener" {
  load_balancer_arn = aws_lb.agendazap_lb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.agendazap_target_group.arn
  }
}

resource "aws_lb_listener" "api_listener" {
  load_balancer_arn = aws_lb.agendazap_lb.arn
  port              = 3000
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.agendazap_api_target_group.arn
  }
}
