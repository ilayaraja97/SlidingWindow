function startSimulation(windowSize,frequency,delay,timeout) {
    console.log("window size : "+windowSize)
    console.log("frequency of packets : "+frequency);
    console.log("delay : ",delay);
    console.log("timeout : ",timeout);
    windowSize=parseInt(windowSize);
    frequency=parseFloat(frequency);
    delay=parseFloat(delay);
    timeout=parseFloat(timeout);
    paper.setup('simulation-frame');
    var senderFrames = [];
    for(var i=0;i<30;i++){
        var o = {
            path:new Path.Rectangle([5+25*i, 10], [20, 30]),
            start:-1,
            timer:timeout,
            awk:false
        };
        o.path.strokeColor = 'black';
        senderFrames.push(o);
    }
    var senderWindow = new Path.Rectangle([3, 8], [25*windowSize-1, 34]);
    //console.log(senderWindow);
    senderWindow.strokeColor='red'; 
    var recieverFrames = [];
    for(var i=0;i<30;i++){
        var o = {
            path:new Path.Rectangle([5+25*i, 500-40], [20, 30]),
            awk:false
        };
        o.path.strokeColor = 'black';
        recieverFrames.push(o);
    }
    var receiverWindow = new Path.Rectangle([3, 500-42], [25*windowSize-1, 34]);
    receiverWindow.strokeColor='red'; 

    var magic=0,m1=0;
    switch(windowSize)
    {
        case 2:
        case 3:
        case 4:
        case 5:
        break;
        case 6:
        case 7:
        case 8:m1=1
        break;
        case 9:
        case 10:m1=1;magic=1;
        break;
        default:magic=2;
    }

    var packet = [];   
    view.onMouseDown = function(event) {
        packet.forEach(function (e) {
            console.log(e);
            if(Math.abs(e.path.position.x-event.point.x)<20)
                if(Math.abs(e.path.position.y-event.point.y)<30)
                {   
                    e.path.position.x=-15;
                    packet = packet.filter(item => item !== e);
                }
        },this);
    } 
    view.onFrame = function(event) {
        var fps=60;
        //get position of sender window
        var spos=Math.round(senderWindow.position.x/25-3.6)-magic;
        var rpos=Math.round(receiverWindow.position.x/25-3.6)-magic;
        if(event.time<2)
        {
            //start simulation after 2s
        }
        else if(parseInt(event.time*fps)%(frequency*fps)==0)
        {
            //each send packets at a frequency
            for(var i=0;i<=windowSize-m1;i++)
            {
                //console.log(spos+i);
                if(spos+i>=30||spos+i<0)
                    continue;
                if(senderFrames[spos+i].start<0&&!senderFrames[spos+i].awk)
                {
                    senderFrames[spos+i].start=event.time;
                    var o={
                        path:senderFrames[spos+i].path.clone(),
                        id:spos+i,
                        awk:false
                    }
                    o.path.fillColor='#333399';
                    packet.push(o);
                    break;
                }
            }
            for(var i=windowSize-1;i>0;i--)
            {
                //console.log(spos+i);
            }
        }
        
        //check if timeout has come for any sender frame
        senderFrames.forEach(function(e) {
            if(!e.awk&&e.start>0)
            {
                if(e.start+timeout<event.time)
                {
                    e.start=event.time;
                    var o={
                        path:e.path.clone(),
                        id:senderFrames.indexOf(e),
                        awk:false
                    }
                    //console.log(o);
                    o.path.fillColor='#333399';
                    packet.push(o);
                }
            }
        });


        packet.forEach(function(e) {
            if(true)
            {
                //console.log("asd");
                if(e.awk)
                {
                    if(e.path.position.y>10)
                        e.path.position.y+=-450/(delay*fps);
                    else
                    {
                        senderFrames[e.id].awk=true;
                        e.path.position.y+=15;
                        packet = packet.filter(item => item !== e)
                    }
                }
                else
                {
                    if(e.path.position.y<460)
                        e.path.position.y+=450/(delay*fps);
                    else
                    {
                        recieverFrames[e.id].awk=true;
                        recieverFrames[e.id].path.fillColor='#333399'
                        e.awk=true;
                        e.path.fillColor='#66AAAA'
                    }
                }
            }
        }, this);

        if(spos<30&&spos>=0)
            if(senderFrames[spos].awk)
                senderWindow.position.x+=25;
        if(rpos<30&&rpos>=0)
            if(recieverFrames[rpos].awk)
                receiverWindow.position.x+=25;
        //console.log(spos);
    }
}