# #!/bin/bash

# # Initialize variables with default values
# EMAIL_DOMAIN=""
# NO_OF_CHOICES=""
# NO_OF_QUESTIONS=""
# NO_OF_POST_SURVEY_QUESTIONS=""

# # Loop through the arguments and assign values to corresponding variables
# while [[ $# -gt 0 ]]
# do
#     case "$1" in
#         -EMAIL_DOMAIN=*)
#             EMAIL_DOMAIN="${1#-EMAIL_DOMAIN=}"
#             shift
#             ;;
#         -NO_OF_CHOICES=*)
#             NO_OF_CHOICES="${1#-NO_OF_CHOICES=}"
#             shift
#             ;;
#         -NO_OF_QUESTIONS=*)
#             NO_OF_QUESTIONS="${1#-NO_OF_QUESTIONS=}"
#             shift
#             ;;
#         -NO_OF_POST_SURVEY_QUESTIONS=*)
#             NO_OF_POST_SURVEY_QUESTIONS="${1#-NO_OF_POST_SURVEY_QUESTIONS=}"
#             shift
#             ;;
#         *)
#             echo "Invalid argument: $1"
#             exit 1
#             ;;
#     esac
# done

# # Write to .env file
# echo "EMAIL_DOMAIN=\"$EMAIL_DOMAIN\"" > survey-portal/firebase/.env
# echo "NO_OF_CHOICES='$NO_OF_CHOICES'" >> survey-portal/firebase/.env
# echo "NO_OF_QUESTIONS='$NO_OF_QUESTIONS'" >> survey-portal/firebase/.env
# echo "NO_OF_POST_SURVEY_QUESTIONS='$NO_OF_POST_SURVEY_QUESTIONS'" >> survey-portal/firebase/.env

#!/bin/bash

# Initialize variables with default values
NEXT_PUBLIC_EMAIL_DOMAIN=""
NEXT_PUBLIC_PARAM_0=""
NEXT_PUBLIC_PARAM_1=""
NEXT_PUBLIC_PARAM_2=""
NEXT_PUBLIC_PARAM_3=""
NEXT_PUBLIC_PARAM_4=""
NEXT_PUBLIC_PARAM_NAME_0=""
NEXT_PUBLIC_PARAM_NAME_1=""
NEXT_PUBLIC_PARAM_NAME_2=""
NEXT_PUBLIC_PARAM_NAME_3=""
NEXT_PUBLIC_PARAM_NAME_4=""
NEXT_PUBLIC_IS_IMAGE=""
NEXT_PUBLIC_TITLE=""
NEXT_PUBLIC_LOGO=""
NEXT_PUBLIC_ORG_NAME=""
NEXT_PUBLIC_NO_OF_CHOICES=""
NEXT_PUBLIC_NO_OF_QUESTIONS=""
NEXT_PUBLIC_NO_OF_POST_SURVEY_QUESTIONS=""

# Loop through the arguments and assign values to corresponding variables
while [[ $# -gt 0 ]]
do
    case "$1" in
        -NEXT_PUBLIC_EMAIL_DOMAIN=*)
            NEXT_PUBLIC_EMAIL_DOMAIN="${1#-NEXT_PUBLIC_EMAIL_DOMAIN=}"
            shift
            ;;
        -NEXT_PUBLIC_PARAM_0=*)
            NEXT_PUBLIC_PARAM_0="${1#-NEXT_PUBLIC_PARAM_0=}"
            shift
            ;;
        -NEXT_PUBLIC_PARAM_1=*)
            NEXT_PUBLIC_PARAM_1="${1#-NEXT_PUBLIC_PARAM_1=}"
            shift
            ;;
        -NEXT_PUBLIC_PARAM_2=*)
            NEXT_PUBLIC_PARAM_2="${1#-NEXT_PUBLIC_PARAM_2=}"
            shift
            ;;
        -NEXT_PUBLIC_PARAM_3=*)
            NEXT_PUBLIC_PARAM_3="${1#-NEXT_PUBLIC_PARAM_3=}"
            shift
            ;;
        -NEXT_PUBLIC_PARAM_4=*)
            NEXT_PUBLIC_PARAM_4="${1#-NEXT_PUBLIC_PARAM_4=}"
            shift
            ;;
        -NEXT_PUBLIC_PARAM_NAME_0=*)
            NEXT_PUBLIC_PARAM_NAME_0="${1#-NEXT_PUBLIC_PARAM_NAME_0=}"
            shift
            ;;
        -NEXT_PUBLIC_PARAM_NAME_1=*)
            NEXT_PUBLIC_PARAM_NAME_1="${1#-NEXT_PUBLIC_PARAM_NAME_1=}"
            shift
            ;;
        -NEXT_PUBLIC_PARAM_NAME_2=*)
            NEXT_PUBLIC_PARAM_NAME_2="${1#-NEXT_PUBLIC_PARAM_NAME_2=}"
            shift
            ;;
        -NEXT_PUBLIC_PARAM_NAME_3=*)
            NEXT_PUBLIC_PARAM_NAME_3="${1#-NEXT_PUBLIC_PARAM_NAME_3=}"
            shift
            ;;
        -NEXT_PUBLIC_PARAM_NAME_4=*)
            NEXT_PUBLIC_PARAM_NAME_4="${1#-NEXT_PUBLIC_PARAM_NAME_4=}"
            shift
            ;;
        -NEXT_PUBLIC_IS_IMAGE=*)
            NEXT_PUBLIC_IS_IMAGE="${1#-NEXT_PUBLIC_IS_IMAGE=}"
            shift
            ;;
        -NEXT_PUBLIC_TITLE=*)
            NEXT_PUBLIC_TITLE="${1#-NEXT_PUBLIC_TITLE=}"
            shift
            ;;
        -NEXT_PUBLIC_LOGO=*)
            NEXT_PUBLIC_LOGO="${1#-NEXT_PUBLIC_LOGO=}"
            shift
            ;;
        -NEXT_PUBLIC_ORG_NAME=*)
            NEXT_PUBLIC_ORG_NAME="${1#-NEXT_PUBLIC_ORG_NAME=}"
            shift
            ;;
        -NEXT_PUBLIC_NO_OF_CHOICES=*)
            NEXT_PUBLIC_NO_OF_CHOICES="${1#-NEXT_PUBLIC_NO_OF_CHOICES=}"
            shift
            ;;
        -NEXT_PUBLIC_NO_OF_QUESTIONS=*)
            NEXT_PUBLIC_NO_OF_QUESTIONS="${1#-NEXT_PUBLIC_NO_OF_QUESTIONS=}"
            shift
            ;;
        -NEXT_PUBLIC_NO_OF_POST_SURVEY_QUESTIONS=*)
            NEXT_PUBLIC_NO_OF_POST_SURVEY_QUESTIONS="${1#-NEXT_PUBLIC_NO_OF_POST_SURVEY_QUESTIONS=}"
            shift
            ;;
        *)
            echo "Invalid argument: $1"
            exit 1
            ;;
    esac
done

# Write to .env file
{
    echo "NEXT_PUBLIC_EMAIL_DOMAIN=\"$NEXT_PUBLIC_EMAIL_DOMAIN\""
    echo "NEXT_PUBLIC_PARAM_0=\"$NEXT_PUBLIC_PARAM_0\""
    echo "NEXT_PUBLIC_PARAM_1=\"$NEXT_PUBLIC_PARAM_1\""
    echo "NEXT_PUBLIC_PARAM_2=\"$NEXT_PUBLIC_PARAM_2\""
    echo "NEXT_PUBLIC_PARAM_3=\"$NEXT_PUBLIC_PARAM_3\""
    echo "NEXT_PUBLIC_PARAM_4=\"$NEXT_PUBLIC_PARAM_4\""
    echo "NEXT_PUBLIC_PARAM_NAME_0=\"$NEXT_PUBLIC_PARAM_NAME_0\""
    echo "NEXT_PUBLIC_PARAM_NAME_1=\"$NEXT_PUBLIC_PARAM_NAME_1\""
    echo "NEXT_PUBLIC_PARAM_NAME_2=\"$NEXT_PUBLIC_PARAM_NAME_2\""
    echo "NEXT_PUBLIC_PARAM_NAME_3=\"$NEXT_PUBLIC_PARAM_NAME_3\""
    echo "NEXT_PUBLIC_PARAM_NAME_4=\"$NEXT_PUBLIC_PARAM_NAME_4\""
    echo "NEXT_PUBLIC_IS_IMAGE=\"$NEXT_PUBLIC_IS_IMAGE\""
    echo "NEXT_PUBLIC_TITLE=\"$NEXT_PUBLIC_TITLE\""
    echo "NEXT_PUBLIC_LOGO=\"$NEXT_PUBLIC_LOGO\""
    echo "NEXT_PUBLIC_ORG_NAME=\"$NEXT_PUBLIC_ORG_NAME\""
    echo "NEXT_PUBLIC_NO_OF_CHOICES=\"$NEXT_PUBLIC_NO_OF_CHOICES\""
    echo "NEXT_PUBLIC_NO_OF_QUESTIONS=\"$NEXT_PUBLIC_NO_OF_QUESTIONS\""
    echo "NEXT_PUBLIC_NO_OF_POST_SURVEY_QUESTIONS=\"$NEXT_PUBLIC_NO_OF_POST_SURVEY_QUESTIONS\""
} >> terraform/.env