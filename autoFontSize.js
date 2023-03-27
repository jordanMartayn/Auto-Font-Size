function autoFontSize(element){
    
    function fontSizeSelect(){
        const elemT = element.textContent;
        let elemTnlArray;
        if(elemT.match(/\n/g) == null){
            elemTnlArray = [];
        }
        else    {
            elemTnlArray = elemT.match(/\n/g);
        }
    
        const elemTNewLines = elemTnlArray.length;
        const elemTL = element.textContent.length; //Text Length
        let lineEquationSum; //The relationship between Text length and font size is handled by a line equation.
        
        
        switch(true){
            default:

                lineEquationSum = 1.5;
            break;
            case (13<elemTL && elemTL<=23):
                lineEquationSum = 3/20*elemTL + 41/20;
            break;
            case (23<elemTL && elemTL<=38):
                lineEquationSum = 2/15*elemTL + 73/30;
            break;
            case (38<elemTL && elemTL<=62):
                lineEquationSum = 1/12*elemTL + 13/3;
            break;
            case (62<elemTL && elemTL<=106):
                lineEquationSum = 3/44*elemTL + 58/11;
            break;
            case (106<elemTL && elemTL<=137):
                lineEquationSum = 2/31*elemTL + 351/62;
            break;
            case (137<elemTL && elemTL<=186):
                lineEquationSum = 5/98*elemTL + 368/49;
            break;
            case (186<elemTL && elemTL<=550):
                lineEquationSum = 1/26*elemTL + 267/26;
            break;
            case (550<elemTL && elemTL<=871):
                lineEquationSum = 7/282*elemTL + 4901/282;
            break;
            case (871<elemTL):
                lineEquationSum = 21/1180*elemTL + 6876/295;
            break;
            
        }

        const elemWidth = 
        window.getComputedStyle(element,null).getPropertyValue("width").replace("px","");
        let elemHeight = 
        window.getComputedStyle(element,null).getPropertyValue("Height").replace("px","");
        const aspectRatio = elemHeight / elemWidth;

        



        let elemArea = (elemWidth * elemHeight);
        let elemTextSpace = Math.sqrt(elemArea) / (elemTL / aspectRatio);
        let elemFontSize = lineEquationSum * elemTextSpace;


        let newLineOffset = 0.01
        if (navigator.userAgent.indexOf("Firefox") > 0) {
            newLineOffset = 0.9;
        }


        elemHeight = Number(elemHeight) - (elemTNewLines * elemFontSize * newLineOffset);
        elemArea = elemWidth * elemHeight;

  
        elemTextSpace = Math.sqrt(elemArea) / elemTL
        elemFontSize = lineEquationSum * elemTextSpace
        element.style.fontSize = elemFontSize+"px";


    }


    document.addEventListener("DOMContentLoaded", fontSizeSelect);

    setTimeout( () => { //delay to let the element properties load (calculated width and height)
        fontSizeSelect();  
    },1);
    
    //with computedStyle some properties give you "used value" instead of computed value, width is
    //one such value, I don't know if it's that specifically but it seems that the browser wont
    //give us the correct value the first time the javascript on the page is ran, because it doesn't
    //want to update the page multiple times on first run. So a work around here is to add a 
    //little setTimeout as it is treated seperately from the first run when the page loads.

    //oddly it seems I require the combination of DOMContentLoaded and setTimeout to use the 
    //calculated width when the page first loads.

    const sizeObserver = new ResizeObserver(function(mutations) {
        mutations.forEach(function(mutationRecord) {
            fontSizeSelect();
        });    
    });
    

    sizeObserver.observe(element, { box: `border-box`});
    window.addEventListener("resize",fontSizeSelect);
    element.addEventListener("input",fontSizeSelect);
};