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
    instance_type   = "t2.micro"
    vpc_security_group_ids = [data.aws_security_group.allow_3000_and_ssh.id]

    user_data = <<-EOF
        #!/bin/bash
        sudo apt-get update -y
        sudo apt-get install git -y
        
        git clone https://github.com/MagnusCarlsen26/survey-portal.git /home/ubuntu/survey-portal

        sudo chown -R ubuntu:ubuntu /home/ubuntu/survey-portal/

        sudo apt-get update -y
        sudo apt-get install -y curl
        curl -sL https://deb.nodesource.com/setup_20.x | sudo -E bash -
        sudo apt-get install -y nodejs
        cd survey-portal/frontend
        npm install
        cd ../firebase
        npm install
        cd ../frontend
        npm run dev   
    EOF

    tags = {
        Name = "MyEC2Instance2"
    }
}
