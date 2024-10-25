function returnThankyou( currPage ) {
    if ( currPage == 3 ) return 'thankyou'
    else return currPage + 1
}

export function routeNextDonePage(result, currPage, router) {

    currPage = parseInt( currPage,10 )
    
    if (result.data === "You have already attempted the question.") {
        alert("Your current response won't be considered as you have already attempted the question.")
        router.push(`/survey/done/${returnThankyou( currPage )}`)
    } else if ( result.data === "Please answer all the post survey questions." ) {
        alert("Please answer all the previous questions.")
        router.push('/survey/done/1')
    } else if ( result.data === "All questions are compulsory. Please attempt all the questions." ) {
        alert("All questions are compulsory. Please attempt all the questions.")
    } else if ( result.data === "done" ) {                
        router.push(`/survey/done/${returnThankyou( currPage )}`)
    }
}

export default routeNextDonePage