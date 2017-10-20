window.globals={
    start:function(){},
    windowSize:6,
    frequency:1,
    delay:1,
    timeout:10
};
function startSimulation(windowSize,frequency,delay,timeout) {
    window.globals.windowSize=windowSize;
    window.globals.frequency=frequency;
    window.globals.delay=delay;
    window.globals.timeout=timeout;
    window.globals.start;
}
// async function startSimulation(windowSize,frequency,delay,timeout) {
//     console.log("window size : "+windowSize)
//     console.log("frequency of packets : "+frequency);
//     console.log("delay : ",delay);
//     console.log("timeout : ",timeout);
//     windowSize=parseInt(windowSize);
//     frequency=parseFloat(frequency);
//     delay=parseFloat(delay);
//     timeout=parseFloat(timeout);
//     var ssbutton=document.getElementById("start-stop-button"); 
//     var top=document.getElementById("sender-row");
//     var bottom=document.getElementById("reciever-row");
//     if(ssbutton.value=="Start")
//         ssbutton.value="Stop";
//     else
//     {
//         ssbutton.value="Start";
//         document.getElementById("simulation-frame").innerHTML='<div class="row top" id="sender-row"></div><div class="row bottom" id="reciever-row"></div>';
//         return;
//     }   
//     //can disp 28 elements in a single simulation frame
//     for(var i=0;i<28;i++)
//     {
//         //console.log(i);
//         var frameT=document.createElement("div");
//         frameT.className="row justify-content-md-center";
//         frameT.innerText=i%(windowSize+1);
//         var windowT=document.createElement("div");
//         windowT.className="rectangle";
//         windowT.id="sender-frame-"+i;
//         windowT.appendChild(frameT);
//         var frameB=document.createElement("div");
//         frameB.className="row justify-content-md-center";
//         frameB.innerText=i%(windowSize+1);
//         var windowB=document.createElement("div");
//         windowB.className="rectangle";
//         windowB.id="reciever-frame-"+i;
//         windowB.appendChild(frameB);
//         top.appendChild(windowT);
//         bottom.appendChild(windowB);
//     }
//     //animate, only 28 packets will be sent
//     for(var i=0;i<28;i++)
//     {
//         //make a packet
//         var packet=document.createElement("div");
//         packet.className="packet";
//         packet.id="packet-"+i;
//         document.getElementById("simulation-frame").appendChild(packet);
//         packet.style="-webkit-animation-duration:"+delay+"s;left: "+parseFloat(0.5+3.5*i)+"%;";
//         packet.style="animation-duration: "+delay+"s;left: "+parseFloat(0.5+3.5*i)+"%;";

//         await sleep(frequency*1000);
//     }
// }

// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }