//for this calculator, javascript is used for the logic
function getHistory() {
    return document.getElementById("history-value").innerText;
}
function printHistory(num) {
    document.getElementById("history-value").innerText=num;
}
function getOutput(num) {
    return document.getElementById("output-value").innerText;
}
function printOutput(num) {
    if(num==""){
        document.getElementById("output-value").innerText=num;
    }
    else{
        document.getElementById("output-value").innerText=getFormattedNumber(num);

    }
}
function getFormattedNumber(num) {
    //this if statement means that when there is minus number in the output
    //when we use the backspace the output is cleared
    //this is needed because when the backspace is used the number is converted into a string
    //therefore only a minus sign would be left.
    //this would be an error for the final output because it is converted into a number again
    //therefore it will not show up in the output.
    if(num=="-") {
        return "";
    }
    var n = Number(num);
    var value = n.toLocaleString("en");
    return value;
}
function reverseNumberFormat(num) {
    return Number(num.replace(/,/g,''));
}
//operator click   This was used to check it worked->   alert("The operator clicked:"+this.id);
var operator = document.getElementsByClassName("operator");
for(var i =0;i<operator.length;i++) {
    operator[i].addEventListener('click',function(){
        if(this.id=="clear"){
            printHistory("");
            printOutput("");
        }
        else if(this.id=="backspace"){
            var output=reverseNumberFormat(getOutput()).toString();
            if(output){ //if output has a value
                output = output.substr(0,output.length-1);
                printOutput(output);
            }
        }
        else{
            var output=getOutput();
            var history=getHistory();
            if(output==""&&history!=""){
                if(isNaN(history[history.length-1])){
                    //this removes the last character so it be changeds
                    history=history.substr(0,history.length-1);
                }
            }
            //these functions all deal with when the output is not empty
            //so that the operators will only work when numbers are inside of it
            if(output!="" || history!=""){
                //condition?true:false (code below)
                //meaning if conditon true, value is assigned to first output
                //if the condition false, value is assigned to second output
                output= output==""?
                output:reverseNumberFormat(output);
                history=history+output;
                //equals button clearing the history
                if(this.id=="="){
                    var result=eval(history);
                    printOutput(result);
                    printHistory(history);
                        //oringinally this code here was printHistory("");
                        //i changed it because the history would be removed when equalled
                        //therefore you could not see your workings out
                        //this way you can :)

                }
                else{
                    history=history+this.id;
                    printHistory(history);
                    printOutput("");
                }
            }
        }



    });
}
//numbers click   This was used to check it worked->   alert("The number clicked:"+this.id);

var number = document.getElementsByClassName("number");
for(var i =0;i<number.length;i++) {
    number[i].addEventListener('click',function(){
        var output=reverseNumberFormat(getOutput());
        if(output!=NaN){ //if output is a number
            output=output+this.id;
            printOutput(output);
        }
    });
}