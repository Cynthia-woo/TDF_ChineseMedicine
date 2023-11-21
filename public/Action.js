const message = {
    "data":{
        "messages":[
            {
                "content":"hello",
                "role":"user"
            }
        ],
        "variables":{
            "AGE_OF_USER":""
        }
    }
}
const yourToken = "sk0w-8801efb57d18337bd57e8866f208052d";

const clickButton = () => {
    console.log('click');
    fetch('https://api.zerowidth.ai/process/NFkuStb1R0pe33kgs3IW/nFDVr95RfczyBCTiiOcu', {
        // mode: 'no-cors',
        Method: 'POST',
        Headers: {
            Accept: 'application.json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${yourToken}`
        },
        Body: JSON.stringify(message),
        Cache: 'default',
        credentials:'include'
    }).then(response => {
        console.log("response ->",response);
    }).then(data => {
        console.log("data -> ",data);
    }).catch(error => {
        console.log(error);})
}


const myButton = document.getElementById('userInput');
myButton.addEventListener('click', clickButton);

