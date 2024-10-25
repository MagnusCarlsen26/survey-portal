variable "NEXT_PUBLIC_EMAIL_DOMAIN" {}
variable "NEXT_PUBLIC_PARAM_0" {}
variable "NEXT_PUBLIC_PARAM_1" {}
variable "NEXT_PUBLIC_PARAM_2" {}
variable "NEXT_PUBLIC_PARAM_3" {}
variable "NEXT_PUBLIC_PARAM_4" {}
variable "NEXT_PUBLIC_PARAM_NAME_0" {}
variable "NEXT_PUBLIC_PARAM_NAME_1" {}
variable "NEXT_PUBLIC_PARAM_NAME_2" {}
variable "NEXT_PUBLIC_PARAM_NAME_3" {}
variable "NEXT_PUBLIC_PARAM_NAME_4" {}
variable "NEXT_PUBLIC_IS_IMAGE" {}
variable "NEXT_PUBLIC_TITLE" {}
variable "NEXT_PUBLIC_LOGO" {}
variable "NEXT_PUBLIC_ORG_NAME" {}
variable "NEXT_PUBLIC_NO_OF_CHOICES" {}
variable "NEXT_PUBLIC_NO_OF_QUESTIONS" {}
variable "NEXT_PUBLIC_NO_OF_POST_SURVEY_QUESTIONS" {}

provider "aws" {
    region = "ap-south-1"
}

data "aws_security_group" "allow_3000_and_ssh" {
    filter {
        name   = "group-name"
        values = ["allow_port_3000_and_ssh_khushal"]
    }
}

resource "aws_instance" "my_instance" {
    ami             = "ami-0dee22c13ea7a9a67"
    instance_type   = "t2.small"
    vpc_security_group_ids = [data.aws_security_group.allow_3000_and_ssh.id]

user_data = <<-EOF
        #!/bin/bash
        sudo apt-get update -y
        
        sudo apt-get install -y \
            apt-transport-https \
            ca-certificates \
            curl \
            software-properties-common
        
        curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
        
        echo "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list
        
        sudo apt-get update -y
        
        sudo apt-get install -y docker-ce
        
        sudo systemctl start docker
        sudo systemctl enable docker

        sudo docker pull magnuscarlsen26/survey-portal-automate-webiste:latest
        sudo docker run -d -p 3000:3000 magnuscrlsen26/survey-portal-automate-webiste:latest
    EOF

    tags = {
        Name = "MyEC2Instance2"
    }
}
