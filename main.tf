provider "aws" {
  region = "ap-south-1" # Change to your desired region
}

resource "aws_instance" "my_instance" {
  ami           = "ami-0dee22c13ea7a9a67" # Valid AMI ID for Ubuntu Server 20.04 LTS
  instance_type = "t2.micro"               # Change instance type as needed

  tags = {
    Name = "MyEC2Instance"
  }
}